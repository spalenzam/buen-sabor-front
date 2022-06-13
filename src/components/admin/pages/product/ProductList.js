import React, { useEffect } from 'react';
import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { deleteProducto, getProductosSinCantidad } from '../../../../actions/productos';

const ProductList = () => {
  //Estado donde guardamos los productos
  const [productos, setProductos] = useState([]);

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await dispatch(deleteProducto(id))
    setProductos(await dispatch(getProductosSinCantidad()))
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "product",
      headerName: "Producto",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={`http://localhost:8090/api/buensabor/articulosmanufacturados/uploads/img/${params.row.id}`} alt="" />
            {params.row.denominacion}
          </div>
        );
      },
    },
    { field: "tiempoEstimadoCocina", headerName: "Tiempo de cocina", width: 200 },
    {
      field: "precioVenta",
      headerName: "Precio",
      width: 160,
    },
    {
      field: "action",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"" + params.row.id}>
              <button className="productListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getProductosSinCantidad()).then(setProductos)
  }, []);

  return (
    <div className="productList">
      <Link to="../newproduct">
        <button className="productAddButton">Crear producto</button>
      </Link>
      <DataGrid
        rows={productos}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
      />
    </div>
  );
}

export default ProductList