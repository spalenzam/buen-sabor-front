import Swal from 'sweetalert2';
import axios from 'axios';

export const getArticuloInsumo = () => async () => {
    try {
        //Obtengo el producto
        const res = await axios.get(`/api/buensabor/articuloinsumo/alta`);

        const resData = res.data
        
        return resData

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los insumos', 'error')
    }
}