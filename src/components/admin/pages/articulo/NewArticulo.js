import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createProductoManufacturado, getRubroGeneral, createProductoManufacturadoConImagen } from '../../../../actions/productos';
import { createArticulo, getArticuloInsumo, getRubroArticulo } from '../../../../actions/articulos';
import "./newProduct.css";
import List from '../../../../util/list';
import Swal from 'sweetalert2';

const NewArticulo = () => {


    const dispatch = useDispatch();

    const [rubroArticulo, setRubroArticulo] = useState([]);

    const [articulo, setArticulo] = useState({});

    const [formValues, setFormValues] = useState({
        denominacion: '',
        esInsumo: '',
        precioCompra: '',
        precioVenta: '',
        stockActual: '',
        stockMinimo: '',
        unidadMedida: '',
        idRubro: ''
    });

    const { denominacion, esInsumo, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, idRubro } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            //Todos los valores que tiene actualmente el formValues, pero cambio el que recibo en el evento (con la segunda línea)
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleCreateArticulo = async (e) => {
        //para que no haga la propagación del formulario
        e.preventDefault();

        await dispatch(createArticulo(denominacion, esInsumo, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, idRubro))
        .then(setArticulo);

        Swal.fire({
            title: 'Artículo Creado con Éxito',
            icon: 'success',
            html:
                'Volver a  ' +
                '<a href="../admin/articulo">Articulos</a> ',
        })

        // navigate("../product");

    }

    useEffect(() => {
        dispatch(getRubroArticulo()).then(setRubroArticulo);
    }, []);


    return (
        <div className="newProduct">
            <h1 className="addProductTitle">Artículo nuevo</h1>
            <form onSubmit={handleCreateArticulo} className="addProductForm">
                <div className="productTop">
                    <div className="productTopLeft">
                        <div className="addProductItem">
                            <label>Nombre del artículo</label>
                            <input
                                type="text"
                                placeholder='Milanesa'
                                name='denominacion'
                                value={denominacion}
                                onChange={handleInputChange}
                            />
                            <br />
                            <label>Precio Compra</label>
                            <input
                                type="text"
                                placeholder='$550'
                                name='precioCompra'
                                value={precioCompra}
                                onChange={handleInputChange}
                            />
                            <br />
                            <label>Precio Venta</label>
                            <input
                                type="text"
                                placeholder='$850'
                                name='precioVenta'
                                value={precioVenta}
                                onChange={handleInputChange}
                            />
                            <br />
                            <label>Stock Actual</label>
                            <input
                                type="text"
                                placeholder='10'
                                name='stockActual'
                                value={stockActual}
                                onChange={handleInputChange}
                            />
                            <br />

                        </div>
                    </div>
                    <div className="productTopRight">
                        <div className="addProductItem">
                            <label>Stock Mínimo</label>
                            <input
                                type="text"
                                placeholder='3'
                                name='stockMinimo'
                                value={stockMinimo}
                                onChange={handleInputChange}
                            />
                            <br />
                            <div className="addProductItem">
                                <label>Es insumo</label>
                                <select name="esInsumo" value={esInsumo} onChange={handleInputChange}>
                                    <option>Seleccione una opción</option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <br />
                            <div className="addProductItem">
                                <label>Unidad de medida</label>
                                <select name="unidadMedida" value={unidadMedida} onChange={handleInputChange}>
                                    <option>Seleccione una opción</option>
                                    {/* <option value="gr">gr</option> */}
                                    <option value="Kg">Kg</option>
                                    <option value="l">Litro</option>
                                    <option value="Unidad">Unidad</option>
                                    {/* <option value="ml">ml</option> */}
                                </select>
                            </div>
                            <br />
                            <label>Rubro</label>
                            <select name="idRubro" value={idRubro} id="rubro" onChange={handleInputChange}>
                                <option value="">Selecione una opción</option>
                                {rubroArticulo.map((rubro, index) => (
                                    rubro.rubroarticuloPadre == null
                                    &&  <option key={index} value={rubro.id}>{rubro.denominacion}</option>
                                ))}

                            </select>
                        </div>
                    </div>
                </div>
                <button className="addProductButton">Crear</button>
            </form>
            <Link to={"../articulo/"}>
                <button className="addProductButton">Volver</button>
            </Link>
        </div>
    )
}

export default NewArticulo