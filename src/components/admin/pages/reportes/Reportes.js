import React from 'react';
import "./pedidoList.css";
import { useNavigate } from 'react-router-dom';

const Reportes = () => {

    const navigate = useNavigate();

    const handleBuscarRanking = async () => {
        navigate("../reportesIndividual", { state: { bandera: "ranking" } });
    }

    const handleBuscarIngresoDiario = async () => {
        navigate("../reportesIndividual", { state: { bandera: "diario" } });
    }

    const handleBuscarIngresoMensual = async () => {
        navigate("../reportesIndividual", { state: { bandera: "mensual" } });
    }

    const handleBuscarPedidoPorCliente = async () => {
        navigate("../reportesIndividual", { state: { bandera: "cliente" } });
    }

    const handleBuscarGanancias = async () => {
        navigate("../reportesIndividual", { state: { bandera: "ganancia" } });
    }
    return (

        <div className="productList listbutton">
            <button
                className="addProductButton"
                onClick={() => handleBuscarRanking()}
            >
                Ranking de comidas
            </button>
            <button
                className="addProductButton"
                onClick={() => handleBuscarIngresoDiario()}
            >
                Ingreso Diario
            </button>
            <button
                className="addProductButton"
                onClick={() => handleBuscarIngresoMensual()}
            >
                Ingreso Mensual
            </button>
            <button
                className="addProductButton"
                onClick={() => handleBuscarPedidoPorCliente()}
            >
                Pedido por cliente
            </button>
            <button
                className="addProductButton"
                onClick={() => handleBuscarGanancias()}
            >
                Ganancias
            </button>
           
        </div>
    )
}

export default Reportes