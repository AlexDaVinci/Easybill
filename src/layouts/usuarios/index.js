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
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";

function Usuarios() {
  const auth = useContext(AuthContext);
  const token = auth.authToken;
  const [data, setData] = useState({ columns: [], rows: [] });
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [email, setEmail] = useState("");

  //editar usuario
  const [editingUser, setEditingUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditingUser(null);
    setUsername("");
    setPassword("");
    setEmail("");
    setTipoUsuario("");
    setImage(null);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchUsers = () => {
    fetch("http://192.168.137.136/api/allusers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const rows = data.map((user) => ({
          id: user.id,
          name: user.name,
          tipo_usuario: user.tipo_usuario,
          ruta_imagen_usuario: user.ruta_imagen_usuario,
          email: user.email,
          email_verified_at: user.email_verified_at,
          created_at: user.created_at,
          update_at: user.update_at,
        }));

        setData((prevData) => ({
          ...prevData,
          rows: rows,
        }));
      })
      .catch((error) => console.error(error));
  };

  const handleAddUser = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", username);
    formData.append("password", password);
    formData.append("password_confirmation", password);
    formData.append("tipo_usuario", tipoUsuario);
    formData.append("email", email);

    if (image) {
      formData.append("file", image, image.name);
    }

    axios
      .post("http://192.168.137.136/api/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        fetchUsers(); // Obtener la lista actualizada de usuarios
        handleClose(); // Cerrar el modal después de añadir el usuario
        swal("Buen trabajo!", "Se ha agregado un usuario nuevo!", "success");
      })
      .catch((error) => {
        swal(
          "Oops",
          "Parece que hubo un error, todos los campos deben estar diligenciados!",
          "error"
        );
        console.error(error);
      });
  };

  const handleUpdateUser = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", username);
    formData.append("password", password);
    formData.append("password_confirmation", password);
    formData.append("tipo_usuario", tipoUsuario);
    formData.append("email", email);

    if (image) {
      formData.append("file", image, image.name);
    }

    axios
      .post(`http://192.168.137.136/api/user/${editingUser.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        fetchUsers(); // Obtener la lista actualizada de usuarios
        handleCloseEdit(); // Cerrar el modal después de actualizar el usuario
        swal("Buen trabajo!", "Se ha editado el usuario!", "success");
      })
      .catch((error) => {
        console.error(error);
        swal("Oops", "Parece que hubo un error", "error");
      });
  };

  useEffect(() => {
    fetch("http://192.168.137.136/api/allusers", {
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
              const url = `http://192.168.137.136/${row.original.ruta_imagen_usuario}`;
              console.log(url); // <-- Aquí estamos logueando la URL
              return (
                <img
                  src={url}
                  alt="user"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              );
            },
          },
          { Header: "Nombre", accessor: "name", align: "left" },
          { Header: "Tipo de Usuario", accessor: "tipo_usuario", align: "left" },
          { Header: "Email", accessor: "email", align: "left" },
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
        const rows = data.map((user) => ({
          id: user.id,
          name: user.name,
          tipo_usuario: user.tipo_usuario,
          ruta_imagen_usuario: user.ruta_imagen_usuario,
          email: user.email,
          email_verified_at: user.email_verified_at,
          created_at: user.created_at,
          update_at: user.update_at,
          // Agrega aquí más campos si es necesario...
        }));

        const handleEdit = (row) => {
          console.log("Editar usuario: ", row.id);
          setEditingUser(row.original);

          // Actualiza los useState con los datos del usuario seleccionado para la edición.
          setUsername(row.original.name);
          setPassword(row.original.password); // Considera no manejar contraseñas de esta manera por razones de seguridad.
          setEmail(row.original.email);
          setTipoUsuario(row.original.tipo_usuario);
          if (row.original.file) {
            setImage(row.original.file); // Asegúrate de que la imagen sea manejada correctamente.
          }

          handleOpenEdit();
        };

        const handleDelete = (row) => {
          axios
            .delete(`http://192.168.137.136/api/deleteuser/${row.original.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log("Usuario borrado:", row.original.id);
              fetchUsers(); // Obtener la lista actualizada de usuarioss
              swal("Buen trabajo!", "Se ha eliminado el usuario!", "success");
            })
            .catch((error) => {
              swal("Oops", "Parece que hubo un error!", "error");
              console.error("Error al borrar usuario:", error);
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
                  Tabla de Usuarios
                </MDTypography>
                <MDButton variant="gradient" color="dark" onClick={handleOpen}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  Añadir nuevo usuario
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
                          Ingresa tu Usuario
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
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                              />
                            </MDBox>
                            <MDBox mb={2}>
                              <MDInput
                                type="password"
                                label="Password"
                                variant="standard"
                                fullWidth
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                              />
                            </MDBox>
                            <MDBox mb={2}>
                              <MDInput
                                type="text"
                                label="Email"
                                variant="standard"
                                fullWidth
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                              />
                            </MDBox>
                            <MDBox mb={2}>
                              <FormControl variant="standard" fullWidth>
                                <InputLabel id="tipo-usuario-label">Tipo de Usuario</InputLabel>
                                <Select
                                  labelId="tipo-usuario-label"
                                  id="tipo-usuario-select"
                                  value={tipoUsuario}
                                  onChange={(event) => setTipoUsuario(event.target.value)}
                                >
                                  <MenuItem value={"cajero"}>Cajero</MenuItem>
                                </Select>
                              </FormControl>
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
                                onClick={handleAddUser}
                              >
                                Añadir usuario
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
                Ingresa tu Usuario
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
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="password"
                      label="Password"
                      variant="standard"
                      fullWidth
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Email"
                      variant="standard"
                      fullWidth
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="tipo-usuario-label">Tipo de Usuario</InputLabel>
                      <Select
                        labelId="tipo-usuario-label"
                        id="tipo-usuario-select"
                        value={tipoUsuario}
                        onChange={(event) => setTipoUsuario(event.target.value)}
                      >
                        <MenuItem value={"cajero"}>Cajero</MenuItem>
                      </Select>
                    </FormControl>
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
                      onClick={handleUpdateUser}
                    >
                      Editar usuario
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

export default Usuarios;
