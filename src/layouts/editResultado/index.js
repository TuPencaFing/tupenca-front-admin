/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect} from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';


// Material Dashboard 2 React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAlert from "components/SoftAlert";
import SoftButton from "components/SoftButton";



// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// API requests
import { useNavigate,useParams } from "react-router-dom";
import curved0 from "assets/images/logo4.png";
import getResultadoAPI from "../../api/getResultado";
import editResultadoApi from "api/editResultado";
import getEventoAPI from "../../api/getEvento";

function EditResultado() {

  const { itemId } = useParams();
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [nombreVisitante, setNombreVisitante] = useState('');
  const [nombreLocal, setNombreLocal] = useState('');
  const [resultado, setResultado] = useState('');
  const [puntajeVisitante, setPuntajeVisitante] = useState('');
  const [puntajeLocal, setPuntajeLocal] = useState('');

  const navigate = useNavigate();


  const alertContent = () => (
    <SoftTypography variant="body2" color="white">
      El evento debe ya haber finalizado
    </SoftTypography>
  );

  const jsonError = (name) => (
    <SoftTypography variant="body2" color="white">
      {name}
    </SoftTypography>
  );

  const jsonSuccess = () => (
    <SoftTypography variant="body2" color="white">
      El resultado se ha dado de alta con éxito.
    </SoftTypography>
  );

  const submitResultado = async () => {
    var enumResultado = puntajeLocal == puntajeVisitante ? 0 : puntajeLocal > puntajeVisitante ? 1 : 2;
    const data = {
        puntajeEquipoLocal: puntajeLocal,
        puntajeEquipoVisitante: puntajeVisitante,
        resultado: enumResultado,
        eventoId: itemId
   }
   editResultadoApi(resultado,data).then(response => {
      setIsSuccess(response.ok);
      setShowMsg(true);
      response.json().then(msg => {
        setJsonResponseMessage("No se pudo editar el resultado.");
      })
   });
  }

  const fetchEvento = async () => {
        await getEventoAPI(itemId).then(res => {
          res.json().then(response => {
            setNombreLocal(response.equipoLocal.nombre);
            setNombreVisitante(response.equipoVisitante.nombre);
          })
        });
}

  useEffect(function effectFunction() {

    async function fetchResultado() {
        await getResultadoAPI(itemId).then(res => {
          res.json().then(response => {
            setResultado(response.id);
            setPuntajeLocal(response.puntajeEquipoLocal);
            setPuntajeVisitante(response.puntajeEquipoVisitante);
          })
        });
    }
    fetchEvento();
    fetchResultado();

}, []);

  return (
    <DashboardLayout>
      <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                Resultado del evento
              </SoftTypography>
            </SoftBox>
          </Grid>
      </Card>
    </SoftBox>
      <SoftBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <SoftBox p={2}>
                <SoftTypography variant="h5">Editar un resultado al evento</SoftTypography>
              </SoftBox>
              <SoftBox pt={2} px={2}>
                <SoftAlert color="info">
                  {alertContent("info")}
                </SoftAlert>
              </SoftBox>
              <form>
              <SoftBox p={3}>
                    <SoftTypography variant="h5">{nombreLocal}</SoftTypography>
                    <SoftBox p={1}></SoftBox>
                    <TextField
                        id="outlined-number1"
                        label="Puntaje"
                        type="number"
                        value={puntajeLocal}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={(e) => setPuntajeLocal(e.target.value)}
                        /> 
              </SoftBox>
              <SoftBox p={3}>
                    <SoftTypography variant="h5">{nombreVisitante}</SoftTypography>
                    <SoftBox p={1}></SoftBox>
                    <TextField
                        id="outlined-number2"
                        label="Puntaje"
                        type="number"
                        value={puntajeVisitante}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={(e) => setPuntajeVisitante(e.target.value)}
                        /> 
              </SoftBox>
              </form>
              {showMsg &&!isSuccess && <SoftBox pt={2} px={2}>
                <SoftAlert color="error">
                  {jsonError(jsonResponseMessage)}
                </SoftAlert>
              </SoftBox>}
             {showMsg && isSuccess && <SoftBox pt={2} px={2}>
                <SoftAlert color="success">
                  {jsonSuccess()}
                </SoftAlert>
              </SoftBox>}
              <SoftBox p={2}>
                <SoftButton variant="outlined" color="info" size="small"  style={{ marginRight: "auto" }} onClick={submitResultado}>
                    Editar resultado
                </SoftButton>
                <SoftButton variant="outlined" color="error" size="small"  style={{ marginRight: "auto" }} onClick={() => navigate(-2)}>
                    Volver
                </SoftButton>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditResultado;
