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
import editPlanApi from "../../api/editPlan";
import getPlanApi from "../../api/getPlan";
import { useNavigate, useParams } from "react-router-dom";
import curved0 from "assets/images/logo4.png";

function EditPlan() {

  const { itemId } = useParams();
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [cantUsuarios, setCantUsuarios] = useState('');
  const [porcentaje, setPorcentaje] = useState('');
  const [lookAndFeel, setLookAndFeel] = useState(0);
  const navigate = useNavigate();


  const alertContent = () => (
    <SoftTypography variant="body2" color="white">
      Los look&feel asociados al plan no podrán ser dados de alta ni modificados desde la plataforma de administración.
    </SoftTypography>
  );

  const jsonError = (name) => (
    <SoftTypography variant="body2" color="white">
      {name}
    </SoftTypography>
  );

  const jsonSuccess = () => (
    <SoftTypography variant="body2" color="white">
      El plan se ha editado con éxito.
    </SoftTypography>
  );

  const submitPlan = async () => {
    const data = {
        cantUser: cantUsuarios,
        percentageCost: porcentaje,
        lookAndFeel: lookAndFeel
   }
   editPlanApi(itemId,data).then(response => {
      setIsSuccess(response.ok);
      setShowMsg(true);
      response.json().then(msg => {
        setJsonResponseMessage("No se pudo editar el plan.");
      })
   });
  }

  useEffect(function effectFunction() {

    async function fetchPlan() {
        await getPlanApi(itemId).then(res => {
          res.json().then(response => {
            setCantUsuarios(response.cantUser);
            setPorcentaje(response.percentageCost);
          })
        });
    }

    fetchPlan();

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
                Planes
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
                <SoftTypography variant="h5">Fromulario de ingreso para un plan</SoftTypography>
                <SoftTypography variant="subtitle1">Todos los campos son obligatorios y deben ser mayoes a cero</SoftTypography>
              </SoftBox>
              <SoftBox pt={2} px={2}>
                <SoftAlert color="info">
                  {alertContent("info")}
                </SoftAlert>
              </SoftBox>
              <form>
                <SoftBox p={2}>
                  <SoftTypography variant="h5">Cantidad de usuarios *</SoftTypography>
                  <SoftBox p={2}></SoftBox>
                  <TextField
                        id="outlined-number"
                        label="Usuarios"
                        type="number"
                        value={cantUsuarios}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={(e) => setCantUsuarios(e.target.value)}
                        />
                </SoftBox>
                <SoftBox p={2}>
                  <SoftTypography variant="h5">Porcentaje de ganancia *</SoftTypography>
                  <SoftBox p={2}></SoftBox>
                  <TextField
                        id="outlined-number1"
                        label="Porcentaje"
                        type="number"
                        value={porcentaje}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                        onChange={(e) => setPorcentaje(e.target.value)}
                        />  %
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
                <SoftButton variant="outlined" color="info" size="small"  style={{ marginRight: "auto" }} onClick={submitPlan}>
                    Editar plan
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

export default EditPlan;
