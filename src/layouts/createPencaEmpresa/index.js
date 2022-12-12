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
import createPremioApi from "../../api/createPremio";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import createPencaEmpresaApi from "../../api/createPencaEmpresa";
import createPuntajeAPI from "../../api/createPuntaje";
import getCampeonatosAPI from "../../api/getCampeonatos";
import getPremiosAPI from "../../api/getPremios";
import getEmpresasAPI from "../../api/getEmpresas";

// API requests
import { useNavigate } from "react-router-dom";
import curved0 from "assets/images/logo4.png";

function CreatePencaEmpresa() {
  
  const [title, setTitle] = useState('');
  const [loadingRows, setLoadingRows] = useState(false);
  const [description, setDescription] = useState('');
  const [campeonato, setCampeonato] = useState('');
  const [campeonatos, setCampeonatos] = useState([]);
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [premios, setPremios] = useState([]);
  const [prizes, setPrizes] = useState([]);
  const [empresa, setEmpresa] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [planId, setPlanId] = useState([]);
  const [tenantCode, setTenantCode] = useState('');
  const [resultado, setResultado] = useState(0);
  const [resultadoExacto, setResultadoExacto] = useState(0);
  /*const [porcentaje1, setPorcentaje1] = useState(0);
  const [porcentaje2, setPorcentaje2] = useState(0);
  const [porcentaje3, setPorcentaje3] = useState(0);
  const [porcentaje4, setPorcentaje4] = useState(0);
  const [porcentaje5, setPorcentaje5] = useState(0);*/
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
      La penca se ha dado de alta con éxito.
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
    /*var premiosIds = [];
    var dataPremios = [];
    const dataPremio1 = {
      position: 1,
      percentage: porcentaje1
    }
    const dataPremio2 = {
      position: 2,
      percentage: porcentaje2
    }
    const dataPremio3 = {
      position: 3,
      percentage: porcentaje3
    }
    const dataPremio4 = {
      position: 4,
      percentage: porcentaje4
    }
    const dataPremio5 = {
      position: 5,
      percentage: porcentaje5
    }
    dataPremios.push(dataPremio1);
    dataPremios.push(dataPremio2);
    dataPremios.push(dataPremio3);
    dataPremios.push(dataPremio4);
    dataPremios.push(dataPremio5);
    dataPremios.map((dp) => {
      if(dp.percentage !== 0){
        createPremioApi(dp).then(response => {
         response.json().then(r => {
          const dataPremioCreado = {
            id: r.id
          }
          premiosIds.push(dataPremioCreado);
         });
      });
      }
    });*/
    const dataPuntaje = {
      id: 0,
      resultado: resultado,
      resultadoExacto: resultadoExacto
    }
    createPuntajeAPI(dataPuntaje).then(responsePuntaje => {
      responsePuntaje.json().then(r => {
        const data = {
          id: 0,
          title: title,
          description: description,
          image: "string",
          campeonato: {
            id: campeonato
          },
          puntajeId: r.id,
          premios: premios,
          empresa: {
             id: empresa,
             planId: planId,
             tenantCode: tenantCode
          }
        };
       createPencaEmpresaApi(data).then(response => {
          setIsSuccess(response.ok);
          setShowMsg(true);
          response.json().then(msg => {
            setJsonResponseMessage("No se pudo dar de alta la penca.");
          })
       });
      });
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
  
  const fetchEmpesas = async () => {
    setLoadingRows(true);
    getEmpresasAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          r.map((row)=> empresas.push({ label: row.razonsocial, planId: row.planId, id: row.id, tenantCode: row.tenantCode }));
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

  useEffect(() => {
    fetchPremios();
    fetchEmpesas();
    fetchCampeonatos();
  }, []);

  function handleEmpresaChange(id, plan, tenantCode){
    setEmpresa(id);
    setPlanId(plan);
    setTenantCode(tenantCode);
  }

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
                <SoftTypography variant="h5">Fromulario de ingreso para una penca empresa</SoftTypography>
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
                <SoftBox p={2}>
                    <SoftTypography variant="h5">Campeonato *</SoftTypography>
                    <SoftBox p={1}></SoftBox>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={campeonatos}
                      sx={{ width: 300 }}
                      onChange={(event, value) => setCampeonato(value.id)}
                      renderInput={(params) => <TextField {...params} label="" />}
                    />
                </SoftBox>
                <SoftBox p={2}>
                    <SoftTypography variant="h5">Premios *</SoftTypography>
                    <SoftBox p={1}></SoftBox>
                    <InputLabel></InputLabel>
                    <Select
                      multiple
                      value={premios}
                      renderValue={(premios) => (
                        <div>
                          {premios.map((ev) => (
                            <Chip key={ev.id} label={ev.label} />
                          ))}
                        </div>
                      )}
                    >
                      {prizes.map(ev =>  <MenuItem onClick={() => selectionChangeHandler(ev.id,ev.label)} value={ev.id} label={ev.label}>{ev.label}</MenuItem>)}
                    </Select>
                    <FormHelperText>Seleccione los premios de la penca</FormHelperText>
                      {/*<Grid container spacing={20} justifyContent="left" >
                        <Grid item xs={2} lg={2}>
                              <SoftBox p={2}>
                                <SoftBox p={2}></SoftBox>
                                <TextField
                                      id="outlined-number1"
                                      label="1° %"
                                      type="number"
                                      value={porcentaje1}
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                      InputProps={{ inputProps: { min: 0, max: 5 } }}
                                      onChange={(e) => setPorcentaje1(e.target.value)}
                                      /> 
                              </SoftBox>
                        </Grid>
                        <Grid item xs={2} lg={2}>
                              <SoftBox p={2}>
                                <SoftBox p={2}></SoftBox>
                                <TextField
                                      id="outlined-number2"
                                      label="2° %"
                                      type="number"
                                      value={porcentaje2}
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                      InputProps={{ inputProps: { min: 0, max: 5 } }}
                                      onChange={(e) => setPorcentaje2(e.target.value)}
                                      /> 
                              </SoftBox>
                        </Grid>
                        <Grid item xs={2} lg={2}>
                              <SoftBox p={2}>
                                <SoftBox p={2}></SoftBox>
                                <TextField
                                      id="outlined-number3"
                                      label="3° %"
                                      type="number"
                                      value={porcentaje3}
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                      InputProps={{ inputProps: { min: 0, max: 5 } }}
                                      onChange={(e) => setPorcentaje3(e.target.value)}
                                      /> 
                              </SoftBox>
                        </Grid>
                        <Grid item xs={2} lg={2}>
                              <SoftBox p={2}>
                                <SoftBox p={2}></SoftBox>
                                <TextField
                                      id="outlined-number4"
                                      label="4° %"
                                      type="number"
                                      value={porcentaje4}
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                      InputProps={{ inputProps: { min: 0, max: 5 } }}
                                      onChange={(e) => setPorcentaje4(e.target.value)}
                                      /> 
                              </SoftBox>
                        </Grid>
                        <Grid item xs={2} lg={2}>
                              <SoftBox p={2}>
                                <SoftBox p={2}></SoftBox>
                                <TextField
                                      id="outlined-number5"
                                      label="5° %"
                                      type="number"
                                      value={porcentaje5}
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                      InputProps={{ inputProps: { min: 0, max: 5 } }}
                                      onChange={(e) => setPorcentaje5(e.target.value)}
                                      /> 
                              </SoftBox>
                        </Grid>
                                    </Grid>*/}
                </SoftBox>
                <SoftBox p={2}>
                    <SoftTypography variant="h5">Puntaje *</SoftTypography>
                    <SoftBox p={1}></SoftBox>
                    <TextField
                        id="outlined-number8"
                        label="resultado"
                        type="number"
                        variant="standard"
                        value={resultado}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                        onChange={(e) => setResultado(e.target.value)}
                        /> 
                        <SoftBox p={1}></SoftBox>
                    <TextField
                        id="outlined-number9"
                        label="resultado exacto"
                        type="number"
                        variant="standard"
                        value={resultadoExacto}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                        onChange={(e) => setResultadoExacto(e.target.value)}
                        /> 
                </SoftBox>
                <SoftBox p={2}>
                <SoftTypography variant="h5">Empresa *</SoftTypography>
                <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={empresas}
                      sx={{ width: 300 }}
                      onChange={(event, value) => handleEmpresaChange(value.id, value.planId, value.tenantCode)}
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
              <SoftBox p={2}>
                <SoftButton variant="outlined" color="info" size="small"  style={{ marginRight: "auto" }} onClick={submitPenca}>
                    Añadir penca
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

export default CreatePencaEmpresa;
