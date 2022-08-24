import React from 'react';
import './inicio.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import portada from '../../assets/images/portada.jpg';
import caracteristica1 from '../../assets/images/caracteristicas-01.png';
import caracteristica2 from '../../assets/images/caracteristicas-02.png';
import caracteristica3 from '../../assets/images/caracteristicas-03.png';


const Inicio = ({rubro}) => {

  return (
    <div className='buen-sabor__main-content paddt'>
      <div className="portada">
        <img src={portada} alt="Portada Buen Sabor" className="img-fluid" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4 className="subtitulo-inicio">El delivery de comida que estabas esperando</h4>
            <h2 className="titulo-inicio">Desde el Buen Sabor nos encargamos de todo para que sigas disfrutando de tus actividades</h2>
          </div> 
        </div>  
      </div> 
      <div className="container caracteristicas-bs">
        <div className="row">
          <div className="col-md-4">
            <img src={caracteristica1} alt="Caractística 1" className="img-fluid" />
            <h3>Descargá nuestra App</h3>
            <p>Hace tus pedidos de la forma más cómoda</p>
          </div> 
          <div className="col-md-4">
            <img src={caracteristica2} alt="Caractística 2" className="img-fluid" />
            <h3>Máxima calidad</h3>
            <p>Eligimos nuestros ingredientes con los mejores proveedores</p>
          </div> 
          <div className="col-md-4">
            <img src={caracteristica3} alt="Caractística 3" className="img-fluid" />
            <h3>Delivery propio</h3>
            <p>Consultá las tárifas segun tu zona</p>
          </div> 
        </div>  
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4 className="subtitulo-inicio">¿Algún antojo?</h4>
            <h2 className="titulo-inicio">Nuestras Categorías</h2>
          </div>
          
          <div className="display-tarjeta">
            {rubro.map((ru) => (       
              <Link key={ru.id} to="../productos/" state={{ ru }} >
                <div className="tarjeta-categoria">
                  {ru?.id !== 3 
                  ?
                    <div className="contImg">
                      <img src={`http://localhost:8090/api/buensabor/articulosmanufacturados/imagen/${ru.id}`} alt="Categoría" />
                    </div> 
                  :
                    <div className="contImg">
                      <img src={`http://localhost:8090/api/buensabor/articuloinsumo/imagen/${ru.id}`} alt="Categoría" />
                    </div> 
                  }
                  <h4>{ru?.denominacion}</h4>
                </div> 
              </Link>
            ))}
          </div>
        </div>
      </div> 

    </div>
  )
}

export default Inicio