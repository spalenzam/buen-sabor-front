import { types } from "../types/types";

const initialState = {
    rubrogeneralList: [],
}

export const rubroGeneralReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.getRubroGeneral:
            return {
                ...state,
                rubrogeneralList: [...action.payload]

            }
            
        default:
            return state;
    }
} 