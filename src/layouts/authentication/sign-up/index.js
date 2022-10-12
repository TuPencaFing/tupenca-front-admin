/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/logo4.png";

import signupApi from "../../../api/signup";

function SignUp() {
  const [agreement, setAgremment] = useState(true);

  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');

  const [email, setEmail] = useState('');

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const jsonError = (name) => (
    <SoftTypography variant="body2" color="white">
      {name}.
    </SoftTypography>
  );

  const jsonSuccess = () => (
    <SoftTypography variant="body2" color="white">
      Usuario creado con éxito.   
              <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="white"
                  fontWeight="bold"
                  textGradient
                >
                  Inicia sesión
                </SoftTypography>
    </SoftTypography>
  );

  const signupUser = async () => {

    const data = {
      email: email,
      username: username,
			password: password
   }
   signupApi(data).then(response => {
      setIsSuccess(response.ok);
      setShowMsg(true);
      response.json().then(msg => {
        setJsonResponseMessage("Asegúrese de que su contraseña y nombre de usuario sean al menos de 6 caracteres");
      })
   });

  }

  const handleSetAgremment = () => setAgremment(!agreement);

  return (
    <BasicLayout
      title="Bienvenido!"
      description="Inicio de sesión exclusivo para administradores del sistema"
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Registrarse con
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput placeholder="Nombre" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;Acepto los&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Términos y Condiciones
              </SoftTypography>
            </SoftBox>
            {showMsg &&!isSuccess && <SoftBox pt={2} px={2}>
                <SoftAlert color="error">
                  {jsonError(jsonResponseMessage)}
                </SoftAlert>
              </SoftBox>}
             {showMsg && isSuccess && <SoftBox pt={2} px={2}>
                <SoftAlert color="success">
                  {jsonSuccess()}
                </SoftAlert>
              </SoftBox>}
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" onClick={signupUser} fullWidth>
                Registrarme
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Ya tienes una cuenta?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Inicia sesión
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
