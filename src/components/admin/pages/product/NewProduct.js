import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { createProductoManufacturado, getRubroGeneral, updateProduct, getArticuloInsumo, createProductoManufacturadoConImagen } from '../../../../actions/productos';
import "./newProduct.css";
import List from '../../../../util/list';
import Swal from 'sweetalert2';


const SelectArticulo = (props) => {
  console.log(props.input);

  const [articulos, setArticulos] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticuloInsumo()).then(setArticulos);
  }, []);

  return (
    <select name="idArticulo" value={props.input.value?.id || ''} placeholder="Articulo"
      onChange={(e) => { props.input.onChange(articulos.find((elemt) => elemt.id == e.target.value)) }}
    >
      <option value="">Selecione una opción</option>
      {articulos.map((art, index) => (
        <option key={index} value={art.id}>{art.denominacion}</option>
      ))}
    </select>
  )
}

const SelectUnidadDeMedida = (props) => {
console.log(props.input);
  return (
    <select name="unidadMedida" value={props.input.value} 
    onChange={(e) => { props.input.onChange(e.target.value) }} >
            <option>Seleccione una opción</option>
            <option value="gr">gr</option>
            <option value="kg">kg</option>
            <option value="l">l</option>
            <option value="ml">ml</option>
          </select>
  )
}

const NewProduct = () => {

  let navigate = useNavigate();

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

  Swal.fire({
    title: 'Producto Creado con Éxito',
    icon: 'success',
    html:
      'Volver a  ' +
      '<a href="../admin/product">Productos Manufacturados</a> ',
  })
   
    // navigate("../product");

  }

  useEffect(() => {
    dispatch(getRubroGeneral()).then(setRubrosGeneral);
  }, []);


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Producto nuevo</h1>
      <form onSubmit={handleCreateProducto} className="addProductForm">
        <div className="productTop">
          <div className="productTopLeft">
            <div className="addProductItem">
              <label>Image</label>
              <input type="file" id="imagen" name='imagen' value={imagen?.files?.at(0).path || ""} onChange={handleInputChange} />
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
              <option value="">Selecione una opción</option>
                {rubrosGeneral.map((rubro, index) => (
                  <option key={index} value={rubro.id}>{rubro.denominacion}</option>
                ))}

              </select>
            </div>
          </div>
          <div className="productTopRight">
            <span className="productName">INGREDIENTES</span>

            <List input={{ value: formValues.articulomanufacturadodetalles, onChange: handleInputSelectArticulo }}
              options={{ articuloinsumo: { component: SelectArticulo, showAttr: "denominacion" }, cantidad: { input: {} }, unidadMedida: { input: {} } }}
            />

            {/* <Link to="../newArticuloDetalle" state={{ productoManufacturado }}> */}1f1d91... Teminé algunos detalles del guardado de productos

          </div>
        </div>
        <button className="addProductButton">Crear</button>
      </form>
      <Link to={"../product/"}>
        <button className="addProductButton">Volver</button>
      </Link>
    </div>
  )
}

export default NewProduct