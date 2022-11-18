
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
import getFuncionariosAPI from "../../api/getFuncionarios";
import curved0 from "assets/images/logo4.png";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftAvatar from "components/SoftAvatar";
import TablePagination from '@mui/material/TablePagination';
import getEmpresasAPI from "../../api/getEmpresas";

// Button, Navigation
import {Routes, Route, useNavigate} from 'react-router-dom';


function Tablas(props) {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loadingRows, setLoadingRows] = useState(false);
  const [empresas, setEmpresas] = useState([]);

  const fetchFuncionarios = async () => {
    setLoadingRows(true);
    getFuncionariosAPI().then((response) => {
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

  const fetchEmpresas = async () => {
    setLoadingRows(true);
    getEmpresasAPI().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
            r.map((row) => empresas.push({ label: row.razonsocial, id: row.id }));
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

  function getEmpresaName(id){
    var nombreEmp = ""
    empresas.map((emp) => {
        if(emp.id == id){
            nombreEmp = emp.label
        }
    });
    return nombreEmp;
  }



  useEffect(() => {
    fetchEmpresas();
    fetchFuncionarios();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
      <DashboardLayout>
        <DashboardNavbar />
      <SoftBox pt={12} pb={12}>
        <Grid container spacing={1}>
          <Grid item xs={200}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Contacto con las empresas</SoftTypography>
            </SoftBox>
            <SoftBox>
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                <TableHead sx={{ display: "table-header-group" }}>
                    <TableRow>
                      <TableCell align="center">Avatar</TableCell>
                      <TableCell align="center">Nombre o alias</TableCell>
                      <TableCell align="center">Dirección de contacto</TableCell>
                      <TableCell align="center">Empresa</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : rows
                    ).map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="center" style={{width: 1}}>
                            <SoftAvatar variant="rounded" src={row.image} alt={row.userName} shadow="md" />
                        </TableCell>
                        <TableCell align="center">{row.userName}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{getEmpresaName(row.empresaId)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
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
