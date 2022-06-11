import React from 'react';
import './inicio.css';

const Inicio = ({rubro}) => {

  return (
    <div className='buen-sabor__main-content'>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>El delivery de comida que estabas esperando</h4>
            <h2>Desde el Buen Sabor nos encargamos de lo que necesites para que sigas disfrutando de tus actividades</h2>
          </div> 
        </div>  
      </div> 
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Categorías</h3>
          </div>
          <div className="col-md-3">
              <div className="tarjeta-categoria">
                <img src="#" alt="Categoría Ejemplo" />
                <h4>Nombre Categoría</h4>
              </div>
          </div>
          <div className="col-md-3">
              <div className="tarjeta-categoria">
                <img src="#" alt="Categoría Ejemplo" />
                <h4>Nombre Categoría</h4>
              </div>
          </div>
          <div className="col-md-3">
              <div className="tarjeta-categoria">
                <img src="#" alt="Categoría Ejemplo" />
                <h4>Nombre Categoría</h4>
              </div>
          </div>
          <div className="col-md-3">
              <div className="tarjeta-categoria">
                <img src="#" alt="Categoría Ejemplo" />
                <h4>Nombre Categoría</h4>
              </div>
          </div>
        </div>
      </div> 

    </div>
  )
}

export default Inicio