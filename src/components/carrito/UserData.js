import React, { useEffect, useState } from 'react';
import {
  LocationSearching,
  MailOutline,
  PhoneAndroid,
} from "@material-ui/icons";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUsuarioById, updateUsuario } from '../../actions/usuarios';
import { setError, removeError } from '../../actions/ui';

const UserData = ({ usuarioLog, usuarioSeleccionado, setUsuarioSeleccionado }) => {
  // const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({});

  const dispatch = useDispatch();

  const { msgError } = useSelector(state => state.ui)

  const [formValues, setFormValues] = useState({
    usuario: '',
    rol: '',
    clave: '',
    clave2: '',
    cliente: '',
    apellido: '',
    nombre: '',
    email: '',
    telefono: '',
    calle: '',
    numero: '',
    localidad: '',
  });

  const { id, usuario, clave, clave2, rol, apellido, nombre, email, telefono, calle, numero, localidad } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      //Todos los valores que tiene actualmente el formValues, pero cambio el que recibo en el evento (con la segunda línea)
      ...formValues,
      [target.name]: target.value
    })
  }

  const handleUpdateUsuario = (e) => {
    //para que no haga la propagación del formulario
    e.preventDefault();
    if (clave !== clave2 || clave.length < 5) {
      dispatch(setError('Las contraseñas no coinciden o posee menos de 5 caracteres'))
    } else if (usuario !== email) {
      dispatch(setError('El usuario y el email deben ser iguales'))
    } else if (telefono === " ") {
      dispatch(setError('Falta ingresar número de telefono'))
    } else if (!calle || !numero || !localidad) {
      dispatch(setError('Falta ingresar la dirección de entrega'))
    } else {
      dispatch(removeError())
      dispatch(updateUsuario(usuarioSeleccionado.id, usuario, clave, rol, apellido, nombre, email, telefono, calle, numero, localidad)).then(setUsuarioSeleccionado);
    }

  }

  useEffect(() => {

    dispatch(getUsuarioById(usuarioLog.id)).then((data) => {
      console.log(data);
      setUsuarioSeleccionado(data)
      setFormValues({
        ...data,
        clave: data?.clave,
        clave2: data?.clave,
        apellido: data?.cliente?.apellido,
        nombre: data?.cliente?.nombre,
        email: data?.cliente?.email,
        telefono: data?.cliente?.telefono === 1 ? " " : data?.cliente?.telefono,
        calle: data?.cliente?.domicilio?.calle !== null ? data?.cliente?.domicilio?.calle : " ",
        numero: data?.cliente?.domicilio?.numero !== null ? data?.cliente?.domicilio?.numero : "",
        localidad: data?.cliente?.domicilio?.localidad !== null ? data?.cliente?.domicilio?.localidad : ""
      })
    })
  }, [usuarioLog]);

  return (
    <div className="user">

      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://cdn1.iconfinder.com/data/icons/avatar-97/32/avatar-02-512.png"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {usuarioSeleccionado?.cliente?.nombre + " " + usuarioSeleccionado?.cliente?.apellido}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Datos del Usuario</span>
            <div>
              <div className="userShowInfo">
                {usuarioSeleccionado?.cliente?.telefono !== 1
                  ? <>
                    <PhoneAndroid className="userShowIcon" />
                    <span className="userShowInfoTitle">{usuarioSeleccionado?.cliente?.telefono}</span>
                  </>
                  : <>
                    <PhoneAndroid className="userShowIcon" />
                    <span className="userShowInfoTitle">Completar teléfono</span>
                  </>
                }
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{usuarioSeleccionado?.cliente?.email}</span>
              </div>
              <div className="userShowInfo">
              {usuarioSeleccionado?.cliente?.domicilio?.calle || usuarioSeleccionado?.cliente?.domicilio?.numero || usuarioSeleccionado?.cliente?.domicilio?.localidad 
              ? <>
               <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{usuarioSeleccionado?.cliente?.domicilio?.calle + " " + usuarioSeleccionado?.cliente?.domicilio?.numero + " " + usuarioSeleccionado?.cliente?.domicilio?.localidad}</span>
              </>
              : <>
               <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">Completar dirección</span>
              </>
              }
               
              </div>
            </div>
          </div>
          </div>

        <div className="userUpdate">
          <div >
            <span className="userUpdateTitle">Editar</span>
            <form onSubmit={handleUpdateUsuario} className="userUpdateForm">
              {
                msgError &&
                <div className='auth__alert-error'>
                  {msgError}
                </div>
              }
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder={usuarioSeleccionado?.usuario}
                    name='usuario'
                    className="userUpdateInput"
                    value={usuario}
                    onChange={handleInputChange}
                  />
                </div>
                {/* <div className="userUpdateItem">
                  <label>Clave</label>
                  <input
                    type="password"
                    placeholder='clave'
                    name='clave'
                    className="userUpdateInput"
                    value={clave}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Confirmar clave</label>
                  <input
                    type="password"
                    placeholder='Confirmar clave'
                    name='clave2'
                    className="userUpdateInput"
                    value={clave2}
                    onChange={handleInputChange}
                  />
                </div> */}
                <div className="userUpdateItem">
                  <label>Apellido</label>
                  <input
                    type="text"
                    placeholder={usuarioSeleccionado?.cliente?.apellido}
                    name='apellido'
                    className="userUpdateInput"
                    value={apellido}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Nombre</label>
                  <input
                    type="text"
                    placeholder={usuarioSeleccionado?.cliente?.nombre}
                    name='nombre'
                    className="userUpdateInput"
                    value={nombre}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                {/* <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder={usuarioSeleccionado?.cliente?.email}
                    name='email'
                    className="userUpdateInput"
                    value={email}
                    onChange={handleInputChange}
                  />
                </div> */}
                <div className="userUpdateItem">
                  <label>Teléfono</label>
                  <input
                    type="text"
                    placeholder={usuarioSeleccionado?.cliente?.telefono}
                    name='telefono'
                    className="userUpdateInput"
                    value={telefono}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Calle</label>
                  <input
                    type="text"
                    placeholder={usuarioSeleccionado?.cliente?.domicilio?.calle}
                    name='calle'
                    className="userUpdateInput"
                    value={calle}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Número calle</label>
                  <input
                    type="text"
                    placeholder={usuarioSeleccionado?.cliente?.domicilio?.numero}
                    name='numero'
                    className="userUpdateInput"
                    value={numero}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Localidad</label>
                  <input
                    type="text"
                    placeholder={usuarioSeleccionado?.cliente?.domicilio?.localidad}
                    name='localidad'
                    className="userUpdateInput"
                    value={localidad}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button type="submit " className="userUpdateButton" >Actualizar</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default UserData