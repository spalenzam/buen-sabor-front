import { types } from "../types/types";
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from "moment";

export const getRankingComidas = (desde, hasta) => async () => {
    try {

        const res = await axios.get(`/api/buensabor/detallepedido/ranking`, {
            params: {
                desde: moment(desde).format("yyyy-MM-DD"),
                hasta: moment(hasta).format("yyyy-MM-DD")
            }
        });

        console.log(res.data.length);

        res.data.length == 0 && Swal.fire('No se encontraron datos en ese rango de fecha', '', 'info')

        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontró el ranking seleccionado', 'error')
    }
}

export const generarExcelRankingComidas = (desde, hasta) => async () => {
    try {
        const res = axios(`/api/buensabor/detallepedido/ranking/generar-excel`, {
            params: {
                desde: moment(desde).format("yyyy-MM-DD"),
                hasta: moment(hasta).format("yyyy-MM-DD")
            },
            method: 'GET',
            responseType: 'blob' //Force to receive data in a Blob Format
        })
            .then(response => {
                //Create a Blob from the PDF Stream
                const file = new Blob(
                    [response.data],
                    { type: 'application/vnd.ms-excel' },
                    { headers: 'filename=myfile' }
                );
                //Build a URL from the file
                //const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                //window.open(fileURL);
                const fecha = moment(Date.now()).format("yyyy-MM-DD")
                var a = document.createElement("a");
                a.href = URL.createObjectURL(file);
                a.download = "Ranking-Comidas-" + fecha;
                a.click();
            })
            .catch(error => {
                console.log(error);
            });

    } catch (e) {
        Swal.fire('Error', 'No se pudo descargar el excel', 'error')
    }
}

export const getPedidoPorCliente = (desde, hasta) => async () => {
    try {

        const res = await axios.get(`/api/buensabor/pedidos/pedidos-por-cliente`, {
            params: {
                desde: moment(desde).format("yyyy-MM-DD"),
                hasta: moment(hasta).format("yyyy-MM-DD")
            }
        });

        res.data.length == 0 && Swal.fire('No se encontraron datos en ese rango de fecha', '', 'info')

        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los pedidos por cliente', 'error')
    }
}

export const generarExcelPedidoPorCliente = (desde, hasta) => async () => {
    try {
        const res = axios(`/api/buensabor/pedidos/pedidos/generar-excel`, {
            params: {
                desde: moment(desde).format("yyyy-MM-DD"),
                hasta: moment(hasta).format("yyyy-MM-DD")
            },
            method: 'GET',
            responseType: 'blob' //Force to receive data in a Blob Format
        })
            .then(response => {
                //Create a Blob from the PDF Stream
                const file = new Blob(
                    [response.data],
                    { type: 'application/vnd.ms-excel' },
                    { headers: 'filename=myfile' }
                );
                //Build a URL from the file
                //const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                //window.open(fileURL);
                const fecha = moment(Date.now()).format("yyyy-MM-DD")
                var a = document.createElement("a");
                a.href = URL.createObjectURL(file);
                a.download = "Pedidos-Por-Cliente-" + fecha;
                a.click();
            })
            .catch(error => {
                console.log(error);
            });

    } catch (e) {
        Swal.fire('Error', 'No se pudo descargar el excel', 'error')
    }
}

export const getGanancia = (desde, hasta) => async () => {
    try {

        const res = await axios.get(`/api/buensabor/facturas/ganancias`, {
            params: {
                desde: moment(desde).format("yyyy-MM-DD"),
                hasta: moment(hasta).format("yyyy-MM-DD")
            }
        });

        res.data.factura.length == 0 && Swal.fire('No se encontraron datos en ese rango de fecha', '', 'info')

        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontraron las ganancias', 'error')
    }
}

export const generarExcelGanancia = (desde, hasta) => async () => {
    try {
        const res = axios(`/api/buensabor/facturas/ganancias/generar-excel`, {
            params: {
                desde: moment(desde).format("yyyy-MM-DD"),
                hasta: moment(hasta).format("yyyy-MM-DD")
            },
            method: 'GET',
            responseType: 'blob' //Force to receive data in a Blob Format
        })
            .then(response => {
                //Create a Blob from the PDF Stream
                const file = new Blob(
                    [response.data],
                    { type: 'application/vnd.ms-excel' },
                    { headers: 'filename=myfile' }
                );
                //Build a URL from the file
                //const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                //window.open(fileURL);
                const fecha = moment(Date.now()).format("yyyy-MM-DD")
                var a = document.createElement("a");
                a.href = URL.createObjectURL(file);
                a.download = "Ganancias-" + fecha;
                a.click();
            })
            .catch(error => {
                console.log(error);
            });

    } catch (e) {
        Swal.fire('Error', 'No se pudo descargar el excel', 'error')
    }
}

export const getIngresoDiario = (desde) => async () => {
    try {
        const res = await axios.get(`/api/buensabor/facturas/ingreso-diario`, {
            params: {
                fecha: moment(desde).format("yyyy-MM-DD")
            }
        });
        console.log(res.data);
        res.data.factura.length == 0 && Swal.fire('No se encontraron datos en esa fecha', '', 'info')
        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontró el ingreso diario', 'error')
    }
}

export const generarExcelIngresoDiario = (desde) => async () => {
    try {
        const res = axios(`/api/buensabor/facturas/ingreso-diario/generar-excel`, {
            params: {
                fecha: moment(desde).format("yyyy-MM-DD")
            },
            method: 'GET',
            responseType: 'blob' //Force to receive data in a Blob Format
        })
            .then(response => {
                //Create a Blob from the PDF Stream
                const file = new Blob(
                    [response.data],
                    { type: 'application/vnd.ms-excel' },
                    { headers: 'filename=myfile' }
                );
                //Build a URL from the file
                //const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                //window.open(fileURL);
                const fecha = moment(Date.now()).format("yyyy-MM-DD")
                var a = document.createElement("a");
                a.href = URL.createObjectURL(file);
                a.download = "IngresosDiarios-" + fecha;
                a.click();
            })
            .catch(error => {
                console.log(error);
            });

    } catch (e) {
        Swal.fire('Error', 'No se pudo descargar el excel', 'error')
    }
}

export const getIngresoMensual = (desde) => async () => {
    try {
        const res = await axios.get(`/api/buensabor/facturas/ingreso-mensual`, {
            params: {
                fecha: moment(desde).format("yyyy-MM-DD")
            }
        });

        res.data.factura.length == 0 && Swal.fire('No se encontraron datos en esa fecha', '', 'info')

        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontró el ingreso mensual', 'error')
    }
}

export const generarExcelIngresoMensual = (desde) => async () => {
    try {
        const res = axios(`/api/buensabor/facturas//ingreso-mensual/generar-excel`, {
            params: {
                fecha: moment(desde).format("yyyy-MM-DD")
            },
            method: 'GET',
            responseType: 'blob' //Force to receive data in a Blob Format
        })
            .then(response => {
                //Create a Blob from the PDF Stream
                const file = new Blob(
                    [response.data],
                    { type: 'application/vnd.ms-excel' },
                    { headers: 'filename=myfile' }
                );
                //Build a URL from the file
                //const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                //window.open(fileURL);
                const fecha = moment(Date.now()).format("yyyy-MM-DD")
                var a = document.createElement("a");
                a.href = URL.createObjectURL(file);
                a.download = "IngresosMensual-" + fecha;
                a.click();
            })
            .catch(error => {
                console.log(error);
            });

    } catch (e) {
        Swal.fire('Error', 'No se pudo descargar el excel', 'error')
    }
}



