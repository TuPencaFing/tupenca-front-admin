// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";

// Images
import logoFootball from "assets/images/small-logos/logoFootball.jpg";
import logoBasketball from "assets/images/small-logos/logoBasketball.jpg";
import logoTenis from "assets/images/small-logos/logoTennis.jpg";

export default function data() {
  
  return {
    columns: [
      { name: "Campeonato", align: "left" },
      { name: "Pencas", align: "center" },
      { name: "Ganancias", align: "center" },
      { name: "Progreso", align: "center" },
    ],

    rows: [
      {
        Campeonato: [logoFootball, "FIFA World Cup - Qatar 2022"],
        Pencas: (
          791
        ),
        Ganancias: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </SoftTypography>
        ),
        Progreso: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={60} color="warning" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        Campeonato: [logoFootball, "Torneo clausura uruguayo"],
        Pencas: (
          278
        ),
        Ganancias: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $3,000
          </SoftTypography>
        ),
        Progreso: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={10} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        Campeonato: [logoTenis, "Uruguay Open"],
        Pencas: (
         103
        ),
        Ganancias: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $13,500
          </SoftTypography>
        ),
        Progreso: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={100} color="error" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        Campeonato: [logoBasketball, "NBA Season 2022"],
        Pencas: (
          75
        ),
        Ganancias: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $20,500
          </SoftTypography>
        ),
        Progreso: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={100} color="error" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        Campeonato: [logoFootball, "Copa Libertadores"],
        Pencas: (
          29
        ),
        Ganancias: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $500
          </SoftTypography>
        ),
        Progreso: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={25} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        Campeonato: [logoBasketball, "Liga Uruguaya de Básquetbol"],
        Pencas: (
          26
        ),
        Ganancias: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $2,000
          </SoftTypography>
        ),
        Progreso: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={40} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
    ],
  };
}
