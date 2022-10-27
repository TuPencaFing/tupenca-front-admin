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
import { Navigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Images
import curved9 from "assets/images/logo4.png";

import signinApi from "../../../api/signin";
import jwt_decode from "jwt-decode";

function SignIn() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [rememberMe, setRememberMe] = useState(true);

  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const navigate = useNavigate();
  

  const jsonError = (name) => (
    <SoftTypography variant="body2" color="white">
      {name}.
    </SoftTypography>
  );

  const jsonSuccess = () => (
    <SoftTypography variant="body2" color="white">
      Usuario creado con éxito.
    </SoftTypography>
  );

  const signinUser = async () => {
   signinApi(email, password).then(response => {
    if (response.ok) {
      response.json().then(r => {
        localStorage.setItem("token", r.token);
        const decodedToken = jwt_decode(r.token);
        const givenName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
        localStorage.setItem("givenName", givenName);
        console.log(localStorage.getItem("givenName"));
        console.log(localStorage.getItem("token"));
        navigate("/dashboard");
      })
    } else {
      setIsSuccess(response.ok);
        setShowMsg(true);
        setJsonResponseMessage("El email o contraseña son incorrectos");
      }})

    }

        
       

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout
      title="Bienvenido!" variant="gradient" color="dark"
      description="Inicie sesión con sus credenciales"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Contraseña
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Recordarme
          </SoftTypography>
        </SoftBox>
        {showMsg &&!isSuccess && <SoftBox pt={2} px={2}>
          <SoftAlert color="error">
            {jsonError(jsonResponseMessage)}
          </SoftAlert>
          </SoftBox>}
        {showMsg && isSuccess && <Navigate to={"/dashboard"} ></Navigate>}
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="dark" fullWidth onClick={signinUser}>
            Iniciar sesión
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
