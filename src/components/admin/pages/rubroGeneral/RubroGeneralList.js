import React, { useCallback, useEffect } from 'react';
import "./articuloList.css";
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';
import { deleteRubro, getRubroGeneral } from '../../../../actions/rubrogeneral';


const RubroGeneralList = () => {
  const [rubros, setRubros] = useState([]);

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await dispatch(deleteRubro(id))
    setRubros(await dispatch(getRubroGeneral()))
  };


  const columns = [
    { field: "id", headerName: "ID", width: 95 },
    { field: "denominacion", headerName: "Denominacion", width: 180 },
    { field: "fechaBaja", headerName: "Fecha de baja", width: 180 },
    {
      field: "action",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"" + params.row.id}>
              <button className="userListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getRubroGeneral()).then(setRubros)
  }, []);

  return (
    <div className="userList">
      <Link to="../newRubroGeneral">
        <button className="productAddButton">Crear Rubro</button>
      </Link>
      <DataGrid
        rows={rubros}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
      />
    </div>
  )
}

export default RubroGeneralList