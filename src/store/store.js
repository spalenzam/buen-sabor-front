import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { productoReducer } from '../reducers/productoReducer';
import { uiReducer } from '../reducers/uiReducer';
import { usuarioReducer } from '../reducers/usuarioReducer';
import { rubroGeneralReducer } from '../reducers/rubroGeneralReducer';

//Esto es para poder ocupar dos middleware
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//como el createStore recibe UN SOLO reducer tenemos que usar el combineReducer
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    prod: productoReducer,
    usuarios:usuarioReducer,
    rubrogeneral: rubroGeneralReducer
})


export const store = createStore(
    reducers,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    //Ahora ya no ocupamos lo de la línea de arriba sino esta constante que me permite ocupar los dos middleware, el thunk me sirve para las peticiones asíncronas
    composeEnhancers(
        applyMiddleware ( thunk )
    )
);