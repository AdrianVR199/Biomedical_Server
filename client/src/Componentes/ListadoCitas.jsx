import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, TextField } from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";
import Popup from "./Popup";
import { useAppContext } from "../context/ContextProvider";

function ListadoCitas() {
  const { getCitas } = useAppContext();

  function formatTime(timeString) {
    const time = new Date(`01/01/2000 ${timeString}`);
    let hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    //const seconds = time.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours %= 12;
    hours = hours ? hours : 12;

    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return formattedTime;
  }
 
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const formattedDate = `${day} de ${monthNames[month]} de ${year}`;

    return formattedDate;
  }
  const [listcitas, setlistcitas] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    const getlistCitas = async () => {
      const contentlist = await getCitas();

      const now = new Date();
      const citasFiltradas = contentlist.filter((cita) => {
        if (!cita.fecha_reg) return false; // descarta las citas sin fecha_reg
        const fechaCita = new Date(cita.fecha_reg);
        return fechaCita.getTime() < now.getTime(); // devuelve true si la fecha de la cita es posterior a la fecha actual
      });
      setlistcitas(citasFiltradas);
    };
    getlistCitas();
  }, []);
  const rows1 = listcitas.map((item) => ({
    id: item.cita_id,
    col1: formatDate(item.fecha_reg),
    col2: formatTime(item.hora_reg),
    col3: item.tipo_cita,
    col4: item.nombre_medico,
  }));
  const [citamos, setcitamos] = useState("");

  const handleButtonClick = (params, list) => {
    const rowData = params.row;
    const objetoEncontrado = list.find(
      (objeto) => objeto.cita_id === rowData.id
    );
    if (objetoEncontrado) {
      setcitamos(objetoEncontrado);
    }
    setOpenPopup(true);
  };

  const columns = [
    {
      field: "col1",
      headerName: "Fecha",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "col2",
      headerName: "Hora",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "col3",
      headerName: "Tipo de Cita",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "col4",
      headerName: "Atendido por:",
      width: 310,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "col5",
      align: "center",
      headerName: "Revisar",
      width: 60,
      renderCell: (params) => (
        <HomeOutlined
          style={{ cursor: "pointer" }}
          backgroundcolor="biomedical.green"
          onClick={() => handleButtonClick(params, listcitas)}
        />
      ),
    },
  ];
  return (
    <div
      style={{ height: "100%", width: "100%", boxShadow: "2px 0px 6px #8888" }}
    >
      <DataGrid
        rows={rows1.reverse()}
        columns={columns}
        hideFooterSelectedRowCount
        hide
        initialState={{
          pagination: { paginationModel: { pageSize: 8 } },
        }}
        pageSizeOptions={[8]}
        //pageSizeOptions={false}
      />
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        width="md"
        height="80vh"
        titulo="Detalles de agendamiento de cita"
      >
        <div className="F-A-popupcont-cita">
          <div style={{ width: "55%" }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                height: "100%",
              }}
            >
              <div style={{ width: "100%" }}>
                <p
                  style={{
                    margin: 0,
                    marginBottom: "15px",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  Nombre del paciente
                </p>
                <TextField
                  // name="fecha_nac"

                  size="small"
                  InputLabelProps={{
                    classes: {
                      focused: "my-custom-focus-label",
                    },
                  }}
                  InputProps={{
                    classes: {
                      focused: "my-custom-focus-class",
                    },
                  }}
                  value={citamos.nombre_paciente || ""}
                  // onChange={(value)=>setValue()}

                  // handleChange={handleChange}
                  sx={{
                    width: "80%",
                  }}
                  focused
                />
              </div>
              <div style={{ width: "50%" }}>
                <p
                  style={{
                    margin: 0,
                    marginBottom: "15px",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  Fecha de agendamiento
                </p>
                <TextField
                  // name="fecha_nac"

                  size="small"
                  InputLabelProps={{
                    classes: {
                      focused: "my-custom-focus-label",
                    },
                  }}
                  InputProps={{
                    classes: {
                      focused: "my-custom-focus-class",
                    },
                  }}
                  value={citamos.fecha_reg || ""}
                  // value={value}
                  // onChange={(value)=>setValue()}

                  // handleChange={handleChange}
                  sx={{
                    width: "80%",
                  }}
                  focused
                />
              </div>
              <div style={{ width: "37%" }}>
                <p
                  style={{
                    margin: 0,
                    marginBottom: "15px",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  Hora
                </p>
                <TextField
                  name="nombre"
                  size="small"
                  id="outlined-start-adornment"
                  value={citamos.hora_reg || ""}
                  InputLabelProps={{
                    classes: {
                      focused: "my-custom-focus-label",
                    },
                  }}
                  InputProps={{
                    classes: {
                      focused: "my-custom-focus-class",
                    },
                  }}
                  sx={{
                    width: "80%",
                  }}
                  focused
                />
              </div>
              <div style={{ width: "50%" }}>
                <p
                  style={{
                    margin: 0,
                    marginBottom: "15px",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  Tipo de cita
                </p>
                <TextField
                  name="nombre"
                  //label="Tipo de cita"
                  id="outlined-start-adornment"
                  size="small"
                  value={citamos.tipo_cita || ""}
                  InputLabelProps={{
                    classes: {
                      focused: "my-custom-focus-label",
                    },
                  }}
                  InputProps={{
                    classes: {
                      focused: "my-custom-focus-class",
                    },
                  }}
                  sx={{
                    width: "80%",
                  }}
                />
              </div>
            </Box>
          </div>

          <div
            style={{
              width: "45%",
            }}
          >
            <div style={{ width: "100%" }}>
              <p
                style={{
                  margin: 0,
                  marginBottom: "15px",
                  marginTop: "15px",
                  fontSize: "14px",
                }}
              >
                Atendido por
              </p>
              <TextField
                name="nombre"
                //label="Tipo de cita"
                id="outlined-start-adornment"
                size="small"
                value={citamos.nombre_medico || ""}
                InputLabelProps={{
                  classes: {
                    focused: "my-custom-focus-label",
                  },
                }}
                InputProps={{
                  classes: {
                    focused: "my-custom-focus-class",
                  },
                }}
                sx={{
                  width: "80%",
                }}
              />
            </div>
            <div style={{ width: "100%" }}>
              <p
                style={{
                  margin: 0,
                  marginBottom: "15px",
                  marginTop: "15px",
                  fontSize: "14px",
                }}
              >
                Motivo de consulta
              </p>
              <TextField
                name="motivo_consulta"
                value={citamos.motivo_consulta || ""}
                size="small"
                id="outlined-start-adornment"
                multiline
                rows={2}
                InputLabelProps={{
                  classes: {
                    focused: "my-custom-focus-label",
                  },
                }}
                InputProps={{
                  classes: {
                    focused: "my-custom-focus-class",
                  },
                }}
                sx={{ width: "80%" }}
              />
            </div>
            <div
              style={{
                height: "62px",
                width: "80%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setOpenPopup(false)}
                sx={{
                  width: "35%",
                  borderColor: "bioimedical.blue",
                  border: 2,
                  color: "biomedical.blue",

                  backgroundColor: "biomedical.white",
                  fontSize: "14px",
                  margin: 0,
                  ":hover": {
                    border: 2,
                    borderColor: "biomedical2.blue",
                  },
                }}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default ListadoCitas;
