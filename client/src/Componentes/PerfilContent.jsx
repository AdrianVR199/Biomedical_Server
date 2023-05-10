import "../styles/Perfil.css";
import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";
import {
  Box,
  TextField,
  Button
} from "@mui/material";
import Popup from "./Popup";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextProvider";
import imgprofile from '../assets/Recurso 1@4x-100.jpg'

function PerfilContent() {
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup1, setOpenPopup1] = useState(false);
  const navigate = useNavigate();
  const [usuariohist, setUsuariohist] = useState("");
  const { getUsuarioinfo, getUsuarioinfoFull,getHistorial } = useAppContext();
  const [usuario, setUsuario] = useState("");

  useEffect(() => {
    const getuserinfo = async () => {
      const uinfo = await getUsuarioinfo();
      setUsuario(uinfo.data);
      const uinfo2 = await getHistorial(uinfo.data.usuario_id);
      setUsuariohist(uinfo2);
      console.log(uinfo.data,uinfo.data.usuaio_id, uinfo2,"info normi");
      //console.log(uinfo, "informacion del usuario traida del back")
      // const uinfo1 = await getUsuarioinfoFull(uinfo.data.usuaio_id);
      // setUsuario(uinfo1.data);
      // console.log(uinfo1.data, "info full");
    };
    getuserinfo();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <div className="P-form-head">
        <div style={{ width: "12%" }}>
          <img
            className="P-img-perfil"
            src={imgprofile}
            alt=""
          />
        </div>
        <div style={{ width: "68%" }}>
          <h1 style={{ fontSize: "20px" }}>Detalles de mi perfil</h1>
          <p style={{ fontSize: "16px" }}>
            En este apartado puedes observar tus datos personales y
            actualizarlos en cualquier momento.
          </p>
        </div>
        <div
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          {/* <Button
            variant="contained"
            onClick={() => setOpenPopup1(true)}
            form="form-registro-p"
            sx={{
              height: "50%",
              width: "60%",
              color: "biomedical.white",
              backgroundColor: "biomedical.blue",
              fontSize: "14px",
              margin: 0,

              ":hover": {
                bgcolor: "biomedical3.blue", // theme.palette.primary.main
                color: "white",
              },
            }}
          >
            Eliminar perfil
          </Button> */}
        </div>
      </div>
      <div className="P-titulos-reg">
        <p>Datos basicos</p>
        <p>Datos de nacimiento y residencia</p>
        <p>Datos de contacto</p>
      </div>
      <div className="P-form-reg ">
        <Formik
          initialValues={{
            nombre: "",
            correo: "",
            tipo_id: "",
            num_id: "",
            fecha_nac: "",
            genero: "",
            nacionalidad: "",
            pais_nac: "",
            departamento_nac: "",
            ciudad_nac: "",
            pais_res: "",
            departamento_res: "",
            ciudad_res: "",
            direccion: "",
            movil: "",
            fijo: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit} id="P-form-registro-p">
              <div className="P-reg-input-bfield P-bfield-n">
                <Box sx={{ display: "flex", flexWrap: "wrap", height: "100%" }}>
                  <div>
                    <TextField
                      disabled
                      name="nombre"
                      label="nombre completo"
                      id="outlined-start-adornment"
                      value={usuario.nombre_completo || ""}
                      onChange={handleChange}
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
                        m: 0,
                        marginTop: "11%",
                        marginLeft: "2%",
                        width: "90%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      disabled
                      label="correo electronico"
                      name="correo"
                      id="outlined-start-adornment"
                      onChange={handleChange}
                      value={usuario.correo || ""}
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
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "90%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Tipo id"
                      disabled
                      name="tipo_id"
                      id="outlined-start-adornment"
                      onChange={handleChange}
                      value={usuario.tipo_identificacion || ""}
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
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "25%",
                        height: "15%",
                      }}
                      focused
                    />

                    <TextField
                      label="Número identificación"
                      disabled
                      name="num_id"
                      id="outlined-start-adornment"
                      onChange={handleChange}
                      value={usuario.num_identificacion || ""}
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
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      variant="outlined"
                      focused
                    />

                    <TextField
                      label="Fecha de nacimiento"
                      disabled
                      id="outlined-start-adornment"
                      name="fecha_nac"
                      onChange={handleChange}
                      value={usuario.fecha_nacimiento || ""}
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
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "43%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Género"
                      name="genero"
                      disabled
                      id="outlined-start-adornment"
                      onChange={handleChange}
                      value={usuario.genero || ""}
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
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "43%",
                        height: "15%",
                      }}
                      focused
                    />
                  </div>
                </Box>
              </div>
              <div className="P-bfield2 P-reg-input-bfield P-bfield-n ">
                <Box sx={{ display: "flex", flexWrap: "wrap", height: "100%" }}>
                  <div>
                    <TextField
                      label="Nacionalidad"
                      disabled
                      id="outlined-start-adornment"
                      value={usuario.nacionalidad || ""}
                      onChange={handleChange}
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
                      name="nacionalidad"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="País de nacimiento"
                      disabled
                      onChange={handleChange}
                      value={usuario.pais_nac || ""}
                      id="outlined-start-adornment"
                      InputLabelProps={{
                        classes: {
                          focused: "my-custom-focus-label",
                        },
                      }}
                      name="pais_nac"
                      InputProps={{
                        classes: {
                          focused: "my-custom-focus-class",
                        },
                      }}
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        color: "neutral",
                        height: "15%",
                        borderColor: "biomedical.green",
                      }}
                      focused
                    />
                    <TextField
                      label="Departamento de nacimiento"
                      disabled
                      onChange={handleChange}
                      value={usuario.dep_nac || ""}
                      id="outlined-start-adornment"
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
                      name="departamento_nac"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Ciudad de nacimiento"
                      disabled
                      onChange={handleChange}
                      value={usuario.ciudad_nac || ""}
                      id="outlined-start-adornment"
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
                      name="ciudad_nac"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="País de residencia"
                      disabled
                      onChange={handleChange}
                      value={usuario.pais_res || ""}
                      id="outlined-start-adornment"
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
                      name="pais_res"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Departamento de residencia"
                      disabled
                      onChange={handleChange}
                      value={usuario.depa_res || ""}
                      id="outlined-start-adornment"
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
                      name="departamento_res"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Ciudad de residencia"
                      disabled
                      onChange={handleChange}
                      value={usuario.ciudad_res || ""}
                      id="outlined-start-adornment"
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
                      name="ciudad_res"
                      sx={{
                        m: 0,
                        marginTop: "8%",
                        marginLeft: "2%",
                        width: "45%",
                        height: "15%",
                      }}
                      focused
                    />
                  </div>
                </Box>
              </div>
              <div className="P-reg-input-bfield">
                <Box sx={{ display: "flex", flexWrap: "wrap", height: "100%" }}>
                  <div>
                    <TextField
                      label="Direccion de residencia"
                      disabled
                      onChange={handleChange}
                      value={usuario.direccion || ""}
                      id="outlined-start-adornment"
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
                      name="direccion"
                      sx={{
                        m: 0,
                        marginTop: "12%",
                        marginLeft: "2%",
                        width: "85%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Teléfono móvil"
                      disabled
                      onChange={handleChange}
                      value={usuario.num_tel_celular || ""}
                      id="outlined-start-adornment"
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
                      name="movil"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "85%",
                        height: "15%",
                      }}
                      focused
                    />
                    <TextField
                      label="Teléfono fíjo"
                      disabled
                      onChange={handleChange}
                      value={usuario.num_tel_fijo || ""}
                      id="outlined-start-adornment"
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
                      name="fijo"
                      sx={{
                        m: 0,
                        marginTop: "10%",
                        marginLeft: "2%",
                        width: "85%",
                        height: "15%",
                      }}
                      focused
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        marginTop: "10%",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => setOpenPopup(true)}
                        sx={{
                          width: "45%",
                          color: "biomedical.white",
                          backgroundColor: "biomedical.blue",
                          fontSize: "14px",
                          margin: 0,

                          ":hover": {
                            bgcolor: "biomedical3.blue", // theme.palette.primary.main
                            color: "white",
                          },
                        }}
                      >
                        Historial clinico
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => navigate("/editarpaciente/perfil")}
                        sx={{
                          width: "45%",
                          color: "biomedical.white",
                          backgroundColor: "biomedical.blue",
                          fontSize: "14px",
                          margin: 0,

                          ":hover": {
                            bgcolor: "biomedical3.blue", // theme.palette.primary.main
                            color: "white",
                          },
                        }}
                      >
                        Editar perfil
                      </Button>
                    </div>

                    <Popup
                      openPopup={openPopup}
                      setOpenPopup={setOpenPopup}
                      width="md"
                      titulo="Historial clinico"
                    >
                      <div className="pop-div1">
                        <div>
                          {" "}
                          <p>Actualizado en: {usuariohist.fecha_reg_hist}</p>
                        </div>
                        <div>
                          {" "}
                          <p>Por: {usuariohist.nombre_medico} </p>
                        </div>
                      </div>
                      <div className="pop-div2">
                        <TextField
                          name="nombre"
                          size="small"
                          id="outlined-start-adornment"
                          // disabled

                          value={usuariohist.descripcion || ""}
                          multiline
                          rows={12}
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
                          sx={{ width: "100%" }}
                        />
                      </div>
                      <div className="botones-popup-reg">
                        <Button
                          variant="contained"
                          onClick={() => setOpenPopup(false)}
                          sx={{
                            width: "20%",
                            color: "biomedical.white",
                            backgroundColor: "biomedical.blue",
                            fontSize: "14px",
                            margin: 0,
                            ":hover": {
                              bgcolor: "biomedical3.blue", // theme.palette.primary.main
                              color: "white",
                            },
                          }}
                        >
                          Cerrar historial
                        </Button>
                        {/* <Button
                          variant="contained"
                          type="submit"
                          form="form-registro-p"
                          onClick={() => setOpenPopup1(false)}
                          sx={{
                            width: "20%",
                            color: "biomedical.white",
                            backgroundColor: "biomedical.blue",
                            fontSize: "14px",
                            margin: 0,

                            ":hover": {
                              bgcolor: "biomedical3.blue", // theme.palette.primary.main
                              color: "white",
                            },
                          }}
                        >
                          Confirmar
                        </Button> */}
                      </div>
                    </Popup>
                    <Popup
                      openPopup={openPopup1}
                      setOpenPopup={setOpenPopup1}
                      width="sm"
                      titulo="Eliminar perfil personal permanentemente"
                    >
                      <div className="pop-div1">
                        ¿Estas seguro de que quieres eliminar tu cuenta?
                      </div>
                      <div className="pop-div2">
                        Ya no podras ingresar a tu espacio para agendamiento de
                        citas pero tus datos seran guardados en caso de que sea
                        necesario consultar tu actividad en Biomedical Group en
                        un futuro.
                      </div>
                      <div className="botones-popup-reg">
                        <Button
                          variant="outlined"
                          onClick={() => setOpenPopup1(false)}
                          sx={{
                            width: "20%",
                            border: 2,
                            color: "biomedical.blue",
                            backgroundColor: "biomedical.white",
                            borderColor: "bioimedical.blue",
                            fontSize: "14px",
                            margin: 0,
                            ":hover": {
                              border: 2,
                              borderColor: "biomedical2.blue",
                            },
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="contained"
                          type="submit"
                          form="form-registro-p"
                          sx={{
                            width: "20%",
                            color: "biomedical.white",
                            backgroundColor: "biomedical.blue",
                            fontSize: "14px",
                            margin: 0,

                            ":hover": {
                              bgcolor: "biomedical3.blue", // theme.palette.primary.main
                              color: "white",
                            },
                          }}
                        >
                          Confirmar
                        </Button>
                      </div>
                    </Popup>
                  </div>
                </Box>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PerfilContent;
