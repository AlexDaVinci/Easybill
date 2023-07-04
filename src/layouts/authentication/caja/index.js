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
import { AuthContext } from "../../../AuthContext";

function Caja() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const auth = useContext(AuthContext);
  const token = auth.authToken;
  console.log(auth.userData.userData.id);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://165.22.189.59/api/closeCaja",
        {
          user_id: auth.userData.userData.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/sign-in");
      })
      .catch((error) => {
        console.error("Error:", error);
        swal("Oops", "Algo salio mal!", "error");
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
            Finaliza tu jornada
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Cuando quieras finalizar tu jornada haz click en el boton!
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mt={6} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Finalizar
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Caja;
