import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteArticuloDetalle, getArtManuDetalle } from '../../../../actions/productos';
import { Link, useParams } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";

const AgregarArticulo = ({idProducto }) => {

    const dispatch = useDispatch();

    //const { productId: id } = useParams();

    const [artManuDetalle, setArtManuDetalle] = useState([]);

    //const [articulosInsumo, setArticulosInsumo] = useState([]);

    const handleDelete = async (idArticulo) => {
        await dispatch(deleteArticuloDetalle(idArticulo))
        setArtManuDetalle(await dispatch(getArtManuDetalle(idProducto)))
      };

    const columns = [
        {
            field: "articuloinsumo", headerName: "Articulo", width: 150,
            valueFormatter: (params) => params.value.denominacion,
        },
        { field: "cantidad", headerName: "Cantidad", width: 140 },
        { field: "unidadMedida", headerName: "Unidad", width: 140 },
        {
            field: "action",
            headerName: "Acciones",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"../articuloDetalle/" + params.row.id}>
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
console.log(idProducto);
        dispatch(getArtManuDetalle(idProducto)).then((data) => {
            setArtManuDetalle(data)
            //setArticulos(data)
        });
        //dispatch(getArticuloInsumo()).then(setArticulosInsumo);

    }, []);

    console.log(artManuDetalle);
    // console.log(articulosInsumo);
    // console.log('Estoy en agregar');

    return (
        <div className="userList">
            <DataGrid
                rows={artManuDetalle}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                sx={{
                    '& .MuiDataGrid-columnHeaderTitle': {
                        overflow: "hidden",
                    }
                }}
            />
        </div>
    )
}

export default AgregarArticulo