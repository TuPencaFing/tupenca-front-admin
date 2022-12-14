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

// @mui material components
import Card from "@mui/material/Card";
import { useState, useEffect} from "react";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import getPremiosUsuariosAPI from "../../../../api/getPremiosUsuarios";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";

function Invoices() {

  const [rows, setRows] = useState([]);
  const [loadingRows, setLoadingRows] = useState(false);

  const fetchPremiosUsuarios = async () => {
    setLoadingRows(true);
    getPremiosUsuariosAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          setRows(r);
        });
  
      } else {
        return Promise.reject(response);
      }
    })
      .catch((e) => {
        console.log('error', e);
      })
      .finally(() => {
        setLoadingRows(false);
      });
  };
  
  useEffect(() => {
    fetchPremiosUsuarios();
  }, []);

  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
          Egresos
        </SoftTypography>
        {/*<SoftButton variant="outlined" color="info" size="small">
          view all
  </SoftButton>*/}
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            {rows.length > 0 ? rows.map((row) => ( row.reclamado ? 
                <Invoice date={row.banco + "-" + row.cuentaBancaria} id={"#TuPenca-"+row.id*1000} price={"$"+row.premio} reclamado={row.reclamado}/> : ""
              )) : <SoftTypography>No hay egresos recientes</SoftTypography>}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default Invoices;
