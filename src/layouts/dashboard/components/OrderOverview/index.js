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
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3}>
        <SoftTypography variant="h6" fontWeight="medium">
          Actividad reciente (menos de 24 horas)
        </SoftTypography>
        <SoftBox mt={1} mb={2}>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            <SoftTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ fontWeight: "bold", color: ({ palette: { success } }) => success.main }}>
                arrow_upward
              </Icon>
            </SoftTypography>
            &nbsp;
            <SoftTypography variant="button" color="text" fontWeight="medium">
              24%
            </SoftTypography>{" "}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="2 pozos compartidos reclamados"
          dateTime="22 Octubre 7:20 PM"
        />
        <TimelineItem
          color="error"
          icon="inventory_2"
          title="7 suscripciones finalizadas"
          dateTime="22 Octubre 7:20 PM"
        />
        <TimelineItem
          color="success"
          icon="shopping_cart"
          title="4 nuevas suscripciones"
          dateTime="22 Octubre 7:20 PM"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="Pago rechazado para pedido #4395133"
          dateTime="22 Octubre 7:20 PM"
        />
        <TimelineItem
          color="error"
          icon="flag"
          title="27 comentarios reportados en foros"
          dateTime="22 Octubre 7:20 PM"
        />
        <TimelineItem 
          color="dark" 
          icon="vpn_key" 
          title="642 usuarios utilizaron la aplicación" 
          dateTime="22 Octubre 7:20 PM" />
      </SoftBox>
    </Card>
  );
}

export default OrdersOverview;
