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

function Menu() {
  const auth = useContext(AuthContext);
  const token = auth.authToken;
  const [data, setData] = useState({ columns: [], rows: [] });
  const [open, setOpen] = React.useState(false);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [image, setImage] = useState(null);

  //editar usuario
  const [editingPlato, setEditingPlato] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditingPlato(null);
    setNombre("");
    setPrecio("");
    setImage(null);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchUsers = () => {
    fetch("http://165.22.189.59:8001/api/productos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const rows = data.map((plato) => ({
          id: plato.id,
          nombre_producto: plato.nombre_producto,
          precio: plato.precio,
          ruta_imagen_producto: plato.ruta_imagen_producto,
          created_at: plato.created_at,
          update_at: plato.update_at,
        }));

        setData((prevData) => ({
          ...prevData,
          rows: rows,
        }));
      })
      .catch((error) => console.error(error));
  };

  const handleAddPlato = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nombre_producto", nombre);
    formData.append("precio", precio);

    if (image) {
      formData.append("file", image, image.name);
    }

    axios
      .post("http://165.22.189.59:8001/api/productos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        fetchUsers(); // Obtener la lista actualizada de usuarios
        handleClose(); // Cerrar el modal después de añadir el usuario
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdatePlato = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nombre_producto", nombre);
    formData.append("precio", precio);

    if (image) {
      formData.append("file", image, image.name);
    }

    axios
      .post(`http://165.22.189.59:8001/api/editproducto/${editingPlato.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        fetchUsers(); // Obtener la lista actualizada de usuarios
        handleCloseEdit(); // Cerrar el modal después de actualizar el usuario
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch("http://165.22.189.59:8001/api/productos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const columns = [
          {
            Header: "Imagen",
            accessor: "image",
            align: "left",
            /* eslint-disable react/prop-types */
            Cell: ({ row }) => {
              const url = `http://165.22.189.59:8001/${row.original.ruta_imagen_producto}`;
              console.log(url); // <-- Aquí estamos logueando la URL
              return (
                <img
                  src={url}
                  alt="plato"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              );
            },
          },
          { Header: "Nombre", accessor: "nombre_producto", align: "left" },
          { Header: "Precio", accessor: "precio", align: "left" },
          { Header: "Fecha de Creación", accessor: "created_at", align: "left" },
          {
            Header: "Acciones",
            accessor: "actions",
            Cell: (
              { row } // eslint-disable-line react/prop-types
            ) => (
              <>
                <div>
                  <Icon onClick={() => handleEdit(row)}>edit</Icon>
                </div>
                <div>
                  <Icon onClick={() => handleDelete(row)}>delete</Icon>
                </div>
              </>
            ),
          },
          // Aquí puedes agregar más columnas según sea necesario...
        ];
        const rows = data.map((plato) => ({
          id: plato.id,
          nombre_producto: plato.nombre_producto,
          precio: plato.precio,
          ruta_imagen_producto: plato.ruta_imagen_producto,
          created_at: plato.created_at,
          update_at: plato.update_at,
          // Agrega aquí más campos si es necesario...
        }));

        const handleEdit = (row) => {
          console.log("Editar Plato: ", row.id);
          setEditingPlato(row.original);

          // Actualiza los useState con los datos del usuario seleccionado para la edición.
          setNombre(row.original.nombre_producto);
          setPrecio(row.original.precio); // Considera no manejar contraseñas de esta manera por razones de seguridad.
          if (row.original.file) {
            setImage(row.original.file); // Asegúrate de que la imagen sea manejada correctamente.
          }

          handleOpenEdit();
        };

        const handleDelete = (row) => {
          axios
            .delete(`http://165.22.189.59:8001/api/productos/${row.original.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log("Plato borrado:", row.original.id);
              fetchUsers(); // Obtener la lista actualizada de usuarioss
            })
            .catch((error) => {
              console.error("Error al borrar plato:", error);
            });
        };

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
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Tabla de Menu
                </MDTypography>
                <MDButton variant="gradient" color="dark" onClick={handleOpen}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  Añadir nuevo plato
                </MDButton>
                <MuiModal
                  open={open}
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
                          Ingresa tu Plato
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
                                value={nombre}
                                onChange={(event) => setNombre(event.target.value)}
                              />
                            </MDBox>
                            <MDBox mb={2}>
                              <MDInput
                                type="number"
                                label="Precio"
                                variant="standard"
                                fullWidth
                                value={precio}
                                onChange={(event) => setPrecio(event.target.value)}
                              />
                            </MDBox>
                            <MDBox mb={2}>
                              <MDInput
                                type="file"
                                label="Imagen"
                                variant="standard"
                                fullWidth
                                onChange={(event) => setImage(event.target.files[0])}
                              />
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
                                onClick={handleAddPlato}
                              >
                                Añadir Plato
                              </MDButton>
                            </MDBox>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </Typography>
                  </Box>
                </MuiModal>
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

      <MuiModal
        open={openEdit}
        onClose={handleCloseEdit}
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
                Ingresa tu plato
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
                      value={nombre}
                      onChange={(event) => setNombre(event.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="number"
                      label="Precio"
                      variant="standard"
                      fullWidth
                      value={precio}
                      onChange={(event) => setPrecio(event.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="file"
                      label="Imagen"
                      variant="standard"
                      fullWidth
                      onChange={(event) => setImage(event.target.files[0])}
                    />
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
                      onClick={handleCloseEdit}
                    >
                      Cerrar
                    </MDButton>
                    <MDButton
                      type="submit"
                      variant="gradient"
                      color="info"
                      sx={{ flexGrow: 1, ml: 1 }} // Aplica un marginLeft para un espacio entre botones
                      onClick={handleUpdatePlato}
                    >
                      Editar Plato
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

export default Menu;
