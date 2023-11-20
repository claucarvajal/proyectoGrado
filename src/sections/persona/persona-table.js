import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography, Dialog, DialogTitle, DialogContent,TableContainer,Paper
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { Grid } from "@mui/material";
import { differenceInYears } from 'date-fns';
import { differenceInMonths } from 'date-fns';
import { supabase } from "src/supabase/client";


export const PersonaTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const [open, setOpen] = useState(false);
  const [name, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaEmbarazo, setFechaEmbarazo] = useState("");
  const [edad, setEdad] = useState("");
  const [eps, setEPS] = useState("");
  const [meses, setMeses] = useState("");
  const [riesgo, setRiesgo] = useState("");
  const [personaData, setPersonaData] = useState([]);
  

  const handleOpenLayer = async (name, fechaNacimiento, fechaEmbarazo, entidad, riesgo, documento) => {
    setNombre(name);
    setFechaNacimiento(fechaNacimiento);
    setFechaEmbarazo(fechaEmbarazo);
    setEPS(entidad);
    const fechaNacimiento2 = new Date(fechaNacimiento);
    const edad3 = differenceInYears(new Date(), fechaNacimiento2);
    setEdad(edad3);
    setRiesgo(riesgo);
    const mesesEmbarazo = differenceInMonths(new Date(), new Date(fechaEmbarazo));
    setMeses(mesesEmbarazo);

    const { data, error } = await supabase
    .from('persona')
    .select('*', { 
      leftJoin: { 
        from: 'evaluacioncontrol', 
        on: { 'evaluacioncontrol.documento': 'persona.documento' } 
      } 
    })
    .select('*', { 
      leftJoin: { 
        from: 'controlembarazo', 
        on: { 'controlembarazo.tipocontrol': 'evaluacioncontrol.tipocontrol' } 
      } 
    })
    .eq('embarazo', 'SI')
    .eq('documento', documento)
    // .order('persona.nombres', { ascending: true })
    // .order('evaluacioncontrol.id', { ascending: true });

    console.log(data, "q paso")
    if (error) {
      console.error('Error fetching data:', error);
      // Handle the error appropriately
    } else {
      setPersonaData(data);
    }

    // const { data, error2 } = await supabase
    // .from('persona')
    // .select('*')
    // .eq('embarazo', 'SI');
    // console.log(data, "q paso")
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  


  return (
    <div>
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Id
                </TableCell>
                <TableCell>
                  TipoDoc
                </TableCell>
                <TableCell>
                  documento
                </TableCell>
                <TableCell>
                  Nombres
                </TableCell>
                <TableCell>
                  Departamento
                </TableCell>
                <TableCell>
                  Municipio
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Entidad
                </TableCell>
                <TableCell>
                  Riesgo
                </TableCell>
                <TableCell>
                  Inf
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((persona) => {
                const isSelected = selected.includes(persona.id);
                const createdAt = persona.fechaprogramada;/*format(persona.fechaprogramada, 'dd/MM/yyyy');*/

                return (
                  <TableRow
                    hover
                    key={persona.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(persona.id);
                          } else {
                            onDeselectOne?.(persona.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {persona.id}
                    </TableCell>
                    <TableCell>
                      {persona.tipodoc}
                    </TableCell>
                    <TableCell>
                      {persona.documento}
                    </TableCell>
                    <TableCell>
                      {persona.nombres}
                    </TableCell>
                    <TableCell>
                      {persona.departamento}
                    </TableCell>
                    <TableCell>
                      {persona.municipio}
                    </TableCell>
                    <TableCell>
                      {persona.email}
                    </TableCell>
                    <TableCell>
                      {persona.entidad}
                    </TableCell>
                    <TableCell>
                      {persona.riesgo}
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        onClick={() => handleOpenLayer(
                          persona.nombres, 
                          persona.fechanacimiento, 
                          persona.fechaembarazo,
                          persona.entidad,
                          persona.riesgo,
                          persona.documento,
                        )}>
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
         
        </Box>
      </Scrollbar>
      
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    <Dialog open={open} onClose={handleClose} style={{width:"100%"}}>
      <DialogTitle >Histórico embarazo</DialogTitle>
      <DialogContent>
        <Grid container>
          {/* <Grid item xs={12}></Grid> */}
          <Grid item xs={2}>Nombre:</Grid>
          <Grid item xs={4}>{name}</Grid>
          <Grid item xs={1}>Edad:</Grid>
          <Grid item xs={5}>{edad}</Grid>
          <Grid item xs={3}>Fecha nacimiento:</Grid>
          <Grid item xs={3}>{fechaNacimiento}</Grid>
          <Grid item xs={3}>Fecha embarazo:</Grid>
          <Grid item xs={3}>{fechaEmbarazo}</Grid>
          <Grid item xs={1}>EPS:</Grid>
          <Grid item xs={5}>{eps}</Grid>
          <Grid item xs={2}>Meses:</Grid>
          <Grid item xs={4}>{meses}</Grid>
          <Grid item xs={4}>Embarazo alto riego:</Grid>
          {riesgo === 'SI' 
            ? 
              <Grid item xs={1} style={{ color: 'red', fontWeight: 'bold' }}>{riesgo}</Grid> 
            : <Grid item xs={1} style={{ color: 'green', fontWeight: 'bold' }}>{riesgo}</Grid>
          }
        </Grid>

        <Grid item xs={4} style={{fontWeight: 'bold', marginTop: "20px"}}>Citas de control</Grid>
        <TableContainer component={Paper} style={{marginTop: "20px"}}>
          <Table>
            
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>descripción</TableCell>
                <TableCell></TableCell>
                <TableCell>Correo Alerta</TableCell>
                {/* ... (más encabezados) */}
              </TableRow>
            </TableHead>
            <TableBody>
            {personaData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.descripcion}</TableCell>
                <TableCell>{/* ... */}</TableCell>
                <TableCell>{item.correoAlerta}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <IconButton onClick={handleClose} style={{ position: 'absolute', top: 5, right: 5 }}>x</IconButton>
    </Dialog>
   </div>
  );
};

PersonaTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
