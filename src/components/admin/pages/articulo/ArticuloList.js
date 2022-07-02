import React, { useCallback, useEffect } from 'react';
import "./articuloList.css";
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { deleteArticulo, getArticuloInsumo } from '../../../../actions/articulos';
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';

const ArticuloList = () => {

  const [articulos, setArticulos] = useState([]);

  const dispatch = useDispatch();

  const fetchArticulos = useCallback(async () => {
    setArticulos(await dispatch(getArticuloInsumo()))
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteArticulo(id))
    setArticulos(await dispatch(getArticuloInsumo()))
  };

  useEffect(() => {
    fetchArticulos();
  }, [fetchArticulos]);

  const columns = [
    { field: "id", headerName: "ID", width: 95 },
    { field: "denominacion", headerName: "Denominacion", width: 180 },
    { field: "unidadMedida", headerName: "Unidad de medida", width: 150 },
    { field: "precioCompra", headerName: "$ compra", width: 140 },
    { field: "precioVenta", headerName: "$ venta", width: 130 },
    { field: "stockActual", headerName: "Stock actual", width: 150 },
    { field: "stockMinimo", headerName: "Stock mínimo", width: 150 },
    { field: "esInsumo", headerName: "Es insumo", width: 150 },
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

  return (
    <div className="userList">
      <Link to="../newarticulo">
        <button className="productAddButton">Crear artículo</button>
      </Link>
      <DataGrid
        rows={articulos}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
      />
    </div>
  )
}

export default ArticuloList