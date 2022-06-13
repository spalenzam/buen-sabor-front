import React, { useCallback, useEffect } from 'react';
import "./userList.css";
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteUsuarios, getUsuarios } from '../../../../actions/usuarios';
import { useDispatch } from 'react-redux';

const UserList = () => {

  //Estado donde guardamos los usuarios
  const [usuarios, setUsuarios] = useState([]);

  const dispatch = useDispatch();

  //consigo los usuarios
  const fetchUsuarios = useCallback(async () => {
    setUsuarios(await dispatch(getUsuarios()))
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteUsuarios(id))
    setUsuarios(await dispatch(getUsuarios()))
  };

  //solo se ejecutara al ppio del renderizado
  //llamo a la función para que me traiga la lista de productos de commerce
  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  console.log(usuarios)

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "usuario", headerName: "Usuario", width: 180 },
    { field: "rol", headerName: "Rol", width: 150 },
    // {
    //   field: "usuario",
    //   headerName: "User",
    //   width: 200,
    //   renderCell: (params) => {
    //     return (
    //       <div className="userListUser">
    //         {/* <img className="userListImg" src={params.row.avatar} alt="" /> */}
    //         {params.row.rol}
    //       </div>
    //     );
    //   },
    // },
    // { field: "email", headerName: "Email", width: 200 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    // {
    //   field: "transaction",
    //   headerName: "Transaction Volume",
    //   width: 160,
    // },
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
      <Link to="../newUser">
        <button className="userAddButton">Nuevo Empleado</button>
      </Link>
      <DataGrid
        rows={usuarios}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
      />
    </div>
  );
}

export default UserList;