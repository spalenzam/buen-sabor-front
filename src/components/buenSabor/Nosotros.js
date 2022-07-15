import React from "react";
import './inicio.css';

const Nosotros = ({}) => {

    return(

        <div class= "buen-sabor__main-content">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="titulo-inicio">Acerca del buen sabor:</h1>
                        <p>Somos una empresa de comida rapida ubicada en el Gran Mendoza, contamos con la mas alta calidad y sabores del mercado local. Ofrecemos un excelente servicio de delivery puerta a puerta para que puedas disfrutar de nuestras exquisiteces desde la comodidad de tu hogar!</p>
                        <p>Si lo deseas, podes hacer tu encargo y retirarlo en nuestra sucursal, podes encontrarnos en:</p>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2816.6243204279544!2d-68.85134188132494!3d-32.910072484728374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x579f660f1abeb68!2sBrader%20Hops!5e0!3m2!1ses-419!2sar!4v1653848185537!5m2!1ses-419!2sar" width="100%" height="450" className="mapabs"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Nosotros