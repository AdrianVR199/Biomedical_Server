import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { PersonSearch } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../context/ContextProvider";

function ListadoPacientes() {
  const { getUsuarios } = useAppContext();
  const [listPacientes, setlistPacientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getlistPacientes = async () => {
      const contentlist = await getUsuarios();

      setlistPacientes(contentlist);
    };
    getlistPacientes();
  }, []);

  const rows1 = listPacientes.map((item) => ({
    id: item.usuario_id,
    col1: item.nombre_completo,
    col2: item.num_identificacion,
    col3: item.num_tel_celular,
    col4: item.correo,
  }));


  const handleButtonClick = (params, list) => {
    const rowData = params.row;
    const objetoEncontrado = list.find(
      (objeto) => objeto.usuario_id === rowData.id
    );
    if (objetoEncontrado) {
    

      navigate(`/paciente/${objetoEncontrado.usuario_id}`);
    }
  };

  const columns = [
    {
      field: "col1",
      headerName: "Nombre",
      width: 280,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "col2",
      headerName: "Documento",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "col3",
      headerName: "Teléfono móvil",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "col4",
      headerName: "Correo electrónico",
      width: 270,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "col5",
      align: "center",
      headerName: "Ver paciente",
      width: 90,
      renderCell: (params) => (
        <PersonSearch
          style={{ cursor: "pointer" }}
          backgroundcolor="biomedical.green"
          onClick={() => handleButtonClick(params, listPacientes)}
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
      />
    </div>
  );
}

export default ListadoPacientes;
