// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// axios
import axios from "axios";

// useState Hook
import { useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/loginbg.png";
import logo from "assets/images/logowh.png";

function Cover() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // hook to navigate

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://165.22.189.59:8001/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Successful response:", response.data);
        navigate("/usuarios");
      })
      .catch((error) => {
        console.error("Error:", error);
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
                  to="/authentication/reset-password"
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
    </CoverLayout>
  );
}

export default Cover;
