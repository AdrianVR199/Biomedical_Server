import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";
import logoBiomedical from "../assets/Logo_orizontal.png";
import { Button } from "@mui/material";
import {
  ExitToApp,
  HomeOutlined,
  PersonOutlineOutlined,
  TextSnippetOutlined,
  PendingActionsOutlined,
} from "@mui/icons-material";
import { useAppContext } from "../context/ContextProvider";
import imgprofile from '../assets/Recurso 1@4x-100.jpg'
function BarraLateral({ user }) {
  const { cerrarSesion } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="barra-lateral">
      <div style={{ paddingTop: "5%" }} className="barra-lat-info">
        <div className="top">
          <img
            style={{ width: "65%", height: "auto" }}
            src={logoBiomedical}
            alt=""
          />
          <div className="perfil-head">
            <img
              className="img-perfil"
              onClick={() => navigate("/paciente/perfil")}
              style={{ cursor: "pointer" }}
              src={imgprofile}
              alt=""
            />
            <div className="perfil-info">
              <p
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/paciente/perfil")}
              >
                {user}
              </p>
              <p>Paciente</p>
            </div>
          </div>
        </div>

        <div className="linksP">
          <ul>
            <li>
              <Button
                className="Menu-boton"
                size="big"
                variant="text"
                startIcon={
                  <HomeOutlined
                  sx={{
                    fontSize: "25px",
                  }}
                  />
                }
                onClick={() => navigate("/inicio")}
                sx={{
                  width: 1,
                  color: "text.secondary",
                  justifyContent: "flex-start",
                  pl: "25px",
                  fontSize: "16px",
                }}
              >
                Inicio
              </Button>
            </li>
            <li>
              <Button
                className="Menu-boton"
                variant="text"
                size="big"
                startIcon={<TextSnippetOutlined sx={{
                  fontSize: "25px",
                }} />}
                onClick={() => navigate("/formcitas")}
                sx={{
                  width: 1,
                  color: "text.secondary",
                  justifyContent: "flex-start",
                  pl: "25px",
                  fontSize: "16px",
                  height: "40px",
                }}
              >
                Agendar Cita
              </Button>
            </li>
            <li>
              <Button
                className="Menu-boton"
                variant="text"
                size="big"
                startIcon={<PendingActionsOutlined sx={{
                  fontSize: "25px",
                }} />}
                onClick={() => navigate("/citas")}
                sx={{
                  width: 1,
                  color: "text.secondary",
                  justifyContent: "flex-start",
                  pl: "25px",
                  fontSize: "16px",
                  height: "40px",
                }}
              >
                Historial de Citas
              </Button>
            </li>
            <li>
              <Button
                className="Menu-boton"
                variant="text"
                size="big"
                startIcon={<PersonOutlineOutlined sx={{
                  fontSize: "25px",
                }} />}
                onClick={() => navigate("/paciente/perfil")}
                sx={{
                  width: 1,
                  color: "text.secondary",
                  justifyContent: "flex-start",
                  pl: "25px",
                  fontSize: "16px",
                  height: "40px",
                }}
              >
                Perfil
              </Button>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ paddingBottom: "5%" }} className="exit">
        <Button
          variant="text"
          className="Menu-boton"
          size="big"
          startIcon={<ExitToApp sx={{
            fontSize: "25px",
          }} />}
          onClick={async () => await cerrarSesion()}
          sx={{
            width: 1,
            color: "text.secondary",
            justifyContent: "flex-start",
            pl: "15px",
            fontSize: "16px",
            height: "40px",
          }}
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}

export default BarraLateral;
