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
  Tooltip,
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
import HelpIcon from "@mui/icons-material/Help";

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
  const [personaData, setPersonaData] = useState([]);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleOpenLayer = async (
    name,
    fechaNacimiento,
    fechaEmbarazo,
    entidad,
    riesgo,
    documento
  ) => {
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

    const { data: evaluacioncontrolData, error: evalError } = await supabase
      .from("evaluacioncontrol")
      .select("*")
      .eq("documento", documento);

    const { data: controlembarazoData, error: controlError } = await supabase
      .from("controlembarazo")
      .select("*");

    // Merge data based on tipocontrol
    const mergedData = evaluacioncontrolData.map((evalItem) => {
      const controlItem = controlembarazoData.find(
        (control) => control.tipocontrol === evalItem.tipocontrol
      );

      const fechaVisitaCal = evalItem.fechavisita ? new Date(evalItem.fechavisita) : new Date();
      const monthsDiff = differenceInMonths(fechaVisitaCal, new Date(fechaEmbarazo));
      console.log("monthsDiff", monthsDiff, fechaEmbarazo, evalItem.fechavisita, evalItem);

      let estado = "";
      let color = "";

      if (evalItem.tipocontrol == "inicial") {
        estado = monthsDiff >= 0 && monthsDiff <= 3 ? "En rango" : "Fuera de rango";
        if (monthsDiff >= 0 && monthsDiff <= 3) {
          color = evalItem.fechavisita ? "green" : "orange";
        } else {
          color = evalItem.fechavisita ? "red" : "yellow";
        }
      } else if (evalItem.tipocontrol == "medio") {
        estado = monthsDiff > 0 && monthsDiff <= 6 ? "En rango" : "Fuera de rango";
        if (monthsDiff > 0 && monthsDiff <= 6) {
          color = evalItem.fechavisita ? "green" : "orange";
        } else {
          color = evalItem.fechavisita ? "red" : "yellow";
        }
      } else if (evalItem.tipocontrol == "final") {
        estado = monthsDiff > 0 && monthsDiff <= 9 ? "En rango" : "Fuera de rango";
        if (monthsDiff > 0 && monthsDiff <= 9) {
          color = evalItem.fechavisita ? "green" : "orange";
        } else {
          color = evalItem.fechavisita ? "red" : "yellow";
        }
      }
      return { ...evalItem, ...controlItem, estado, monthsDiff, color };
    });

    // Ordenar mergedData por id del controlembarazo
    mergedData.sort((a, b) => a.id - b.id);

    console.log(mergedData, "¿qué pasó?");

    if (evalError || controlError) {
      console.error("Error fetching data:", evalError || controlError);
    } else {
      setPersonaData(mergedData);
    }

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
                  <TableCell>Riesgo</TableCell>
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
                      <TableCell>{persona.riesgo}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            handleOpenLayer(
                              persona.nombres,
                              persona.fechanacimiento,
                              persona.fechaembarazo,
                              persona.entidad,
                              persona.riesgo,
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
        <DialogTitle style={{ backgroundColor: "#2196F3", color: "white" }}>
          Histórico embarazo
        </DialogTitle>
        <DialogContent>
          <Grid container>
            {/* <Grid item xs={12}></Grid> */}
            <Grid item xs={1}>
              Nombre:
            </Grid>
            <Grid item xs={5}>
              {name}
            </Grid>
            <Grid item xs={1}>
              Edad:
            </Grid>
            <Grid item xs={5}>
              {edad}
            </Grid>
            <Grid item xs={2}>
              Fecha nacimiento:
            </Grid>
            <Grid item xs={4}>
              {fechaNacimiento}
            </Grid>
            <Grid item xs={2}>
              Fecha embarazo:
            </Grid>
            <Grid item xs={4}>
              {fechaEmbarazo}
            </Grid>
            <Grid item xs={1}>
              EPS:
            </Grid>
            <Grid item xs={5}>
              {eps}
            </Grid>
            <Grid item xs={1}>
              Meses:
            </Grid>
            <Grid item xs={5}>
              {meses}
            </Grid>
            <Grid item xs={2}>
              Embarazo alto riesgo:
            </Grid>
            {riesgo === "SI" ? (
              <Grid item xs={1} style={{ color: "red", fontWeight: "bold" }}>
                {riesgo}
              </Grid>
            ) : (
              <Grid item xs={1} style={{ color: "green", fontWeight: "bold" }}>
                {riesgo}
              </Grid>
            )}
          </Grid>

          <Grid item xs={4} style={{ fontWeight: "bold", marginTop: "20px" }}>
            Citas de control
          </Grid>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>descripción</TableCell>
                  <TableCell>FechaVisita</TableCell>
                  <TableCell>Estado</TableCell>
                  {/* <TableCell>Correo Alerta</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {personaData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.tipocontrol}</TableCell>
                    <TableCell>{item.descripcion}</TableCell>
                    <TableCell>{item.fechavisita}</TableCell>
                    <TableCell>
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: item.color,
                          margin: "0 auto",
                        }}
                      ></div>
                    </TableCell>
                    {/* <TableCell>{item.estado}</TableCell>{" "} */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        {/* Agrega el botón de ayuda */}
        <IconButton onClick={handleTooltipOpen} style={{ position: "absolute", top: 5, right: 35 }}>
          <HelpIcon />
        </IconButton>

        {/* Agrega el tooltip */}
        <Tooltip
          open={tooltipOpen}
          onClose={handleTooltipClose}
          title={
            <Grid container>
              <Grid item xs={3}>
                <div style={{ backgroundColor: "green", width: "30%", height: "40px" }}></div>
                <span>Control realizado a tiempo</span>
              </Grid>
              <Grid item xs={3}>
                <div style={{ backgroundColor: "yellow", width: "30%", height: "40px" }}></div>
                <span>No se ha realizado control</span>
              </Grid>
              <Grid item xs={3}>
                <div style={{ backgroundColor: "orange", width: "30%", height: "40px" }}></div>
                <span>Próximo control recomendado</span>
              </Grid>
              <Grid item xs={3}>
                <div style={{ backgroundColor: "red", width: "30%", height: "40px" }}></div>
                <span>Control atrasado</span>
              </Grid>
            </Grid>
          }
          arrow
          placement="left"
        >
          <IconButton style={{ position: "absolute", top: 5, right: 5 }}>x</IconButton>
        </Tooltip>
        <IconButton onClick={handleClose} style={{ position: "absolute", top: 5, right: 5 }}>
          x
        </IconButton>
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
  selected: PropTypes.array,
};
