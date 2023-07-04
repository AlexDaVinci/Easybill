/* eslint-disable react/prop-types */

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { AuthContext } from "../../AuthContext";

function Actividad() {
  const auth = useContext(AuthContext);
  const token = auth.authToken;
  const [data, setData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    fetch("http://192.168.137.136/api/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const columns = [
          { Header: "Nombre de usuario", accessor: "nombre_usuario", align: "left" },
          { Header: "Modulo", accessor: "modulo", align: "left" },
          { Header: "Evento", accessor: "event", align: "left" },
          { Header: "Nombre de objeto", accessor: "nombre_objeto", align: "left" },
          { Header: "Fecha de Creación", accessor: "created_at", align: "left" },
          // Aquí puedes agregar más columnas según sea necesario...
        ];
        const rows = data.map((user) => ({
          nombre_usuario: user.nombre_usuario,
          modulo: user.modulo,
          event: user.event,
          nombre_objeto: user.nombre_objeto,
          created_at: user.created_at,
          // Agrega aquí más campos si es necesario...
        }));
        setData({ columns, rows });
      })
      .catch((error) => console.error(error));
  }, []);

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
              >
                <MDTypography variant="h6" color="white">
                  Registro de actividad
                </MDTypography>
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

export default Actividad;
