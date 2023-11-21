import PropTypes from "prop-types";
import { format } from "date-fns";
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
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Paper,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import { differenceInYears } from "date-fns";
import { differenceInMonths } from "date-fns";
import { supabase } from "src/supabase/client";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export const HijosTable = (props) => {
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
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const [open, setOpen] = useState(false);
  const [name, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaEmbarazo, setFechaEmbarazo] = useState("");
  const [edad, setEdad] = useState("");
  const [eps, setEPS] = useState("");
  const [meses, setMeses] = useState("");
  const [riesgo, setRiesgo] = useState("");
  const [nombreRespon, setNombreRespon] = useState("");
  const [DocuRespon, setDocumentoRespon] = useState("");
  const [personaData, setPersonaData] = useState([]);

  const handleOpenLayer = async (name, fechaNacimiento, fechaEmbarazo, entidad, documento) => {
    setNombre(name);
    setFechaNacimiento(fechaNacimiento);
    setFechaEmbarazo(fechaEmbarazo);
    setEPS(entidad);
    const mesesEmbarazo = differenceInMonths(new Date(), new Date(fechaNacimiento));
    setEdad(mesesEmbarazo);

    const { data: vacunacionData, error: vacunacionError } = await supabase
      .from("vacunacion")
      .select("nombre, descripcion, meses");

    const { data: evaluacionvacunacionData, error: evaluacionvacunacionError } = await supabase
      .from("evaluacionvacunacion")
      .select("nombre, fechavacunacion")
      .eq("documento", documento);

    if (vacunacionData && evaluacionvacunacionData) {
      const mergedData = vacunacionData.map((v) => {
        const e = evaluacionvacunacionData.find((evaluation) => evaluation.nombre === v.nombre);
        return { ...v, fechavacunacion: e ? e.fechavacunacion : "NA" };
      });
      setPersonaData(mergedData);
      console.log(mergedData);
    } else {
      console.error("Error fetching data:", vacunacionError || evaluacionvacunacionError);
    }

    // Realiza la consulta para obtener el responsable del menor
    const { data: dataResponsable, errorResponsable } = await supabase
      .from("hijos")
      .select("*")
      .eq("documento", documento);

    // Extrae el id del responsable del resultado de la consulta
    const idRespon = dataResponsable[0]?.responsable;

    // Realiza la consulta para obtener los nombres y documento de la persona
    const { data: dataPersona, errorPersona } = await supabase
      .from("persona")
      .select("nombres, documento")
      .eq("documento", idRespon);

    setNombreRespon(dataPersona[0].nombres);
    setDocumentoRespon(dataPersona[0].documento);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                  <TableCell>Id</TableCell>
                  <TableCell>TipoDoc</TableCell>
                  <TableCell>documento</TableCell>
                  <TableCell>Nombres</TableCell>
                  <TableCell>Departamento</TableCell>
                  <TableCell>Municipio</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Entidad</TableCell>
                  <TableCell>Inf</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((persona) => {
                  const isSelected = selected.includes(persona.id);
                  const createdAt =
                    persona.fechaprogramada; /*format(persona.fechaprogramada, 'dd/MM/yyyy');*/

                  return (
                    <TableRow hover key={persona.id} selected={isSelected}>
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
                      <TableCell>{persona.id}</TableCell>
                      <TableCell>{persona.tipodoc}</TableCell>
                      <TableCell>{persona.documento}</TableCell>
                      <TableCell>{persona.nombres}</TableCell>
                      <TableCell>{persona.departamento}</TableCell>
                      <TableCell>{persona.municipio}</TableCell>
                      <TableCell>{persona.email}</TableCell>
                      <TableCell>{persona.entidad}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            handleOpenLayer(
                              persona.nombres,
                              persona.fechanacimiento,
                              persona.fechaembarazo,
                              persona.entidad,
                              persona.documento
                            )
                          }
                        >
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
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Histórico control de vacunas</DialogTitle>
        <DialogContent>
          <Grid container>
            {/* <Grid item xs={12}></Grid> */}
            <Grid item xs={2}>
              Nombre:
            </Grid>
            <Grid item xs={4}>
              {name}
            </Grid>
            <Grid item xs={1}>
              Edad:
            </Grid>
            <Grid item xs={5}>
              {edad}(meses)
            </Grid>
            <Grid item xs={2}>
              Fecha nacimiento:
            </Grid>
            <Grid item xs={4}>
              {fechaNacimiento}
            </Grid>
            <Grid item xs={1}>
              EPS:
            </Grid>
            <Grid item xs={5}>
              {eps}
            </Grid>
            <Grid item xs={12}>
              Responsable menor: CC: {DocuRespon} {nombreRespon}
            </Grid>
          </Grid>

          <Grid item xs={4} style={{ fontWeight: "bold", marginTop: "20px" }}>
            Control de vacunación
          </Grid>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Meses</TableCell>
                  <TableCell>FechaVacuna</TableCell>
                  <TableCell>check</TableCell>
                  <TableCell>Correo Alerta</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {personaData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell>{item.descripcion}</TableCell>
                    <TableCell>{item.meses}</TableCell>
                    <TableCell>{item.fechavacunacion}</TableCell>
                    <TableCell>
                   
                    </TableCell>
                    <TableCell>{item.correoAlerta}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <IconButton onClick={handleClose} style={{ position: "absolute", top: 5, right: 5 }}>
          x
        </IconButton>
      </Dialog>
    </div>
  );
};

HijosTable.propTypes = {
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
  selected: PropTypes.array,
};
