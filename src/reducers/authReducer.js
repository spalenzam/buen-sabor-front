import { types } from "../types/types";

//los reducer reciben el state y la action
//el state lo tengo que inicializar como un objeto vacío, que es cuando el usuario NO ESTÁ LOGUEADO
//si está logueado va a ser el siguiente objeto por ejemplo
/*
{
    uid: 'idmuylargoquelovaagenerarnosequecosa',
    nombre: 'Macarena' 
}
*/

export const authReducer = ( state = {}, action) => {

    switch ( action.type ) {

        case types.login:
            return{
                uid: action.payload.uid,
                name: action.payload.name,
                lastname:action.payload.lastname,
                email:action.payload.email 
            }

        case types.logout:
            return{}
    
        default:
            return state;
    }
}