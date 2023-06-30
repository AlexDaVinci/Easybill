import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/loginbg.png";
import logo from "assets/images/logowh.png";
import { AuthContext } from "../../../AuthContext"; // Asegúrate de reemplazar esto con la ruta correcta a AuthContext
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import swal from "sweetalert";

function Cover() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const navigate = useNavigate();
  var token = "";
  const { logIn } = useContext(AuthContext); // Usamos el contexto aquí

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogContent("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://apieasybill.online/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Successful response:", response.data);
        axios
          .get("https://apieasybill.online/api/user-profile", {
            headers: { Authorization: `Bearer ${response.data.token}` },
          })
          .then((userResponse) => {
            logIn(response.data.token, userResponse.data);
            if (userResponse.data.userData.tipo_usuario == "administrador") {
              navigate("/dashboard");
            } else {
              axios
                .get("https://apieasybill.online/api/validateCaja", {
                  headers: { Authorization: `Bearer ${response.data.token}` },
                })
                .then((responseto) => {
                  const codigo = responseto.status;
                  if (codigo == "203") {
                    navigate("/dashboard");
                  } else {
                    swal({
                      title: "Estimado cajero, primero abre la caja!",
                      content: {
                        element: "input",
                        attributes: {
                          placeholder: "Valor actual de la caja",
                          type: "number",
                        },
                      },
                    }).then((value) => {
                      axios
                        .post(
                          "https://apieasybill.online/api/openCaja",
                          {
                            user_id: userResponse.data.userData.id,
                            monto: value,
                          },
                          {
                            headers: { Authorization: `Bearer ${response.data.token}` },
                          }
                        )
                        .then((response) => {
                          console.log(response);
                          navigate("/dashboard");
                        })
                        .catch((error) => {
                          console.error("Error:", error);
                          swal("Oops", "Algo salio mal!", "error");
                        });
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }
          })
          .catch((userError) => {
            console.error("Error fetching user data:", userError);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        swal("Oops", "Correo o contraseña invalidos!", "error");
      });
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
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
            Ingresa tu Usuario y tu Contraseña
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Usuario"
                variant="standard"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Contraseña"
                variant="standard"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Ingresar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Olvidaste tu contraseña?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/caja"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Aqui
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogContent}</DialogTitle>
      </Dialog>
    </CoverLayout>
  );
}

export default Cover;
