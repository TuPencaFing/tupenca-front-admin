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

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import getCampeonatosApi from "../../../../api/getCampeonatos.js";
import deleteCampeonatoApi from "../../../../api/deleteCampeonato";
import SoftAlert from "components/SoftAlert";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

// Data
import data from "layouts/dashboard/components/Campeonatos/data";

function Campeonatos() {
  const { columns, rows1 } = data();
  const [codigoEliminar, setCodigoEliminar] = useState('');
  const [menu, setMenu] = useState(null);
  const navigate = useNavigate();
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  const [rows, setRows] = useState([]);
    const [loadingRows, setLoadingRows] = useState(false);

    useEffect(() => {
        getCampeonatos();
      }, []);
  
    const getCampeonatos = async () => {
      setLoadingRows(true);
      getCampeonatosApi().then((response) => {
        if (response.ok) {
          response.json().then((r) => {
            setRows(r); 
          });
          
        } else {
          return Promise.reject(response);
        }
      })
      .catch((e) => {
        console.log('error',e);
      })
      .finally(() => {
        setLoadingRows(false);
      });
    }

    const jsonError = () => (
        <SoftTypography variant="body2" color="white">
          No se pudo eliminar el campeonato.
        </SoftTypography>
      );
    
      const jsonSuccess = () => (
        <SoftTypography variant="body2" color="white">
          El campeonato se ha eliminado con éxito.
        </SoftTypography>
      );

    const deleteCampeonato = async () => {
       deleteCampeonatoApi(codigoEliminar).then(response => {
          setIsSuccess(response.ok);
          setShowMsg(true);
          response.json().then(msg => {
            setJsonResponseMessage("No se pudo eliminar el campeonato.");
          })
       });
      }

  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
            Campeonatos ingresados en el sistema
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox>
       <SoftTypography variant="h6" gutterBottom>
       <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            {rows.map(row => <div>Nombre: {row.name}, código del campeonato: {row.id} </div>)}
        </SoftBox>
       </SoftTypography>
       <SoftBox p={2}>
                  <SoftTypography variant="h5">Ingrese el código del campeonato a eliminar *</SoftTypography>
                  <TextField id="standard-basic" variant="standard" onChange={(e) => setCodigoEliminar(e.target.value)}/>
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
       <SoftBox p={2}>
                <SoftButton variant="outlined" color="info" size="small"  style={{ marginRight: "auto" }} onClick={deleteCampeonato}>
                    Eliminar
                </SoftButton>
                <SoftButton variant="outlined" color="error" size="small"  style={{ marginRight: "auto" }} onClick={() => navigate(-1)}>
                    Cancelar
                </SoftButton>
              </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default Campeonatos;
