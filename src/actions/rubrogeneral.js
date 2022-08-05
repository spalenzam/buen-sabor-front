import { types } from "../types/types";
import axios from 'axios';
import Swal from 'sweetalert2';

export const getRubroGeneral = () => async (dispatch) => {
    
    try {

        const rubro = []

        const res = await axios.get(`/api/buensabor/rubrogeneral/alta`)
        
        res.data.forEach((prod) => {
            rubro.push(prod)
        })

        const resbebida = await axios.get(`/api/buensabor/rubroarticulo/alta`)

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
        Swal.fire('Error', 'No se pueden mostrar los rubros', 'error')
    }
}

export const updateRubroGeneral = (id, denominacion) => async () => {
    try {

        const rubro = {
            denominacion: denominacion,
        }

        const res = await axios.put(`/api/buensabor/rubrogeneral/${id}`, rubro);

        Swal.fire('Update', 'Rubro actualizado con éxito', 'success')

        return res.data;

    } catch (e) {
        throw Swal.fire('Error', 'No se pudo guardar el rubro', 'error');

    }
}

export const getRubroGeneralById = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/buensabor/rubrogeneral/${id}`);
       
        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontró el rubro', 'error')

    }
}

export const deleteRubro = (id) => async (dispatch) => {

    try {
        await axios.put(`/api/buensabor/rubrogeneral/dar-de-baja/${id}`);

        Swal.fire('Delete', 'Rubro eliminado con éxito', 'success')

    } catch (e) {
        console.log("No puede eliminar el rubro");
    }
}

export const saveRubro = (denominacion) => async () => {
    try {

        const rubro = {
            denominacion: denominacion,
        }

        await axios.post('/api/buensabor/rubrogeneral', rubro)

        //Swal.fire('Creado', 'Usuario creado con éxito', 'success')
    }
    catch (e) {
        Swal.fire('Error', 'No se pudo guardar el rubro', 'error')
    }

}

