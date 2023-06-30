import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ComplexStatisticsCardUser from "examples/Cards/StatisticsCardsUser/ComplexStatisticsCard";
import ComplexStatisticsCardDay from "examples/Cards/StatisticsCardsDay/ComplexStatisticsCard";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";

function Reportes() {
  const auth = useContext(AuthContext);
  const token = auth.authToken;
  const [productosDia, setProductosDia] = useState([]);
  const [productosSemana, setProductosSemana] = useState([]);
  const [productosMes, setProductosMes] = useState([]);
  const [usuarioVendedor, setUsuarioVendedor] = useState([]);
  const [mejorDia, setMejorDia] = useState([]);
  const [mejorSemana, setMejorSemana] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://apieasybill.online/api/ProductoDia", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProductosDia(response.data);
      })
      .catch((error) => console.error(error));

    axios
      .get("https://apieasybill.online/api/ProductoSemana", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProductosSemana(response.data);
      })
      .catch((error) => console.error(error));

    axios
      .get("https://apieasybill.online/api/ProductoMes", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProductosMes(response.data);
      })
      .catch((error) => console.error(error));

    axios
      .get("https://apieasybill.online/api/UsuarioVendedor", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsuarioVendedor(response.data);
      })
      .catch((error) => console.error(error));

    axios
      .get("https://apieasybill.online/api/MejorDia", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMejorDia(response.data);
      })
      .catch((error) => console.error(error));

    axios
      .get("https://apieasybill.online/api/MejorSemana", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMejorSemana(response.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="white"
                title={productosDia.producto}
                count={productosDia.cantidad}
                image={`https://apieasybill.online/${productosDia.ruta_imagen_producto}`}
                percentage={{ color: "success", amount: "", label: "PRODUCTO DEL DIA" }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="white"
                title={productosSemana.producto}
                count={productosSemana.cantidad}
                image={`https://apieasybill.online/${productosSemana.ruta_imagen_producto}`}
                percentage={{ color: "success", amount: "", label: "PRODUCTO DE LA SEMANA" }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="white"
                title={productosMes.producto}
                count={productosMes.cantidad}
                image={`https://apieasybill.online/${productosMes.ruta_imagen_producto}`}
                percentage={{ color: "success", amount: "", label: "PRODUCTO DEL MES" }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCardUser
                color="white"
                title={usuarioVendedor.usuario}
                count={usuarioVendedor.total_venta}
                venta={usuarioVendedor.ventas}
                image={`https://apieasybill.online/${usuarioVendedor.ruta_imagen_usuario}`}
                percentage={{ color: "success", amount: "", label: "VENDEDOR DEL MES" }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCardDay
                title={mejorDia.dia}
                count={mejorDia.total_venta}
                venta={mejorDia.ventas}
                icon="leaderboard"
                percentage={{ color: "success", amount: "", label: "MEJOR DIA" }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCardDay
                title={`${mejorSemana.inicio_semana} ---> ${mejorSemana.fin_semana}`}
                count={mejorSemana.total_venta}
                venta={mejorSemana.ventas}
                icon="leaderboard"
                percentage={{ color: "success", amount: "", label: "MEJOR SEMANA" }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Reportes;
