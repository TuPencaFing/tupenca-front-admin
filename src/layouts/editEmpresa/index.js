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
import Autocomplete from '@mui/material/Autocomplete';


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// API requests
import getEmpresaAPI from "../../api/getEmpresa";
import editEmpresaApi from "../../api/editEmpresa";
import { useNavigate, useParams} from "react-router-dom";
import curved0 from "assets/images/logo4.png";
import getPlanesAPI from "../../api/getPlanes";

function EditEmpresa() {

  const { itemId } = useParams();
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [razonsocial, setRazonsocial] = useState('');
  const [rut, setRut] = useState('');
  const [id, setId] = useState('');
  const [mostrarImagen, setMostrarImagen] = useState(true);
  const [planes, setPlanes] = useState([]);
  const [plan, setPlan] = useState('');
  const [loadingRows, setLoadingRows] = useState(false);
  const [planRow, setPlanRow] = useState('');
  const navigate = useNavigate();
  const [fileSelected, setFileSelected] = useState();
  const [jsonResponseMessageImage, setJsonResponseMessageImage] = useState('');
  const [isSuccessImage, setIsSuccessImage] = useState('');
  const [showMsgImage, setShowMsgImage] = useState(false);


  const alertContent = () => (
    <SoftTypography variant="body2" color="white">
      Se recomienda solo upgradear el plan de la empresa.
    </SoftTypography>
  );

  const jsonError = (name) => (
    <SoftTypography variant="body2" color="white">
      {name}
    </SoftTypography>
  );
  
  const jsonSuccessImage = () => (
    <SoftTypography variant="body2" color="white">
      Se ha subido la imágen.
    </SoftTypography>
  );

  const jsonSuccess = () => (
    <SoftTypography variant="body2" color="white">
      La empresa se ha editado con éxito.
    </SoftTypography>
  );

  const submitEmpresa = async () => {
    const data = {
      id: plan
    }
   editEmpresaApi(itemId,data).then(response => {
      setIsSuccess(response.ok);
      setShowMsg(true);
      response.json().then(msg => {
        setJsonResponseMessage("No se pudo editar la empresa.");
      })
   });
  };

  const fetchPlanes = async () => {
    setLoadingRows(true);
    getPlanesAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          r.map((row)=> planes.push({ label: "usuarios: " + row.cantUser + " , costo: " + row.percentageCost, id: row.id }));
        });

      } else {
        return Promise.reject(response);
      }
    })
      .catch((e) => {
        console.log('error', e);
      })
      .finally(() => {
        setLoadingRows(false);
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
            setPlan(response.planId);
            setPlanRow("usuarios: " + response.plan.cantUser + " , costo: " + response.plan.percentageCost);
          })
        });
    }
    fetchPlanes();
    fetchEmpresa();

}, []);

const saveFileSelected= (e) => {
  setFileSelected(e.target.files[0]);
  setMostrarImagen(false);
};

const importFile= async (e) => {
  const file = new FormData();
  file.append("file", fileSelected);
  try {
    fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/empresas/${itemId}/image`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: file
   }).then(response => {
          setIsSuccessImage(response.ok);
          setShowMsgImage(true);
          response.json().then(msg => {
            setJsonResponseMessageImage("No se pudo editar la imágen.");
          })
      });
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
              </SoftBox>
              <SoftBox pt={2} px={2}>
                <SoftAlert color="info">
                  {alertContent("info")}
                </SoftAlert>
              </SoftBox>
              <form>
                <SoftBox p={2}>
                <SoftTypography variant="h5">Plan *</SoftTypography>
                <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={planes}
                      value={planRow}
                      sx={{ width: 300 }}
                      onChange={(event, value) => setPlan(value.id)}
                      renderInput={(params) => <TextField {...params} label="" />}
                    />
                </SoftBox>
                <SoftBox p={2}> 
                <input type="file" onChange={saveFileSelected} />
                {fileSelected && mostrarImagen && <div>
                  <img style={{width: 400, height: 400}} src={`${fileSelected}`}/>
                </div>}
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
              {showMsgImage && isSuccessImage && <SoftBox pt={2} px={2}>
                <SoftAlert color="success">
                  {jsonSuccessImage()}
                </SoftAlert>
              </SoftBox>}
              <SoftBox p={2}>
                <SoftButton variant="outlined" color="info" size="small"  style={{ marginRight: "auto" }} onClick={submitEmpresa}>
                    Editar empresa
                </SoftButton>
                <SoftButton variant="outlined" color="info" size="small"  style={{ marginRight: "auto" }} onClick={importFile}>
                    Subir imágen
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

export default EditEmpresa;
