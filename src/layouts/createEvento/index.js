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
import DateTimePicker from 'react-datetime-picker'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Switch from '@mui/material/Switch';


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
import createEventoApi from "../../api/createEvento";
import { useNavigate } from "react-router-dom";
import curved0 from "assets/images/logo4.png";
import getEquiposAPI from "../../api/getEquipos";

function CreateEvento() {

  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [rows, setRows] = useState([]);
  const [loadingRows, setLoadingRows] = useState(false);
  const [fechaInicial, setFechaInicial] = useState('');
  const [teams, setTeams] = useState([]);
  const [equipoLocalId, setEquipoLocalId] = useState('');
  const [equipoVisitanteId, setEquipoVisitanteId] = useState('');
  const [isPuntajeValid, setIsPuntajeValid] = useState(true);
  const [isEmpateValid, setIsEmpateValid] = useState(true);
  const navigate = useNavigate();


  function handlePuntajeChange() {
    if (isPuntajeValid) {
      setIsPuntajeValid(false);
    }
    else {
      setIsPuntajeValid(true);
    }
  };

  function handleEmpateChange() {
    if (isEmpateValid) {
      setIsEmpateValid(false);
    }
    else {
      setIsEmpateValid(true);
    }
  };

  const alertContent = () => (
    <SoftTypography variant="body2" color="white">
      Solo se controlará la unicidad del nombre por exactitud.
    </SoftTypography>
  );

  const jsonError = (name) => (
    <SoftTypography variant="body2" color="white">
      {name}
    </SoftTypography>
  );

  const jsonSuccess = () => (
    <SoftTypography variant="body2" color="white">
      El evento se ha dado de alta con éxito.
    </SoftTypography>
  );

  const submitEvento = async () => {
    const data = {
      fechaInicial: fechaInicial,
      equipoLocalId: equipoLocalId,
      equipoVisitanteId: equipoVisitanteId,
      isEmpateValid: isEmpateValid,
      isPuntajeEquipoValid: isPuntajeValid
   }
   createEventoApi(data).then(response => {
      setIsSuccess(response.ok);
      setShowMsg(true);
      response.json().then(msg => {
        setJsonResponseMessage("No se pudo dar de alta el evento.");
      })
   });
  }

  const fetchEquipos = async () => {
    setLoadingRows(true);
    getEquiposAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          r.map((row)=> teams.push({ label: row.nombre, team: row.id }));
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
    fetchEquipos();
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
                Eventos
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
                <SoftTypography variant="h5">Fromulario de ingreso para un evento</SoftTypography>
                <SoftTypography variant="subtitle1">Todos los campos son obligatorios</SoftTypography>
              </SoftBox>
              <SoftBox pt={2} px={2}>
                <SoftAlert color="info">
                  {alertContent("info")}
                </SoftAlert>
              </SoftBox>
              <form>
              <SoftBox p={3}>
                    <SoftTypography variant="h5">Fecha del evento *</SoftTypography>
                    <SoftBox p={1}></SoftBox>
                    <DateTimePicker onChange={setFechaInicial} value={fechaInicial} />
              </SoftBox>
               <SoftBox p={3}>
                  <SoftTypography variant="h5">Equipo local *</SoftTypography>
                  <SoftBox p={1}></SoftBox>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo1"
                      options={teams}
                      sx={{ width: 300 }}
                      onChange={(event, value) => setEquipoLocalId(value.team)}
                      renderInput={(params) => <TextField {...params} label="" />}
                    />
               </SoftBox>
               <SoftBox p={3}>
                  <SoftTypography variant="h5">Equipo visitante*</SoftTypography>
                  <SoftBox p={1}></SoftBox>
                  <Autocomplete
                      disablePortal
                      id="combo-box-demo2"
                      options={teams}
                      sx={{ width: 300 }}
                      onChange={(event, value) => setEquipoVisitanteId(value.team)}
                      renderInput={(params) => <TextField {...params} label="" />}
                    />
               </SoftBox>
               <SoftBox  p={3}>
               <SoftTypography variant="h5">Habilita resultado por puntos?</SoftTypography>
                  <Switch
                    checked={isPuntajeValid}
                    onChange={handlePuntajeChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
               </SoftBox>
               <SoftBox  p={3}>
               <SoftTypography variant="h5">Habilita empate?</SoftTypography>
                  <Switch
                    checked={isEmpateValid}
                    onChange={handleEmpateChange}
                    inputProps={{ 'aria-label': 'controlled' }}
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
                <SoftButton variant="outlined" color="info" size="small"  style={{ marginRight: "auto" }} onClick={submitEvento}>
                    Añadir evento
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

export default CreateEvento;
