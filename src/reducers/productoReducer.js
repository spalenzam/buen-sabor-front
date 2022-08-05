import { types } from "../types/types";

const initialState = {
    productoList: [],
}

export const productoReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.getAllProducto:
            return {
                //esto es para retornar siempre un estado nuevo, no pisar el anterior
                ...state,
                //como es un arreglo el notes tengo que esparcirlo con los ...
                productoList: [...action.payload]

            }

        case types.getAllBebidas:
            return {
                ...state,
                bebidaList: [...action.payload]
            }

        case types.deleteProducto:
            return {
                ...state,
                productoList: state.productoList.filter(producto => producto.id !== action.payload)
            }

        default:
            return state;
    }
} 