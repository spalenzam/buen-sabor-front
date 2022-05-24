import { types } from "../types/types";

const initialState = {
    usuarioList: [],
}

export const usuarioReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.getAllUsuarios:
            return {
                //esto es para retornar siempre un estado nuevo, no pisar el anterior
                ...state,
                //como es un arreglo el notes tengo que esparcirlo con los ...
                usuarioList: [...action.payload]

            }

        case types.deleteUsuario:
            return {
                ...state,
                usuarioList: state.usuarioList.filter(usuario => usuario.id !== action.payload)
            }
        
        case types.updateUsuario:
            return {
                ...state,
                //necesito identificar cual es usuario del arreglo que tengo que modificar 
                usuarioList: state.usuarioList.map( usuario => usuario.id === action.payload.id ? action.payload.usuario : usuario )
            }

        default:
            return state;
    }
} 