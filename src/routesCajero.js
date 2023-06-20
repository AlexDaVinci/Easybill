// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ResetPassword from "layouts/authentication/reset-password";

import Actividad from "layouts/actividad";
import Usuarios from "layouts/usuarios";
import Menu from "layouts/menu";
import Pedidos from "layouts/pedidos";
import Ventas from "layouts/ventas";
import Rventas from "layouts/rventas";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Usuarios",
    key: "usuarios",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/usuarios",
    component: <Usuarios />,
  },
  {
    type: "collapse",
    name: "Menu",
    key: "menu",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/menu",
    component: <Menu />,
  },
  {
    type: "collapse",
    name: "Realizar venta",
    key: "Rventas",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/RealizarVentas",
    component: <Rventas />,
  },
  {
    type: "collapse",
    name: "Actividad",
    key: "actividad",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/actividad",
    component: <Actividad />,
  },
  {
    type: "collapse",
    name: "Pedidos",
    key: "pedidos",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/pedidos",
    component: <Pedidos />,
  },
  {
    type: "collapse",
    name: "Ventas",
    key: "ventas",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/ventas",
    component: <Ventas />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    route: "/authentication/reset-password",
    component: <ResetPassword />,
  },
];

export { routes as default };
