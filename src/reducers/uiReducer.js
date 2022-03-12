import { types } from "../types/types";

const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = ( state = initialState, action) =>{

    switch (action.type) {

        case types.uiSetError:
            //los tres puntitos significan que voy a mantener el mismo estado y abajo pongo lo especifico que quiero modificar, en este caso solo el msgerror
            return{
                ...state,
                msgError: action.payload
            }
    
        case types.uiRemoveError:
            return{
                ...state,
                msgError: null
            }

        case types.uiStartLoading:
            return{
                ...state,
                loading: true
            }

        case types.uiFinishLoading:
            return{
                ...state,
                loading: false
            }

        default:
            return state;
    }
}