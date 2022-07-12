import axios from 'axios';
import Swal from 'sweetalert2';

export const deleteRubroArticulo = (id) => async () => {

    try {
        await axios.put(`/api/buensabor/rubroarticulo/dar-de-baja/${id}`);

        Swal.fire('Delete', 'Rubro eliminado con éxito', 'success')

    } catch (e) {
        console.log("No puede eliminar el rubro");
    }
}

export const getRubroArticulo = () => async () => {
    
    try {
        const res = await axios.get(`/api/buensabor/rubroarticulo/alta`)
        
        return res.data;

    }
    catch (e) {
        Swal.fire('Error', 'No se pueden mostrar los rubros', 'error')
    }
}

export const updateRubroArticulo = (id, denominacion, idRubro) => async () => {
    try {

        const rubroPadre = {
            id: idRubro,
        }

        const rubro = {
            denominacion: denominacion,
            rubroarticuloPadre: idRubro != null ? rubroPadre : null
        }

        console.log(rubro);

        const res = await axios.put(`/api/buensabor/rubroarticulo/${id}`, rubro);

        Swal.fire('Update', 'Rubro actualizado con éxito', 'success')

        return res.data;

    } catch (e) {
        throw Swal.fire('Error', 'No se pudo guardar el rubro', 'error');

    }
}

export const saveRubroArticulo = (denominacion, idRubro) => async () => {
    try {

        const rubroPadre = {
            id: idRubro,
        }

        const rubro = {
            denominacion: denominacion,
            rubroarticuloPadre: idRubro != null ? rubroPadre : null
        }

        await axios.post('/api/buensabor/rubroarticulo', rubro)

        //Swal.fire('Creado', 'Usuario creado con éxito', 'success')
    }
    catch (e) {
        Swal.fire('Error', 'No se pudo guardar el rubro', 'error')
    }

}


export const getRubroArticuloById = (id) => async () => {
    try {
        const res = await axios.get(`/api/buensabor/rubroarticulo/${id}`);
       
        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontró el rubro', 'error')

    }
}