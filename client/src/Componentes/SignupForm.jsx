import React, { useState } from "react";
import { Formik, Form } from "formik";
import "../styles/Signup.css";
import Logo_vert from "../assets/Logo vertical.png";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Checkbox,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import * as Yup from "yup";
import { useAppContext } from "../context/ContextProvider";
import Popup from "../Componentes/Popup";

function SignupForm() {
  const { getCorreos } = useAppContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [openPopup, setOpenPopup] = useState(false); //estado del popup actualizar cita

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const SignupSchema = Yup.object().shape({
    correo: Yup.string()
      .email("Ingrese un correo electrónico válido")
      .required("Ingrese un correo electrónico"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es requerida"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Debe confirmar la contraseña"),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      "Debe aceptar los términos y condiciones"
    ),
  });
  return (
    <div className="Sign-up-bod">
      <div className="Sign-up-form">
        <div className="Sign-up-lado-izq">
          <img
            style={{ width: "65%", height: "auto" }}
            src={Logo_vert}
            alt=""
          />
        </div>
        <div className="Sign-up-lado-der">
          <div
            style={{ width: "80%", height: "auto" }}
            className="Sign-up-form-titulo"
          >
            <h1 style={{ fontSize: "18px", textAlign: "center" }}>
              Registrate
            </h1>
            <p style={{ fontSize: "14px" }}>Ingresa con tu correo </p>
          </div>
          <div
            style={{ width: "80%", height: "auto" }}
            className="Sign-up-inputs-log"
          >
            <Formik
              initialValues={{
                correo: "",
                password: "",
                confirmPassword: "",
                acceptTerms: false,
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values) => {
                console.log(values);
                try {
                  const response = await getCorreos({ correo: values.correo });
                  console.log(response.data.message, values.correo);
                  if (response.data.message === "sigue") {
                    navigate("/registro", {
                      state: {
                        correo: values.correo,
                        contraseña: values.confirmPassword,
                      },
                    });
                    //console.log(response.data.id_tipo_usuario, "paciente");
                  } else if (response.data.message === "ocupado") {
                    //navigate("/calendario");
                    console.log(response.data.id_tipo_usuario, "medico");
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {({
                handleChange,
                handleSubmit,
                handleBlur,
                touched,
                errors,
                values,
              }) => (
                <Form
                  className="Sign-up-formulario-log"
                  onSubmit={handleSubmit}
                >
                  <div className="sign-in-input-group">
                    <TextField
                      className="SU-standard-basic"
                      name="correo"
                      onChange={handleChange}
                      label="Correo electronico"
                      variant="standard"
                      InputLabelProps={{
                        classes: {
                          focused: "focused-correo-la",
                        },
                      }}
                      sx={{
                        mb: "10px",
                        width: 1,
                      }}
                      onBlur={handleBlur}
                      error={touched.correo && Boolean(errors.correo)}
                      helperText={touched.correo && errors.correo}
                    />
                    <FormControl
                      sx={{ m: 0, width: "100%" }}
                      variant="standard"
                      className="SU-input-passs"
                    >
                      <InputLabel
                        className="SU-input-pass-il"
                        htmlFor="password"
                      >
                        Contraseña
                      </InputLabel>
                      <Input
                        onChange={handleChange}
                        name="password"
                        type={showPassword1 ? "text" : "password"}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        className={
                          touched.password && errors.password ? "error" : null
                        }
                        aria-invalid={errors.password ? "true" : "false"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword1}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword1 ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        sx={{
                          borderColor: "biomedical.blue",
                          mb: "10px",
                        }}
                      />
                      {touched.password && errors.password ? (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#d32f2f",
                            marginTop: "2px",
                          }}
                        >
                          {errors.password}
                        </div>
                      ) : null}
                    </FormControl>
                    <FormControl
                      sx={{ m: 0, width: "100%" }}
                      variant="standard"
                      className="SU-input-passs"
                    >
                      <InputLabel
                        className="SU-input-pass-il"
                        htmlFor="password"
                      >
                        Confirmar contraseña
                      </InputLabel>
                      <Input
                        onChange={handleChange}
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        onBlur={handleBlur}
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        className={
                          touched.confirmPassword && errors.confirmPassword
                            ? "error"
                            : null
                        }
                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        sx={{
                          borderColor: "biomedical.blue",
                          mb: "5px",
                        }}
                      />
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#d32f2f",
                            marginTop: "2px",
                          }}
                        >
                          {errors.confirmPassword}
                        </div>
                      ) : null}
                    </FormControl>
                  </div>
                  <div className="sign-up-red">
                    <div>
                      <Checkbox
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={values.acceptTerms}
                        onChange={handleChange}
                        sx={{
                          fontSize: "14px",
                        }}
                      />
                      <label htmlFor="acceptTerms">
                        Acepto los{" "}
                        <span
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => setOpenPopup(true)}
                        >
                          términos y condiciones
                        </span>
                      </label>
                      {/* <p style={{  fontSize:"14px", cursor:"pointer", textDecoration: }} onClick={()=>setOpenPopup(true)}> Mostrar términos y condiciones</p> */}
                      {errors.acceptTerms && (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#d32f2f",
                            marginTop: "2px",
                          }}
                        >
                          {errors.acceptTerms}
                        </div>
                      )}
                    </div>

                    <Button
                      variant="contained"
                      type="submit"
                      //onClick={() => navigate("/registro")}
                      sx={{
                        width: 1,
                        marginTop: "35px",
                        color: "biomedical.white",
                        backgroundColor: "biomedical.blue",
                        fontSize: "14px",
                        ":hover": {
                          bgcolor: "biomedical3.blue", // theme.palette.primary.main
                          color: "white",
                        },
                      }}
                    >
                      Registrate
                    </Button>
                  </div>
                  <Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    width="sm"
                   
                    titulo="Terminos y condiciones "
                  >
                    <div className="pop-div2">
                      <DialogContent dividers  scroll="paper">
                        <DialogContentText >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Vestibulum rutrum consequat mi vel imperdiet.
                          Duis vitae ligula a mauris lacinia interdum. Integer
                          id orci sed elit congue sollicitudin vel at lorem.
                          Nullam feugiat, sapien sed consectetur varius, nunc
                          purus bibendum nisi, in fringilla justo elit at leo.
                          Ut at dolor scelerisque, sagittis arcu sit amet,
                          bibendum massa. Aliquam id ligula suscipit, convallis
                          odio eu, lobortis tortor. Donec semper faucibus
                          convallis. Fusce dignissim eget mauris in lacinia.
                          Phasellus lacinia dolor quis lectus sagittis, sed
                          tristique velit pellentesque. In hac habitasse platea
                          dictumst. Aenean sed pretium lectus. Etiam sed
                          tristique enim, vel venenatis risus. In in metus
                          risus. Fusce suscipit augue eu congue iaculis. Ut
                          tristique magna nec massa finibus, in bibendum diam
                          auctor. Pellentesque habitant morbi tristique senectus
                          et netus et malesuada fames ac turpis egestas. Nunc
                          bibendum est quis est suscipit, sit amet elementum
                          eros consectetur. Mauris interdum lacus non augue
                          dictum, non fringilla tellus maximus. Sed placerat,
                          sapien vel commodo vulputate, nibh quam tristique
                          enim, vel dapibus mi dolor sit amet nisl. Vivamus sit
                          amet enim semper, commodo velit id, vehicula risus.
                          Nullam a ante suscipit, dapibus nibh a, tincidunt
                          orci. Proin feugiat, nibh id congue sollicitudin,
                          justo sapien ultrices elit, ut consectetur augue felis
                          vitae ex. Curabitur lobortis ut magna sed mollis.
                          Vestibulum ante ipsum primis in faucibus orci luctus
                          et ultrices posuere cubilia Curae; Ut non dolor justo.
                          Nulla viverra, ipsum at molestie malesuada, mauris
                          massa euismod mauris, nec malesuada sapien nunc eget
                          est. Sed vel turpis sed justo pulvinar ultricies. Sed
                          varius ullamcorper gravida.
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Vestibulum rutrum consequat mi vel imperdiet.
                          Duis vitae ligula a mauris lacinia interdum. Integer
                          id orci sed elit congue sollicitudin vel at lorem.
                          Nullam feugiat, sapien sed consectetur varius, nunc
                          purus bibendum nisi, in fringilla justo elit at leo.
                          Ut at dolor scelerisque, sagittis arcu sit amet,
                          bibendum massa. Aliquam id ligula suscipit, convallis
                          odio eu, lobortis tortor. Donec semper faucibus
                          convallis. Fusce dignissim eget mauris in lacinia.
                          Phasellus lacinia dolor quis lectus sagittis, sed
                          tristique velit pellentesque. In hac habitasse platea
                          dictumst. Aenean sed pretium lectus. Etiam sed
                          tristique enim, vel venenatis risus. In in metus
                          risus. Fusce suscipit augue eu congue iaculis. Ut
                          tristique magna nec massa finibus, in bibendum diam
                          auctor. Pellentesque habitant morbi tristique senectus
                          et netus et malesuada fames ac turpis egestas. Nunc
                          bibendum est quis est suscipit, sit amet elementum
                          eros consectetur. Mauris interdum lacus non augue
                          dictum, non fringilla tellus maximus. Sed placerat,
                          sapien vel commodo vulputate, nibh quam tristique
                          enim, vel dapibus mi dolor sit amet nisl. Vivamus sit
                          amet enim semper, commodo velit id, vehicula risus.
                          Nullam a ante suscipit, dapibus nibh a, tincidunt
                          orci. Proin feugiat, nibh id congue sollicitudin,
                          justo sapien ultrices elit, ut consectetur augue felis
                          vitae ex. Curabitur lobortis ut magna sed mollis.
                          Vestibulum ante ipsum primis in faucibus orci luctus
                          et ultrices posuere cubilia Curae; Ut non dolor justo.
                          Nulla viverra, ipsum at molestie malesuada, mauris
                          massa euismod mauris, nec malesuada sapien nunc eget
                          est. Sed vel turpis sed justo pulvinar ultricies. Sed
                          varius ullamcorper gravida.
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Vestibulum rutrum consequat mi vel imperdiet.
                          Duis vitae ligula a mauris lacinia interdum. Integer
                          id orci sed elit congue sollicitudin vel at lorem.
                          Nullam feugiat, sapien sed consectetur varius, nunc
                          purus bibendum nisi, in fringilla justo elit at leo.
                          Ut at dolor scelerisque, sagittis arcu sit amet,
                          bibendum massa. Aliquam id ligula suscipit, convallis
                          odio eu, lobortis tortor. Donec semper faucibus
                          convallis. Fusce dignissim eget mauris in lacinia.
                          Phasellus lacinia dolor quis lectus sagittis, sed
                          tristique velit pellentesque. In hac habitasse platea
                          dictumst. Aenean sed pretium lectus. Etiam sed
                          tristique enim, vel venenatis risus. In in metus
                          risus. Fusce suscipit augue eu congue iaculis. Ut
                          tristique magna nec massa finibus, in bibendum diam
                          auctor. Pellentesque habitant morbi tristique senectus
                          et netus et malesuada fames ac turpis egestas. Nunc
                          bibendum est quis est suscipit, sit amet elementum
                          eros consectetur. Mauris interdum lacus non augue
                          dictum, non fringilla tellus maximus. Sed placerat,
                          sapien vel commodo vulputate, nibh quam tristique
                          enim, vel dapibus mi dolor sit amet nisl. Vivamus sit
                          amet enim semper, commodo velit id, vehicula risus.
                          Nullam a ante suscipit, dapibus nibh a, tincidunt
                          orci. Proin feugiat, nibh id congue sollicitudin,
                          justo sapien ultrices elit, ut consectetur augue felis
                          vitae ex. Curabitur lobortis ut magna sed mollis.
                          Vestibulum ante ipsum primis in faucibus orci luctus
                          et ultrices posuere cubilia Curae; Ut non dolor justo.
                          Nulla viverra, ipsum at molestie malesuada, mauris
                          massa euismod mauris, nec malesuada sapien nunc eget
                          est. Sed vel turpis sed justo pulvinar ultricies. Sed
                          varius ullamcorper gravida.
                        </DialogContentText>
                      </DialogContent>
                    </div>
                    <div className="botones-popup-reg">
                      <Button
                        variant="contained"
                        onClick={() => setOpenPopup(false)}
                        sx={{
                          width: "70%",
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
                        Acepto los terminos y condiciones
                      </Button>
                    </div>
                  </Popup>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
