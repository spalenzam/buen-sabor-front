import { types } from "../types/types";
import axios from 'axios';
import Swal from 'sweetalert2';

export const getRubroGeneral = () => async (dispatch) => {
    
    try {
        const res = await axios.get(`api/buensabor/rubrogeneral/alta`)

        dispatch({
            type: types.getRubroGeneral,
            payload: 
                res.data     
        })
        return res.data;

    }
    catch (e) {
        Swal.fire('Error', 'No se pueden mostrar las categorías', 'error')
    }
}