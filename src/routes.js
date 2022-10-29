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

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Tablas from "layouts/tablas";
import TablaDeporte from "layouts/tablaDeporte";
import TablaCampeonatos from "layouts/tablaCampeonato";
import TablaEventos from "layouts/tablaEvento";
import TablaPlanes from "layouts/tablaPlanes";
import TablaResultados from "layouts/tablaResultados";
import TablaPencasPozoCompartido from "layouts/tablaPencasPozoCompartido";
import TablaPremios from "layouts/tablaPremios";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import CreateTeam from "layouts/createTeam"
import EditTeam from "layouts/editTeam"
import CreateDeporte from "layouts/createDeporte"
import EditDeporte from "layouts/editDeporte"
import CreateCampeonato from "layouts/createCampeonato"
import EditCampeonato from "layouts/editCampeonato"
import CreateEvento from "layouts/createEvento"
import EditEvento from "layouts/editEvento"
import CreatePlan from "layouts/createPlan"
import EditPlan from "layouts/editPlan"
import CreateResultado from "layouts/createResultado"
import EditResultado from "layouts/editResultado"
import CreatePencaPozoCompartido from "layouts/createPencaPozoCompartido"
import EditPencaPozoCompartido from "layouts/editPencaPozoCompartido"
import CreatePremio from "layouts/createPremio"
import EditPremio from "layouts/editPremio"

const routes = [
  {
    type: "collapse",
    name: "General",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Suscripciones activas",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Contabilidad",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  { type: "title", title: "Entrada de datos", key: "data-entry" },
  {
    type: "collapse",
    name: "Equipos",
    key: "tablasEquipos",
    icon: <Cube size="12px" />,
    route: "/equipos",

    component:
      <DashboardLayout>
        <Tablas  />
      </DashboardLayout>,
  },
  {
    type: "collapse",
    name: "Deportes",
    key: "tablasDeportes",
    icon: <Cube size="12px" />,
    route: "/deportes",

    component:
      <DashboardLayout>
        <TablaDeporte  />
      </DashboardLayout>,
  },
  {
    type: "collapse",
    name: "Campeonatos",
    key: "tablasCampeonatos",
    icon: <Cube size="12px" />,
    route: "/campeonatos",

    component:
      <DashboardLayout>
        <TablaCampeonatos  />
      </DashboardLayout>,
  },
  {
    type: "collapse",
    name: "Eventos",
    key: "tablasEventos",
    icon: <Cube size="12px" />,
    route: "/eventos",

    component:
      <DashboardLayout>
        <TablaEventos  />
      </DashboardLayout>,
  },
  {
    type: "collapse",
    name: "Planes",
    key: "tablasPlanes",
    icon: <Cube size="12px" />,
    route: "/planes",

    component:
      <DashboardLayout>
        <TablaPlanes  />
      </DashboardLayout>,
  },
  {
    type: "collapse",
    name: "Resultados",
    key: "tablasResultados",
    icon: <Cube size="12px" />,
    route: "/resultados",

    component:
      <DashboardLayout>
        <TablaResultados  />
      </DashboardLayout>,
  },
  {
    type: "collapse",
    name: "Pencas pozo compartido",
    key: "tablasPencaPozoCompartido",
    icon: <Cube size="12px" />,
    route: "/pencaPozoCompartido",

    component:
      <DashboardLayout>
        <TablaPencasPozoCompartido  />
      </DashboardLayout>,
  },
  {
    type: "collapse",
    name: "Premios",
    key: "tablasPremios",
    icon: <Cube size="12px" />,
    route: "/premios",

    component:
      <DashboardLayout>
        <TablaPremios  />
      </DashboardLayout>,
  },
  { type: "title", title: "Manejo de cuenta", key: "account-pages" },
  {
    type: "collapse",
    name: "Perfil",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  { collapse: [
    {
      type: "collapse",
      name: "Sign In",
      key: "sign-in",
      route: "/authentication/sign-in",
      icon: <Document size="12px" />,
      component: <SignIn />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Sign Up",
      key: "sign-up",
      route: "/authentication/sign-up",
      icon: <SpaceShip size="12px" />,
      component: <SignUp />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Create team",
      key: "createTeam",
      route: "/createTeam",
      icon: <SpaceShip size="12px" />,
      component: <CreateTeam />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Edit team",
      key: "editTeam",
      route: "/editTeam/:itemId",
      icon: <SpaceShip size="12px" />,
      component: <EditTeam />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Create deporte",
      key: "createDeporte",
      route: "/createDeporte",
      icon: <SpaceShip size="12px" />,
      component: <CreateDeporte />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Edit deporte",
      key: "editDeporte",
      route: "/editDeporte/:itemId",
      icon: <SpaceShip size="12px" />,
      component: <EditDeporte />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Create campeonato",
      key: "createCampeonato",
      route: "/createCampeonato",
      icon: <SpaceShip size="12px" />,
      component: <CreateCampeonato />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Edit campeonato",
      key: "editCampeonato",
      route: "/editCampeonato/:itemId",
      icon: <SpaceShip size="12px" />,
      component: <EditCampeonato />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Create evento",
      key: "createEvento",
      route: "/createEvento",
      icon: <SpaceShip size="12px" />,
      component: <CreateEvento />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Edit evento",
      key: "editEvento",
      route: "/editEvento/:itemId",
      icon: <SpaceShip size="12px" />,
      component: <EditEvento />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Create plan",
      key: "createPlan",
      route: "/createPlan",
      icon: <SpaceShip size="12px" />,
      component: <CreatePlan />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Edit plan",
      key: "editPlan",
      route: "/editPlan/:itemId",
      icon: <SpaceShip size="12px" />,
      component: <EditPlan />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Create resultado",
      key: "createResultado",
      route: "/createResultado/:itemId",
      icon: <SpaceShip size="12px" />,
      component: <CreateResultado />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Edit resultado",
      key: "editResultado",
      route: "/editResultado/:itemId",
      icon: <SpaceShip size="12px" />,
      component: <EditResultado />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Create penca de pozo compartido",
      key: "createPencaPozoCompartido",
      route: "/createPencaPozoCompartido",
      icon: <SpaceShip size="12px" />,
      component: <CreatePencaPozoCompartido />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Edit penca de pozo compartido",
      key: "editPencaPozoCompartido",
      route: "/editPencaPozoCompartido/:itemId",
      icon: <SpaceShip size="12px" />,
      component: <EditPencaPozoCompartido />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Create premio",
      key: "createPremio",
      route: "/createPremio",
      icon: <SpaceShip size="12px" />,
      component: <CreatePremio />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Edit premio",
      key: "editPremio",
      route: "/editPremio/:itemId",
      icon: <SpaceShip size="12px" />,
      component: <EditPremio />,
      noCollapse: true,
    },
  ]
}
];

export default routes;
