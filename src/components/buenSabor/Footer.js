import React from 'react';
import './footer.css';


const Footer = () => {

    return (
      <footer>
        
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h4>Contactanos</h4>
              <p><b>Dirección:</b> Calle Nombre 000, Localidad, Mendoza.</p>
              <p><b>Teléfonos:</b> 0261-0000000 / 0261-0000000</p>
              <p><b>Correo:</b> buensabor@gmail.com</p>
              <div className="redes-bs">
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-twitter"></i>
              </div>
            </div>
            <div className="col-md-2">
              <h4>Menú</h4>
              <ul>
                <li><a href="/inicio">Inicio</a></li>
                <li><a href="/productos">Productos</a></li>
                <li><a href="/nosotros">Sobre nosotros</a></li>
              </ul>  
            </div>
            <div className="col-md-2">
              <h4>Categorías</h4>
              <ul>
                <li>Categoría 1</li>
                <li>Categoría 2</li>
                <li>Categoría 3</li>
                <li>Categoría 4</li>
                <li>Categoría 5</li>
                <li>Categoría 6</li>
              </ul>
            </div>
            <div className="col-md-4">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2816.6243204279544!2d-68.85134188132494!3d-32.910072484728374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x579f660f1abeb68!2sBrader%20Hops!5e0!3m2!1ses-419!2sar!4v1653848185537!5m2!1ses-419!2sar" width="100%" height="200"></iframe>
            </div> 
          </div>  
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="text-copyright">© 2022 Buen Sabor. Todos los derechos reservados.</p>
            </div> 
          </div>  
        </div> 
  
      </footer>
    )
  }
  
  export default Footer