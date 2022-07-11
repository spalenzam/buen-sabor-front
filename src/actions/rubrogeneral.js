import { types } from "../types/types";
import axios from 'axios';
import Swal from 'sweetalert2';

export const getRubroGeneral = () => async (dispatch) => {
    
    try {

        const rubro = []

        const res = await axios.get(`api/buensabor/rubrogeneral/alta`)
        
        res.data.forEach((prod) => {
            rubro.push(prod)
        })

        const resbebida = await axios.get(`api/buensabor/rubroarticulo/alta`)

        resbebida.data.forEach((art) => {
            if(art.id === 3){
                rubro.push(art)
            }
        });
        dispatch({
            type: types.getRubroGeneral,
            payload: 
                rubro     
        })

        return rubro;

    }
    catch (e) {
        Swal.fire('Error', 'No se pueden mostrar las categorías', 'error')
    }
}