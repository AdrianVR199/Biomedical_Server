import React from "react";
import { useEffect,useState } from "react";
import CitaCard from "../Componentes/CitaCard";
import { Box, Grid } from "@mui/material";
import "../styles/Inicio.css";
import { useAppContext } from "../context/ContextProvider";
import Top from '../Componentes/Top'
function Inicio() {
  const {Citas, getCitas}=useAppContext();
  const [listcitas, setlistcitas] = useState([]);
  useEffect(() => {
    const getlistCitas= async()=>{

      const contentlist= await getCitas();
      console.log(contentlist, "contenido lista")
      setlistcitas(contentlist)
    }
    getlistCitas();
  }, []);
  //console.log(Citas, "citas en el inicio")
  // function renderMain() {
  //   if (listcitas.length === 0) return <h1>nadamono</h1>;
  //   return listcitas.map((cita) => <CitaCard cita={cita} key={cita.cita_id} /> );
  // }
  function renderMain() {
    const now = new Date();
    const citasFiltradas = listcitas.filter(cita => {
      if (!cita.fecha_reg) return false; // descarta las citas sin fecha_reg
      const fechaCita = new Date(cita.fecha_reg);
      return fechaCita.getTime() > now.getTime(); // devuelve true si la fecha de la cita es posterior a la fecha actual
    });
  
    if (citasFiltradas.length === 0) return <h1>nadamono</h1>;
    return citasFiltradas.map((cita) => <CitaCard cita={cita} key={cita.cita_id} />);
  }
  return (
    <div className="inicio-body">
            <Top icon={"HomeOutlined"} name={"Inicio"}></Top>
      <div className="inicio-container">
        <div className="inicio-container-info">
          <div
            style={{
              width: "90%",
              height: "10%",
              display: "flex",
              alignItems: "center",
              marginLeft: "5%",
              fontSize: "18px",
            }}
          >
              Citas pendientes
          </div>
          <div style={{ width: "95%", height: "90%", marginLeft: "4%" }}>
            <Grid container spacing={2} rowSpacing={1}>
            {renderMain()}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
