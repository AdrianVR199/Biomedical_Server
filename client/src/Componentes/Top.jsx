import React from "react";
import "../styles/top.css";
import { HomeOutlined,PeopleOutline,PersonOutlineOutlined,PendingActionsOutlined,TextSnippetOutlined, TextsmsOutlined } from "@mui/icons-material";

function Top({icon,name}) {
  return (
    <div className="top-body">
      <div className="top-body-info">
        {/* <HomeOutlined
          variant="homeb"
          sx={{
            pl: "15px",
            fontSize: "30px",
            color: "biomedical.white",
          }}
        ></HomeOutlined> */}
         {/* {icon === 'HomeOutlined' ? <HomeOutlined sx={{
            pl: "15px",
            fontSize: "30px",
            color: "biomedical.white",
          }}/> : <HomeOutlined />} */}
         {icon && icon === 'HomeOutlined' && <HomeOutlined sx={{
            pl: "15px",
            fontSize: "30px",
            color: "biomedical.white",
          }}/>}
           {icon && icon === 'PeopleOutline' && <PeopleOutline sx={{
            pl: "15px",
            fontSize: "30px",
            color: "biomedical.white",
          }}/>}
           {icon && icon === 'PersonOutlineOutlined' && <PersonOutlineOutlined sx={{
            pl: "15px",
            fontSize: "30px",
            color: "biomedical.white",
          }}/>}
           {icon && icon === 'PendingActionsOutlined' && <PendingActionsOutlined sx={{
            pl: "15px",
            fontSize: "30px",
            color: "biomedical.white",
          }}/>}
          {icon && icon === 'TextSnippetOutlined' && <TextSnippetOutlined sx={{
            pl: "15px",
            fontSize: "30px",
            color: "biomedical.white",
          }}/>}
        <p>{name}</p>
      </div>
    </div>
  );
}

export default Top;
