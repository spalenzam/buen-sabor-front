import React, { useCallback, useEffect } from 'react';
import "./articuloList.css";
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';
import { deleteRubroArticulo, getRubroArticulo } from '../../../../actions/rubroarticulo';

const RubroArticuloList = () => {
  const [rubros, setRubros] = useState([]);

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await dispatch(deleteRubroArticulo(id))
    setRubros(await dispatch(getRubroArticulo()))
  };


  const columns = [
    { field: "id", headerName: "ID", width: 95 },
    { field: "denominacion", headerName: "Denominacion", width: 180 },
    {
      field: "rubroarticuloPadre",
      headerName: "Rubro Padre",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.rubroarticuloPadre?.denominacion}
          </div>
        );
      },
    },
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
    dispatch(getRubroArticulo()).then(setRubros)
  }, []);

  return (
    <div className="userList">
      <Link to="../newRubroArticulo">
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

export default RubroArticuloList