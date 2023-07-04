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

function Ventas() {
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
          { Header: "Nombre de Producto", accessor: "producto", align: "left" },
          { Header: "Cantidad", accessor: "cantidad", align: "left" },
          { Header: "Total", accessor: "total", align: "left" },
        ];
        const rows = Object.values(data).map((venta) => ({
          producto: venta.producto,
          cantidad: venta.cantidad,
          total: venta.total,
        }));
        setData({ columns, rows });
      })
      .catch((error) => console.error(error));
  };

  const fetchPedidosDia = () => {
    setSelected("Dia");
    fetchPedidos("https://165.22.189.59/api/VentasDia");
  };

  const fetchPedidosSemana = () => {
    setSelected("Semana");
    fetchPedidos("https://165.22.189.59/api/VentasSemana");
  };

  const fetchPedidosMes = () => {
    setSelected("Mes");
    fetchPedidos("https://165.22.189.59/api/VentasMes");
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
                  Registro de ventas
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

export default Ventas;
