import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom";
import Top from "./Top";
import BarraLateral from "./BarraLateral";
import { useAppContext } from "../context/ContextProvider";

export const ProtectedRoute = () => {
  
  const {  getUsuarioinfo } = useAppContext();
  const [usuario, setUsuario] = useState({});
 
  useEffect(() => {
    const getuserinfo = async () => {
     const uinfo= await getUsuarioinfo();
     setUsuario(uinfo.data)
     //console.log(uinfo, "informacion del usuario traida del back")
    };
    getuserinfo();
   
  },[]);
 
 // console.log( usuario.usuario_id,  "usuario desde el protected route");
  return (
    <div>
      
      <BarraLateral user={usuario.nombre_completo}></BarraLateral>
      <Outlet />
    </div>
  );
};
