
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Material Dashboard 2 React example components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Footer from "examples/Footer";
import DataTable from "examples/Tables/Table";
import getDeportesAPI from "../../api/getDeportes";
import curved0 from "assets/images/logo4.png";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';

// Button, Navigation
import SoftButton from "components/SoftButton";
import {Routes, Route, useNavigate} from 'react-router-dom';
import deleteDeporteApi from "../../api/deleteDeporte";


function Tablas(props) {
  
  const title = "Deportes";
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loadingRows, setLoadingRows] = useState(false);
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  const fetchDeportes = async () => {
    setLoadingRows(true);
    getDeportesAPI().then((response) => {
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
  }


  useEffect(() => {
    fetchDeportes();
  }, []);


  const navigateToCreateNewDeporte = () => {
    navigate('/createDeporte/');
  };

  function handleDeleteDeporte(id) {
   deleteDeporteApi(id).then(response => {
      setIsSuccess(response.ok);
      setShowMsg(true);
      response.json().then(msg => {
        
      })
      setRows(rows.filter(row => row.id !== id));
   });
  }

  return (
      <DashboardLayout>
      <SoftBox position="relative"> 
        <DashboardNavbar absolute light />
        <SoftBox
          display="flex"
          alignItems="center"
          position="relative"
          minHeight="18.75rem"
          borderRadius="xl"
          sx={{
            backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.info.main, 0.6),
                rgba(gradients.info.state, 0.6)
              )}, url(${curved0})`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
            overflow: "hidden",
          }}
        />
      </SoftBox>
      <SoftBox pt={12} pb={6}>
        <Grid container spacing={1}>
          <Grid item xs={200}>
            <Card>
              <SoftBox pt={3}></SoftBox>
              <SoftBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                style={{ display: "flex" }}
              >
                <SoftTypography variant="h6" color="white">
                  {title}
                </SoftTypography>
                <SoftButton variant="outlined" color="white" size="small"  style={{ marginLeft: "auto" }} onClick={navigateToCreateNewDeporte}>
                  +
                </SoftButton>
              </SoftBox>
              <SoftBox pt={3}>
              <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                <TableHead sx={{ display: "table-header-group" }}>
                    <TableRow>
                      <TableCell align="center">Identificador</TableCell>
                      <TableCell align="center">Nombre</TableCell>
                      <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="center" style={{width: 1}}>
                          {row.id}
                        </TableCell>
                        <TableCell align="center">{row.nombre}</TableCell>
                        <TableCell align="center">
                        <SoftTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={() => navigate("/editDeporte/" + row.id )}>
                          <Tooltip title="Editar">
                            <IconButton>
                              <EditIcon/>
                            </IconButton>
                          </Tooltip>
                        </SoftTypography> 
                        <SoftTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={() => { if (window.confirm('Confirma eliminar el deporte?')) handleDeleteDeporte(row.id) } }>
                          <Tooltip title="Eliminar">
                            <IconButton>
                              <DeleteIcon/>
                            </IconButton>
                          </Tooltip>
                        </SoftTypography> 
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
      </DashboardLayout>
    
  );
}

export default Tablas;
