/* eslint-disable react/prop-types */

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";
import logo from "assets/images/logowh.png";
import { Modal as MuiModal, Box, Typography, Button } from "@mui/material"; // @mui material components
import { AuthContext } from "../../AuthContext";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import Invoices from "layouts/rventas/components/Invoices";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import swal from "sweetalert";

function Rventas() {
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  const validateForm = () => {
    if (nombre !== "" && cedula !== "" && metodoPago !== "") {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target || event.currentTarget;

    // Actualiza los estados correspondientes según el campo modificado
    if (name === "nombre") {
      setNombre(value);
    } else if (name === "cedula") {
      setCedula(value);
    } else if (name === "metodoPago") {
      setMetodoPago(value);
    }

    validateForm(); // Valida el formulario completo después de cada cambio
  };

  useEffect(() => {
    setModalOpen(true);
    fetch("http://192.168.137.136/api/productos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((p) => p.id === producto.id);

    if (productoExistente) {
      setCarrito(
        carrito.map((p) =>
          p.id === producto.id
            ? {
                ...p,
                cantidad: p.cantidad + 1,
                total: (p.cantidad + 1) * p.precio, // Calcula el nuevo total
              }
            : p
        )
      );
    } else {
      setCarrito((prevCarrito) => [
        ...prevCarrito,
        {
          ...producto,
          cantidad: 1,
          total: producto.precio, // Establece el total inicial cuando la cantidad es 1
        },
      ]);
    }
  };

  useEffect(() => {
    console.log(carrito);
  }, [carrito]);

  const eliminarDelCarrito = (productoAEliminar) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(
        (producto) => producto.id === productoAEliminar.id
      );

      if (productoExistente && productoExistente.cantidad > 1) {
        return prevCarrito.map((producto) =>
          producto.id === productoAEliminar.id
            ? {
                ...producto,
                cantidad: producto.cantidad - 1,
                total: producto.precio * (producto.cantidad - 1),
              }
            : producto
        );
      } else {
        return prevCarrito.filter((producto) => producto.id !== productoAEliminar.id);
      }
    });
  };

  const auth = useContext(AuthContext);
  const token = auth.authToken;
  console.log(auth.authToken);
  console.log(userData);

  // Agrega los estados para el modal y para los campos de entrada
  const [modalOpen, setModalOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [metodoPago, setMetodoPago] = useState("");

  const handleClose = () => {
    setModalOpen(false);
    navigate("/dashboard");
  };

  const handleContinue = () => {
    setModalOpen(false);
  };

  const hacerVenta = () => {
    const venta = {
      id_user: userData.userData.id,
      metodo_pago: metodoPago,
      identificacion_cliente: cedula,
      nombre_cliente: nombre,
      productos: carrito, // Asigna los productos al objeto venta
    };
    console.log(venta.id_user);
    console.log(venta.metodo_pago);
    console.log(venta.identificacion_cliente);
    console.log(venta.nombre_cliente);
    console.log(token);
    axios
      .post("http://192.168.137.136/api/venta", venta, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const idVenta = response.data.venta.id;
        console.log("ID de la venta:", idVenta);

        // Recorre el array carrito y envía los datos a la ruta "http://192.168.137.136/api/asigna"
        carrito.forEach((producto) => {
          const asignacion = {
            id_producto: producto.id,
            id_venta: idVenta,
            cantidad: producto.cantidad,
            total_por_producto: producto.precio * producto.cantidad,
          };
          console.log(asignacion.id_producto);
          console.log(asignacion.id_venta);
          console.log(asignacion.cantidad);
          console.log(asignacion.total_por_producto);
          console.log(token);
          axios
            .post("http://192.168.137.136/api/asigna", asignacion, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log("Asignación exitosa:", response.data);
              // Aquí puedes manejar lo que sucede después de cada asignación
              swal(
                "Buen trabajo!",
                "La venta se realizo correctamente, tu factura ya esta descargada!",
                "success"
              ).then((value) => {
                navigate("/dashboard");
              });
            })
            .catch((error) => {
              console.error("Hubo un error al hacer la asignación:", error);
            });
        });
        // Llamada a la función generarFactura con los datos necesarios
        generarFactura({
          nombreVendedor: userData.userData.name,
          nombreCliente: nombre,
          cedulaCliente: cedula,
          metodoPago: metodoPago,
          productos: carrito,
        });
      })
      .catch((error) => {
        console.error("Hubo un error al hacer la venta:", error);
      });
  };

  const generarFactura = async (venta) => {
    const { nombreVendedor, nombreCliente, cedulaCliente, metodoPago, productos } = venta;
    const MAX_TITLE_LENGTH = 25;
    if (!venta.productos) {
      console.error("No se encontraron productos en la venta");
      return;
    }
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage();

    const fontSize = 12;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = page.getHeight() - 50;

    // Encabezado de la factura
    page.drawText(`Factura de Venta`, {
      x: 50,
      y,
      size: 18,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 30;
    page.drawText(`Fecha: ${new Date().toLocaleDateString()}`, {
      x: 50,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 20;
    page.drawText(`Vendedor: ${nombreVendedor}`, {
      x: 50,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 20;
    page.drawText(`Cliente: ${nombreCliente}`, {
      x: 50,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 20;
    page.drawText(`Cédula: ${cedulaCliente}`, {
      x: 50,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 20;
    page.drawText(`Método de Pago: ${metodoPago}`, {
      x: 50,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 30;

    // Tabla de productos
    const tableWidth = 500;
    const cellPadding = 10;
    const tableStartY = y;

    // Draw table headers
    const headers = ["Producto", "Cantidad", "Precio Unitario", "Total"];
    let currentY = tableStartY;
    let currentX = 50;

    headers.forEach((header, index) => {
      page.drawText(header, {
        x: currentX,
        y: currentY,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
      currentX += tableWidth / headers.length;
    });

    // Draw table rows
    currentY -= 20;
    productos.forEach((producto) => {
      currentX = 50;
      page.drawText(producto.nombre_producto, {
        x: currentX,
        y: currentY,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });

      currentX += tableWidth / headers.length;
      page.drawText(producto.cantidad.toString(), {
        x: currentX,
        y: currentY,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });

      currentX += tableWidth / headers.length;
      page.drawText(`$${parseFloat(producto.precio).toFixed(2)}`, {
        x: currentX,
        y: currentY,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });

      currentX += tableWidth / headers.length;
      page.drawText(`$${parseFloat(producto.total).toFixed(2)}`, {
        x: currentX,
        y: currentY,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });

      currentY -= 20;
    });

    // Calculate and draw table borders
    const tableEndY = tableStartY - productos.length * 20;
    const tableBottomY = tableEndY - 20;
    page.drawLine({
      start: { x: 50, y: tableStartY },
      end: { x: 50 + tableWidth, y: tableStartY },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    page.drawLine({
      start: { x: 50, y: tableStartY },
      end: { x: 50, y: tableBottomY },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    page.drawLine({
      start: { x: 50 + tableWidth, y: tableStartY },
      end: { x: 50 + tableWidth, y: tableBottomY },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    page.drawLine({
      start: { x: 50, y: tableBottomY },
      end: { x: 50 + tableWidth, y: tableBottomY },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    // Total
    const total = productos.reduce((sum, producto) => sum + parseFloat(producto.total), 0);
    page.drawText(`Total: $${total.toFixed(2)}`, {
      x: 400,
      y: tableBottomY - 30,
      size: 16,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "factura.pdf";
    link.click();
  };

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
                      image={`http://192.168.137.136/${producto.ruta_imagen_producto}`}
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
                <Invoices
                  carrito={carrito}
                  eliminarDelCarrito={eliminarDelCarrito}
                  hacerVenta={hacerVenta}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

      {/*MODAAAAAL*/}

      <MuiModal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #fffff",
            borderRadius: 10,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                <img src={logo} alt="Logo" style={{ width: "100px", height: "80px" }} />
              </MDTypography>
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                EasyBill
              </MDTypography>
              <MDTypography display="block" variant="button" color="white" my={1}>
                Ingresa datos del Cliente
              </MDTypography>
            </MDBox>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Card>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Nombre"
                      variant="standard"
                      fullWidth
                      name="nombre"
                      value={nombre}
                      onChange={handleInputChange}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="number"
                      label="Identificacion"
                      variant="standard"
                      fullWidth
                      name="cedula"
                      value={cedula}
                      onChange={handleInputChange}
                      inputProps={{
                        min: "0", // Valor mínimo permitido
                        pattern: "[0-9]*",
                        inputMode: "numeric",
                      }}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="metodo-pago-label">Metodo de Pago</InputLabel>
                      <Select
                        labelId="metodo-pago"
                        id="metodo-pago"
                        name="metodoPago"
                        value={metodoPago}
                        onChange={handleInputChange}
                      >
                        <MenuItem value={"tarjeta"}>Tarjeta</MenuItem>
                        <MenuItem value={"efectivo"}>Efectivo</MenuItem>
                      </Select>
                    </FormControl>
                  </MDBox>
                  <MDBox
                    mt={4}
                    mb={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <MDButton
                      type="submit"
                      variant="gradient"
                      color="info"
                      sx={{ flexGrow: 1, mr: 1 }} // Aplica un marginRight para un espacio entre botones
                      onClick={handleClose}
                    >
                      Cerrar
                    </MDButton>
                    <MDButton
                      type="submit"
                      variant="gradient"
                      color="info"
                      sx={{ flexGrow: 1, ml: 1 }} // Aplica un marginLeft para un espacio entre botones
                      onClick={handleContinue}
                      disabled={!formValid}
                    >
                      Comenzar
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Typography>
        </Box>
      </MuiModal>
    </DashboardLayout>
  );
}

export default Rventas;
