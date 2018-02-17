import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ThunkAction from 'redux-thunk';
import Promise from 'redux-promise-middleware';


import { productReducer } from './products/products.reducer';
import { loginReducer } from './login/login.reducer';


const middleWare = applyMiddleware(Promise(), ThunkAction, createLogger())

const reducer = combineReducers({
  productObj: productReducer,
  user: loginReducer 
});

export const store = createStore(reducer, middleWare);