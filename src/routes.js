/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
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

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Caja from "layouts/authentication/caja";
import ResetPassword from "layouts/authentication/reset-password";

import Actividad from "layouts/actividad";
import Usuarios from "layouts/usuarios";
import Menu from "layouts/menu";
import Pedidos from "layouts/pedidos";
import Ventas from "layouts/ventas";
import Rventas from "layouts/rventas";
import Reportes from "layouts/reportes";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    route: "/dashboard",
    component: <Dashboard />,
    roles: ["administrador, cajero"],
  },
  {
    type: "collapse",
    name: "Usuarios",
    key: "usuarios",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/usuarios",
    component: <Usuarios />,
    roles: ["administrador"],
  },
  {
    type: "collapse",
    name: "Menu",
    key: "menu",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/menu",
    component: <Menu />,
    roles: ["administrador"],
  },
  {
    type: "collapse",
    name: "Realizar venta",
    key: "Rventas",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/RealizarVentas",
    component: <Rventas />,
    roles: ["cajero"],
  },
  {
    type: "collapse",
    name: "Actividad",
    key: "actividad",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/actividad",
    component: <Actividad />,
    roles: ["administrador"],
  },
  {
    type: "collapse",
    name: "Pedidos",
    key: "pedidos",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/pedidos",
    component: <Pedidos />,
    roles: ["administrador"],
  },
  {
    type: "collapse",
    name: "Ventas",
    key: "ventas",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/ventas",
    component: <Ventas />,
    roles: ["administrador"],
  },
  {
    type: "collapse",
    name: "Reportes",
    key: "Reportes",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/reportes",
    component: <Reportes />,
    roles: ["administrador"],
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  //   roles: ["administrador"],
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  //   roles: ["administrador"],
  // },
  // {
  //   route: "/rtl",
  //   component: <RTL />,
  //   roles: ["administrador"],
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  //   roles: ["administrador"],
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  //   roles: ["administrador"],
  // },
  {
    route: "/authentication/sign-up",
    component: <SignUp />,
    roles: ["administrador, cajero"],
  },
  {
    route: "/authentication/reset-password",
    component: <ResetPassword />,
    roles: ["administrador, cajero"],
  },
  {
    type: "collapse",
    name: "Finalizar Jornada",
    key: "FinalizarJornada",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/authentication/caja",
    component: <Caja />,
    roles: ["cajero"],
  },
];

export default routes;
