import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { AddBox, Publish } from "@material-ui/icons";
import { createProductoManufacturado, getRubroGeneral, updateProduct, getArticuloInsumo, createProductoManufacturadoConImagen } from '../../../../actions/productos';
import "./newProduct.css";
import List from '../../../../util/list';


const SelectArticulo = (props) => {

  const [articulos, setArticulos] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticuloInsumo()).then(setArticulos);
  }, []);

  return (
    <select name="idArticulo" value={props.input.value?.id || ''} placeholder="Articulo"
      onChange={(e) => { props.input.onChange(articulos.find((elemt) => elemt.id == e.target.value)) }}
    >
      <option value="">Select option</option>
      {articulos.map((art, index) => (
        <option key={index} value={art.id}>{art.denominacion}</option>
      ))}
    </select>
  )
}

const NewProduct = () => {

  const dispatch = useDispatch();

  const [rubrosGeneral, setRubrosGeneral] = useState([]);

  const [productoManufacturado, setProductoManufacturado] = useState({});

  const [bandera, setBandera] = useState(0);

  const [formValues, setFormValues] = useState({
    denominacionProducto: ' ',
    precioVenta: '',
    tiempoEstimadoCocina: '',
    fechaBaja: '',
    idRubro: '',
    idArticulo: null,
    unidadMedida: '',
    cantidad: '',
    articulomanufacturadodetalles: [],
    imagen: '',
  });

  const { unidadMedida, cantidad, idArticulo, denominacionProducto, precioVenta, tiempoEstimadoCocina, idRubro, fechaBaja, articulomanufacturadodetalles, imagen } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      //Todos los valores que tiene actualmente el formValues, pero cambio el que recibo en el evento (con la segunda línea)
      ...formValues,
      [target.name]: target.type == "file" ? target.files[0] : target.value
    })
  }

  const handleInputSelectArticulo = (values) => {
    setFormValues({
      //Todos los valores que tiene actualmente el formValues, pero cambio el que recibo en el evento (con la segunda línea)
      ...formValues,
      "articulomanufacturadodetalles": values
    })
  }

  const handleCreateProducto = async (e) => {
    //para que no haga la propagación del formulario
    e.preventDefault();

    if (imagen) {
      await dispatch(createProductoManufacturadoConImagen(denominacionProducto, precioVenta, tiempoEstimadoCocina, fechaBaja, idRubro, articulomanufacturadodetalles, imagen))
      .then(setProductoManufacturado);

    } else {
      await dispatch(createProductoManufacturado(denominacionProducto, precioVenta, tiempoEstimadoCocina, fechaBaja, idRubro, articulomanufacturadodetalles))
      .then(setProductoManufacturado);

    }
    

  }

  useEffect(() => {

    // if(bandera==0){
    //   dispatch(createProductoManufacturado(denominacionProducto, precioVenta, tiempoEstimadoCocina, fechaBaja)).then(setProductoManufacturado);
    //   setBandera(1);
    // }

    dispatch(getRubroGeneral()).then(setRubrosGeneral);
  }, []);

  console.log(productoManufacturado);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Producto nuevo</h1>
      <form onSubmit={handleCreateProducto} className="addProductForm">
        <div className="productTop">
          <div className="productTopLeft">
            <div className="addProductItem">
              <label>Image</label>
              <input type="file" id="imagen" name='imagen' value={imagen?.files?.at(0).path || ""} onChange={handleInputChange} />
              <input type="file" id="imagen" name='imagen' value={imagen?.files?.at(0).path || ""} style={{ display: "none" }} onChange={handleInputChange} />
            </div>
            <div className="addProductItem">
              <label>Nombre del producto</label>
              <input
                type="text"
                placeholder='Milanesa'
                name='denominacionProducto'
                value={denominacionProducto}
                onChange={handleInputChange}
              />
              <br />
              <label>Precio</label>
              <input
                type="text"
                placeholder='$850'
                name='precioVenta'
                value={precioVenta}
                onChange={handleInputChange}
              />
              <br />
              <label>Tiempo estimado de cocina (minutos)</label>
              <input
                type="text"
                placeholder='45'
                name='tiempoEstimadoCocina'
                value={tiempoEstimadoCocina}
                onChange={handleInputChange}
              />
              <br />
              <label>Rubro</label>
              <select name="idRubro" value={idRubro} id="rubro" onChange={handleInputChange}>
                {rubrosGeneral.map((rubro, index) => (
                  <option key={index} value={rubro.id}>{rubro.denominacion}</option>
                ))}

              </select>
            </div>
          </div>
          <div className="productTopRight">
            <span className="productName">INGREDIENTES</span>
            {/* <br />
                    {producto?.articulomanufacturadodetalles?.map((prod, index) => (
                        <div key={index}>
                            <div className="productInfoItem">
                                <span className="productInfoValue">{prod?.articuloinsumo?.denominacion + " " + prod?.cantidad + " " + prod?.unidadMedida}</span>
                            </div>
                        </div>
                    ))
                    }
                    <Link to={"../newArtManufacturadoDetalle/" + id}>
                        <button type="button" className="productButton">Editar</button>
                    </Link> */}

            {/* <div className="productInfoItemArticulo">
              <AgregarArticulo idProducto={productoManufacturado?.id} />
            </div> */}
            <List input={{ value: formValues.articulomanufacturadodetalles, onChange: handleInputSelectArticulo }}
              options={{ articuloinsumo: { component: SelectArticulo, showAttr: "denominacion" }, cantidad: { input: {} }, unidadMedida: { input: {} } }}
            />

            {/* <Link to="../newArticuloDetalle" state={{ productoManufacturado }}> */}
            {/* <Link to="../newArticuloDetalle"> */}
            {/* <button className="productAddButton">Agregar articulo</button> */}
            {/* </Link> */}

          </div>
        </div>
        <button className="addProductButton">Crear</button>
      </form>
    </div>
  )
}

export default NewProduct