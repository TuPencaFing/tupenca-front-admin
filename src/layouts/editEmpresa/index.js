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
import getEmpresaAPI from "../../api/getEmpresa";
import editEmpresaApi from "../../api/editEmpresa";
import { useNavigate, useParams} from "react-router-dom";
import curved0 from "assets/images/logo4.png";

function EditEmpresa() {

  const { itemId } = useParams();
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [razonsocial, setRazonsocial] = useState('');
  const [rut, setRut] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const [fileSelected, setFileSelected] = useState();


  const alertContent = () => (
    <SoftTypography variant="body2" color="white">
      El RUT debe ser único dentro del sistema.
    </SoftTypography>
  );

  const jsonError = (name) => (
    <SoftTypography variant="body2" color="white">
      {name}
    </SoftTypography>
  );

  const jsonSuccess = () => (
    <SoftTypography variant="body2" color="white">
      La empresa se ha editado con éxito.
    </SoftTypography>
  );

  const submitEmpresa = async () => {
    const data = {
        razonsocial: razonsocial,
        rut: rut
   }
   editEmpresaApi(itemId,data).then(response => {
      setIsSuccess(response.ok);
      setShowMsg(true);
      response.json().then(msg => {
        setJsonResponseMessage("No se pudo eitar la empresa.");
      })
   });
  }

  useEffect(function effectFunction() {

    async function fetchEmpresa() {
        await getEmpresaAPI(itemId).then(res => {
          res.json().then(response => {
            setId(itemId);
            setRazonsocial(response.razonsocial);
            setRut(response.rut);
            setFileSelected(response.image);
          })
        });
    }

    fetchEmpresa();

}, []);

const saveFileSelected= (e) => {
  setFileSelected(e.target.files[0]);
};

const importFile= async (e) => {
  const file = new FormData();
  file.append("file", fileSelected);
  try {
    fetch(`https://tupenca-back-test.azurewebsites.net/api/empresas/${itemId}/image`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: file
   })
  } catch (ex) {
    console.log(ex);
  }
};

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
                Empresas
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
                <SoftTypography variant="h5">Fromulario para editar una empresa</SoftTypography>
                <SoftTypography variant="subtitle1">Los campos marcados con * son obligatorios</SoftTypography>
              </SoftBox>
              <SoftBox pt={2} px={2}>
                <SoftAlert color="info">
                  {alertContent("info")}
                </SoftAlert>
              </SoftBox>
              <form>
                <SoftBox p={2}>
                  <SoftTypography variant="h5">Razón social *</SoftTypography>
                  <TextField id="standard-basic" variant="standard" value={razonsocial} onChange={(e) => setRazonsocial(e.target.value)}/>
                </SoftBox>
                <SoftBox p={2}>
                  <SoftTypography variant="h5">RUT *</SoftTypography>
                  <TextField id="standard-basic" variant="standard" value={rut} onChange={(e) => setRut(e.target.value)}/>
                </SoftBox>
                <input type="file" onChange={saveFileSelected} />
                <input type="button" value="upload" onClick={importFile} />
                <div>
                  <img style={{width: 400, height: 400}} src={`${fileSelected}`}/>
                </div>
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
                <SoftButton variant="outlined" color="info" size="small"  style={{ marginRight: "auto" }} onClick={submitEmpresa}>
                    Añadir empresa
                </SoftButton>
                <SoftButton variant="outlined" color="error" size="small"  style={{ marginRight: "auto" }} onClick={() => navigate(-1)}>
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

export default EditEmpresa;
