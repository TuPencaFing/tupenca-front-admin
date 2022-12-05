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
import { Select, MenuItem, FormHelperText, InputLabel, Chip } from '@material-ui/core';


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DateTimePicker from 'react-datetime-picker'
import editCampeonatoApi from "../../api/editCampeonato";
import getDeportesAPI from "../../api/getDeportes";
import getEventosAPI from "../../api/getEventos";
import getCampeonatoAPI from "../../api/getCampeonato";

// API requests
import { useNavigate, useParams } from "react-router-dom";
import curved0 from "assets/images/logo4.png";

function EditCampeonato() {
  
  const { itemId } = useParams();
  const [deporte, setDeporte] = useState('');
  const [loadingRows, setLoadingRows] = useState(false);
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [nombreCampeonato, setNombreCampeonato] = useState('');
  const [nombreDeporte, setNombreDeporte] = useState('');
  const [sports, setSports] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [mostrarImagen, setMostrarImagen] = useState(true);
  const [fileSelected, setFileSelected] = useState();
  const navigate = useNavigate();

  const alertContent = () => (
    <SoftTypography variant="body2" color="white">
      El campeonato debe estar en progreso o a comenzar próximamente.
    </SoftTypography>
  );

  const jsonError = (name) => (
    <SoftTypography variant="body2" color="white">
      {name}
    </SoftTypography>
  );

  const jsonSuccess = () => (
    <SoftTypography variant="body2" color="white">
      El campeonato se ha editado con éxito.
    </SoftTypography>
  );

  const saveFileSelected= (e) => {
    setFileSelected(e.target.files[0]);
    setMostrarImagen(false);
  };
  
  const importFile= async (e) => {
    const file = new FormData();
    file.append("file", fileSelected);
    try {
      fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/campeonatos/${itemId}/image`, {
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

  const submitCampeonato = async () => {
    const data = {
      id: 0,
      name: nombreCampeonato,
      startDate: fechaInicio,
      finishDate: fechaFin,
      deporte: {
        id: deporte
      },
      eventos: eventos
    };
   editCampeonatoApi(itemId,data).then(response => {
      setIsSuccess(response.ok);
      setShowMsg(true);
      response.json().then(msg => {
        setJsonResponseMessage("No se pudo editar el campeonato.");
      })
   });
  }

  const fetchDeportes = async () => {
    setLoadingRows(true);
    getDeportesAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          r.map((row)=> sports.push({ label: row.nombre, sport: row.id }));
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

  function selectionChangeHandler(id,label) {
    eventos.push({ label: label, id: id });
  };


  const fetchCampeonato = async () => {
    await getCampeonatoAPI(itemId).then(res => {
      res.json().then(response => {
        setNombreCampeonato(response.name);
        setFechaInicio(new Date(response.startDate));
        setFechaFin(new Date(response.finishDate));
        setDeporte(response.deporte.id);
        setNombreDeporte(response.deporte.nombre);
        setFileSelected(response.image);
        response.eventos.map((row)=> eventos.push({ label: row.equipoLocal.nombre + " vs " + row.equipoVisitante.nombre, id: row.id, equipoLocal: {id: 0,nombre:""}, equipoVisitante: {id: 0, nombre:"" } }));
      })
    });
  }

  const fetchEventos = async () => {
    setLoadingRows(true);
    getEventosAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          r.map((row)=> events.push({ label: row.equipoLocal.nombre + " vs " + row.equipoVisitante.nombre, id: row.id }));
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

  useEffect(() => {
    fetchDeportes();
    fetchEventos();
    fetchCampeonato();
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
                Campeonatos
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
                <SoftTypography variant="h5">Fromulario de ingreso para un campeonato</SoftTypography>
                <SoftTypography variant="subtitle1">Los campos marcados con * son obligatorios</SoftTypography>
              </SoftBox>
              <SoftBox pt={2} px={2}>
                <SoftAlert color="info">
                  {alertContent("info")}
                </SoftAlert>
              </SoftBox>
              <form>
                <SoftBox p={2}>
                  <SoftTypography variant="h5">Nombre del campeonato *</SoftTypography>
                  <TextField id="standard-basic" variant="standard" value={nombreCampeonato} onChange={(e) => setNombreCampeonato(e.target.value)}/>
                </SoftBox>
                <SoftBox p={2}>
                    <SoftTypography variant="h5">Deporte *</SoftTypography>
                    <SoftBox p={1}></SoftBox>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={sports}
                      value={nombreDeporte}
                      sx={{ width: 300 }}
                      onChange={(event, value) => setDeporte(value.sport)}
                      renderInput={(params) => <TextField {...params} label="" />}
                    />
                </SoftBox>
                <SoftBox p={2}>
                    <SoftTypography variant="h5">Fecha de inicio *</SoftTypography>
                    <SoftBox p={1}></SoftBox>
                    <DateTimePicker onChange={setFechaInicio} value={fechaInicio} />
                </SoftBox>
                <SoftBox p={2}>
                    <SoftTypography variant="h5">Fecha de finalización *</SoftTypography>
                    <SoftBox p={1}></SoftBox>
                    <DateTimePicker onChange={setFechaFin} value={fechaFin} />
                </SoftBox>
                <SoftBox p={2}>
                    <SoftTypography variant="h5">Eventos *</SoftTypography>
                    <SoftBox p={1}></SoftBox>
                    <InputLabel></InputLabel>
                    <Select
                      multiple
                      value={eventos}
                      renderValue={(eventos) => (
                        <div>
                          {eventos.map((ev) => (
                            <Chip key={ev.id} label={ev.label} />
                          ))}
                        </div>
                      )}
                    >
                      {events.map(ev =>  <MenuItem onClick={() => selectionChangeHandler(ev.id,ev.label)} value={ev.id} label={ev.label}>{ev.label}</MenuItem>)}
                    </Select>
                    <FormHelperText>Seleccione los eventos del campeonato</FormHelperText>
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
              <SoftBox p={2}> 
                <input type="file" onChange={saveFileSelected} />
                <input type="button" value="Subir imágen" onClick={importFile} />
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
              <SoftBox p={2}>
                <SoftButton variant="outlined" color="info" size="small"  style={{ marginRight: "auto" }} onClick={submitCampeonato}>
                    Editar campeonato
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

export default EditCampeonato;
