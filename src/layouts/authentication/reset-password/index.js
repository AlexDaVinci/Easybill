// @mui material components
import Card from "@mui/material/Card";
import React, { useContext, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

// Images
import bgImage from "assets/images/loginbg.png";

function Cover() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://apieasybill.online/api/recuperar", {
        email: email,
      })
      .then((response) => {
        console.log("Successful response:", response.data);
        swal("Buen trabajo!", "En pocos segundos te llegara un correo!", "success").then(
          (value) => {
            navigate("/sign-up");
          }
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        swal("Oops", "Correo no registra!", "error");
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogContent("");
  };
  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Restaurar contraseña
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Vas a recibir un correo en maximo 60 segundos
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={4}>
              <MDInput
                type="text"
                label="Usuario"
                variant="standard"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Reset
              </MDButton>
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
