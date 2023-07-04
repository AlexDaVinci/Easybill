/* eslint-disable react/prop-types */

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useState, useEffect, useContext } from "react";
import Icon from "@mui/material/Icon";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";
import logo from "assets/images/logowh.png";
import { Modal as MuiModal, Box, Typography, Button } from "@mui/material";
import { AuthContext } from "../../AuthContext";

function Pedidos() {
  const auth = useContext(AuthContext);
  const token = auth.authToken;
  const [data, setData] = useState({ columns: [], rows: [] });
  const [selected, setSelected] = useState(""); // Nuevo estado para guardar el botón seleccionado

  const fetchPedidos = (url) => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const columns = [
          { Header: "Nombre de empleado", accessor: "nombre_usuario", align: "left" },
          { Header: "Nombre de cliente", accessor: "nombre_cliente", align: "left" },
          {
            Header: "Identificacion",
            accessor: "identificacion_cliente",
            align: "left",
          },
          { Header: "Metodo de pago", accessor: "metodo_pago", align: "left" },
          { Header: "Total", accessor: "total_venta", align: "left" },
          { Header: "Fecha", accessor: "fecha_venta", align: "left" },
          // Aquí puedes agregar más columnas según sea necesario...
        ];
        const rows = data.detalle_ventas.map((pedido) => ({
          nombre_usuario: pedido.nombre_usuario,
          nombre_cliente: pedido.nombre_cliente,
          identificacion_cliente: pedido.identificacion_cliente,
          metodo_pago: pedido.metodo_pago,
          total_venta: pedido.total_venta,
          fecha_venta: pedido.fecha_venta,
          // Agrega aquí más campos si es necesario...
        }));
        setData({ columns, rows });
      })
      .catch((error) => console.error(error));
  };

  const fetchPedidosDia = () => {
    setSelected("Dia");
    fetchPedidos("https://165.22.189.59/api/PedidosDia");
  };

  const fetchPedidosSemana = () => {
    setSelected("Semana");
    fetchPedidos("https://165.22.189.59/api/PedidosSemana");
  };

  const fetchPedidosMes = () => {
    setSelected("Mes");
    fetchPedidos("https://165.22.189.59/api/PedidosMes");
  };

  const { columns, rows } = data;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Historial de pedidos
                </MDTypography>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h6" color="white">
                    Seleccione un boton: .
                  </MDTypography>
                  <MDButton
                    variant={selected === "Dia" ? "contained" : "gradient"}
                    color={selected === "Dia" ? "success" : "dark"}
                    onClick={fetchPedidosDia}
                  >
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    Dia
                  </MDButton>
                  <MDButton
                    variant={selected === "Semana" ? "contained" : "gradient"}
                    color={selected === "Semana" ? "success" : "dark"}
                    onClick={fetchPedidosSemana}
                  >
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    Semana
                  </MDButton>
                  <MDButton
                    variant={selected === "Mes" ? "contained" : "gradient"}
                    color={selected === "Mes" ? "success" : "dark"}
                    onClick={fetchPedidosMes}
                  >
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    Mes
                  </MDButton>
                </MDBox>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Pedidos;
