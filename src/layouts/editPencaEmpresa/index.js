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
import Autocomplete from '@mui/material/Autocomplete';

// Material Dashboard 2 React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAlert from "components/SoftAlert";
import SoftButton from "components/SoftButton";
import { Select, MenuItem, FormHelperText, FormControl, InputLabel, Chip } from '@material-ui/core';


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import editPencaEmpresaApi from "../../api/editPencaEmpresa";
import getPencaEmpresaApi from "../../api/getPencaEmpresa";
import getCampeonatosAPI from "../../api/getCampeonatos";
import getPremiosAPI from "../../api/getPremios";

// API requests
import { useNavigate, useParams } from "react-router-dom";
import curved0 from "assets/images/logo4.png";

function EditPencaEmpresa() {
  
  const { itemId } = useParams();
  const [title, setTitle] = useState('');
  const [loadingRows, setLoadingRows] = useState(false);
  const [description, setDescription] = useState('');
  const [campeonato, setCampeonato] = useState('');
  const [campeonatos, setCampeonatos] = useState([]);
  const [nombreCampeonato, setNombreCampeonato] = useState('');
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [premios, setPremios] = useState([]);
  const [prizes, setPrizes] = useState([]);
  const [empresa, setEmpresa] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [mostrarImagen, setMostrarImagen] = useState(false);
  const [fileSelected, setFileSelected] = useState();
  const [planId, setPlanId] = useState([]);
  const [tenantCode, setTenantCode] = useState('');
  const [razonSocial, setRazonSocial] = useState([]);
  const [puntajeId, setPuntajeId] = useState(0);
  const [jsonResponseMessageImage, setJsonResponseMessageImage] = useState('');
  const [isSuccessImage, setIsSuccessImage] = useState('');
  const [showMsgImage, setShowMsgImage] = useState(false);
  const navigate = useNavigate();

  const alertContent = () => (
    <SoftTypography variant="body2" color="white">
      La penca debe tener al menos un premio asociado
    </SoftTypography>
  );

  const jsonError = (name) => (
    <SoftTypography variant="body2" color="white">
      {name}
    </SoftTypography>
  );

  const jsonSuccess = () => (
    <SoftTypography variant="body2" color="white">
      La penca se ha editado con éxito.
    </SoftTypography>
  );

  const jsonSuccessImage = () => (
    <SoftTypography variant="body2" color="white">
      Se ha subido la imágen.
    </SoftTypography>
  );

  function selectionChangeHandler(id,label) {
    premios.push({ label: label, id: id });
  };



  const fetchPremios = async () => {
    setLoadingRows(true);
    getPremiosAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          r.map((row)=> prizes.push({ label: row.position + ": " + row.percentage + "%", id: row.id }));
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

  const submitPenca = async () => {
    const data = {
        id: 0,
        title: title,
        description: description,
        campeonato: {
          
        },
        puntajeId: puntajeId,
        premios: premios,
        empresa: {
           id: empresa,
           planId: planId,
           tenantCode: tenantCode
        }
      };
   editPencaEmpresaApi(itemId,data).then(response => {
      setIsSuccess(response.ok);
      setShowMsg(true);
      response.json().then(msg => {
        setJsonResponseMessage("No se pudo editar la penca.");
      })
   });
  };

  const fetchCampeonatos = async () => {
    setLoadingRows(true);
    getCampeonatosAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          r.map((row)=> campeonatos.push({ label: row.name, id: row.id }));
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
  };

  const saveFileSelected= (e) => {
    setFileSelected(e.target.files[0]);
    setMostrarImagen(false);
  };
  
  const importFile= async (e) => {
    const file = new FormData();
    file.append("file", fileSelected);
    try {
      fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/pencas-empresas/${itemId}/image`, {
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

  function handleEmpresaChange(id, plan){
    setEmpresa(id);
    setPlanId(plan);
  };

  const fetchPencaEmpresa = async () => {
    await getPencaEmpresaApi(itemId).then(res => {
      res.json().then(response => {
        setTitle(response.title);
        setDescription(response.description);
        setFileSelected(response.image);
        if(response.image != null && response.image != "string"){
          setMostrarImagen(true);
        }
        setEmpresa(response.empresa.id);
        setCampeonato(response.campeonato.id);
        setNombreCampeonato(response.campeonato.name);
        setRazonSocial(response.empresa.razonsocial);
        setPlanId(response.empresa.planId);
        setTenantCode(response.empresa.tenantCode);
        setPuntajeId(response.puntajeId);
        response.premios.map((row)=> premios.push({ label: row.position + ": " + row.percentage + "%", id: row.id }));
      })
    });
  }

  useEffect(() => {
    fetchPremios();
    fetchCampeonatos();
    fetchPencaEmpresa();
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
                Pencas empresa
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
                <SoftTypography variant="h5">Editar penca empresa</SoftTypography>
                <SoftTypography variant="subtitle1">Los campos marcados con * son obligatorios</SoftTypography>
              </SoftBox>
              <SoftBox pt={2} px={2}>
                <SoftAlert color="info">
                  {alertContent("info")}
                </SoftAlert>
              </SoftBox>
              <form>
                <SoftBox p={2}>
                  <SoftTypography variant="h5">Título *</SoftTypography>
                  <TextField id="standard-basic" variant="standard" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </SoftBox>
                <SoftBox p={2}>
                  <SoftTypography variant="h5">Descripción</SoftTypography>
                  <TextField id="standard-basic" variant="standard" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </SoftBox>
                {/*<SoftBox p={2}>
                    <SoftTypography variant="h5">Campeonato *</SoftTypography>
                    <SoftBox p={1}></SoftBox>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={campeonatos}
                      value={nombreCampeonato}
                      sx={{ width: 300 }}
                      onChange={(event, value) => setCampeonato(value)}
                      renderInput={(params) => <TextField {...params} label="" />}
                    />
                </SoftBox>*/}
                <SoftBox p={2}> 
                <input type="file" onChange={saveFileSelected} />
                {fileSelected && mostrarImagen && <div>
                  <img style={{width: 400, height: 400}} src={`${fileSelected}`}/>
                </div>}
                </SoftBox>
                <SoftBox p={2}>
                <SoftTypography variant="h5">Empresa *</SoftTypography>
                <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={empresas}
                      value={razonSocial}
                      sx={{ width: 300 }}
                      onChange={(event, value) => handleEmpresaChange(value.id, value.planId)}
                      renderInput={(params) => <TextField {...params} label="" />}
                    />
                </SoftBox>
               {/* <SoftBox p={2}>
                    <SoftTypography variant="h5">Publicar campeonato en la lista para nuevas pencas?</SoftTypography>
                    <SoftBox p={1}></SoftBox>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="1"
                      name="radio-buttons-group"
                      onChange={(e) => setPublicarPenca(e.target.value)}
                    >
                      <FormControlLabel value="1" control={<Radio />} label="Publicar" />
                      <FormControlLabel value="2" control={<Radio />} label="Mantener privado" />
                    </RadioGroup>
                </SoftBox>
                 <SoftBox p={2}>
                <SoftTypography variant="h9">Cuándo publicar el campeonato?</SoftTypography>
                <SoftBox p={1}></SoftBox>
                    <TextField id="standard-basic"
                        type="date"
                        defaultValue="2022-10-11"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => setFechaPublicacionPenca(e.target.value)} disabled={publicarPenca != 2}/>
              </SoftBox>*/}
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
                <SoftButton variant="outlined" color="info" size="small"  style={{ marginRight: "auto" }} onClick={submitPenca}>
                    Editar penca
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

export default EditPencaEmpresa;
