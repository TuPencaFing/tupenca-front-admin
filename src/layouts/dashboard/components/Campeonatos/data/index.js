// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import getCampeonatosApi from "../../../../../api/getCampeonatos.js";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useState, useEffect } from "react";

export default function Data() {

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

  return {
    columns: [
      { name: "campeonato", accessor: "name", width: "30%", align: "left" },
      { name: "fecha de inicio", accessor: "startDate", align: "left"},
      { name: "fecha de fin", accessor: "finishDate", align: "center" },
      { name: "opciones", accessor: "accions", align: "center"},
    ],

    rows: [      
    rows.map((row)=> {
        return {
            name: (
            <SoftBox display="flex" alignItems="center" lineHeight={1}>
                <SoftBox ml={2} lineHeight={1}>
                <SoftTypography variant="standard" fontWeight="medium">
                    {row.name}
                </SoftTypography>
                </SoftBox>
            </SoftBox>
          ),
          startDate: (
          <SoftTypography variant="standard" fontWeight="medium">
             { row.startDate }
          </SoftTypography>
          ),
          finishDate: (
            <SoftTypography variant="standard" fontWeight="medium">
                { row.finishDate }
            </SoftTypography>
          ),
          accions: (
          <SoftTypography >
            Hola
          </SoftTypography> 
          ),
        }
      })]
  };
}
