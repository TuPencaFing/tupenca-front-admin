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

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Tablas from "layouts/tablas";
import TablaDeporte from "layouts/tablaDeporte";
import TablaCampeonatos from "layouts/tablaCampeonato";
import TablaEventos from "layouts/tablaEvento";
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
    name: "Pencas",
    key: "penca",
    route: "/penca",
    icon: <Cube size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
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
  ]
}
];

export default routes;
