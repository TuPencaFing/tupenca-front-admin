/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import {useState, useEffect} from 'react';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import getMetricasAPI from "../../api/getMetricas";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import SoftTypography from "components/SoftTypography";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import getPencasEmpresaAPI from "../../api/getPencasEmpresa";
import getPencasPCAPI from "../../api/getPencasPC";
import getFuncionariosAPI from "../../api/getFuncionarios";
import getAdministradoresAPI from "../../api/getAdministradores";
import getCampeonatosAPI from "../../api/getCampeonatos";
import Moment from 'moment';

function Dashboard() { 

  const [cantUsuariosRegistrados, setCantUsuariosRegistrados] = useState(0);
  const [sumaPozos, setSumaPozos] = useState(0);
  const [cantPencasActivas, setCantPencasActivas] = useState(0);
  const [cantEmpresasRegistradas, setCantEmpresasRegistradas] = useState(0);
  const [cantPencasEmpresa, setCantPencasEmpresa] = useState(0);
  const [cantPencasPC, setCantPencasPC] = useState(0);
  const [cantFuncionarios, setCantFuncionarios] = useState(0);
  const [cantAdministradores, setCantAdministradores] = useState(0);
  const [campeonatosEmpezados, setCampeonatosEmpezados] = useState([]);
  const [campeonatosTerminados, setCampeonatosTerminados] = useState([]);
  const [meses, setMeses] = useState([]);
  

  const fetchMetricas = async () => {
    getMetricasAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          setCantUsuariosRegistrados(r.cantUsuariosRegistrados);
          setCantEmpresasRegistradas(r.cantEmpresasRegistradas);
          setCantPencasActivas(r.cantPencasActivas);
          setSumaPozos(r.ganancias);
          localStorage.setItem("ganancias", r.ganancias);
        });
      } else {
        return Promise.reject(response);
      }
    })
      .catch((e) => {
        console.log('error', e);
      });
  };

  const fetchPencasEmpresa = async () => {
    getPencasEmpresaAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          setCantPencasEmpresa(r.length);
        });
      } else {
        return Promise.reject(response);
      }
    })
      .catch((e) => {
        console.log('error', e);
      });
  };

  const fetchPencasPC = async () => {
    getPencasPCAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          setCantPencasPC(r.length);
        });

      } else {
        return Promise.reject(response);
      }
    })
      .catch((e) => {
        console.log('error', e);
      });
  };

  const fetchFuncionarios = async () => {
    getFuncionariosAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          setCantFuncionarios(r.length)
        });

      } else {
        return Promise.reject(response);
      }
    })
      .catch((e) => {
        console.log('error', e);
      });
  };

  const fetchAdministradores = async () => {
    getAdministradoresAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          setCantAdministradores(r.length)
        });

      } else {
        return Promise.reject(response);
      }
    })
      .catch((e) => {
        console.log('error', e);
      });
  };

  const fetchCampeonatos = async () => {
    const months = ["Enero", "Febrero","Marzo","Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
    setMeses(months);
    getCampeonatosAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          var empezadas = [0,0,0,0,0,0,0,0,0,0,0,0];
          var terminadas = [0,0,0,0,0,0,0,0,0,0,0,0];
          r.map((row) => {
            var añoInicio = new Date(row.startDate).getFullYear();
            var añoFin = new Date(row.finishDate).getFullYear();
            var fechaInicio = new Date(row.startDate).getMonth();
            var fechaFin = new Date(row.finishDate).getMonth();
            if(añoInicio == new Date().getFullYear()) empezadas[fechaInicio] = empezadas[fechaInicio] + 1;
            if(añoFin == new Date().getFullYear()) terminadas[fechaFin] = terminadas[fechaFin] + 1;
          });
          setCampeonatosEmpezados(empezadas);
          setCampeonatosTerminados(terminadas);
        });

      } else {
        return Promise.reject(response);
      }
    })
      .catch((e) => {
        console.log('error', e);
      });
  }
;

  useEffect(() => {
    fetchMetricas();
    fetchPencasPC();
    fetchPencasEmpresa();
    fetchFuncionarios();
    fetchAdministradores();
    fetchCampeonatos();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Ganancias del mes" }}
                count={sumaPozos}
                percentage={{ color: "success", text: "$" }}
                icon={{ color: "success", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Usuarios registrados" }}
                count={cantUsuariosRegistrados}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Empresas registradas" }}
                count={cantEmpresasRegistradas}
                icon={{ color: "warning", component: "shopping_cart" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Pencas activas" }}
                count={cantPencasActivas}
                icon={{ color: "error", component: "emoji_events"}}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="Usuarios registrados por tipo"
                description={
                  <>
                    Estadísticas globales
                  </>
                }
                chart={{
                  labels: ["Administradores", "Funcionarios", "Usuarios"],
                  datasets: { label: "Total", data: [cantAdministradores, cantFuncionarios, cantUsuariosRegistrados] },
                }}
                items={[
                  {
                    icon: { color: "primary", component: "library_books" },
                    label: "Pencas Empresa",
                    progress: { content: cantPencasEmpresa, percentage: (cantPencasEmpresa*100/(cantPencasEmpresa+cantPencasPC)) },
                  },
                  {
                    icon: { color: "info", component: "touch_app" },
                    label: "Pencas PC",
                    progress: { content: cantPencasPC, percentage: (cantPencasPC*100/(cantPencasEmpresa+cantPencasPC)) },
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Campeonatos iniciados y finalizados"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftTypography variant="button" color="text" fontWeight="regular">
                      Estadísticas del año <strong>{new Date().getFullYear()}</strong> por mes
                    </SoftTypography>
                  </SoftBox> 
                }
                height="20.25rem"
                chart={{
                  labels: meses,
                  datasets: [
                    {
                      label: "Iniciados",
                      color: "info",
                      data: campeonatosEmpezados,
                    },
                    {
                      label: "Finalizados",
                      color: "dark",
                      data: campeonatosTerminados,
                    },
                  ],
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        {/*<Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
              </Grid>*/}
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
