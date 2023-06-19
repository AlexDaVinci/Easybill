// @mui material components
import Grid from "@mui/material/Grid";

import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import Invoices from "layouts/rventas/components/Invoices";
import React, { useState, useEffect } from "react";

function Rventas() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    fetch("http://165.22.189.59:8001/api/productos")
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const agregarAlCarrito = (producto) => {
    // Agrega una propiedad "cartId" con un ID único a cada producto
    setCarrito([...carrito, { ...producto, cartId: Math.random() }]);
    console.log(carrito);
    console.log("Producto agregado al carrito");
  };

  const eliminarDelCarrito = (cartId) => {
    setCarrito(carrito.filter((producto) => producto.cartId !== cartId));
  };

  const auth = useContext(AuthContext);
  console.log(auth.authToken);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                {productos.map((producto) => (
                  <Grid item xs={12} md={6} xl={3} key={producto.id}>
                    <DefaultInfoCard
                      image={`http://165.22.189.59:8001/${producto.ruta_imagen_producto}`}
                      title={producto.nombre_producto}
                      value={`$${producto.precio}`}
                      onClick={() => agregarAlCarrito(producto)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <MDBox>
                <Invoices carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Rventas;
