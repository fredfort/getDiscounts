import axios from 'axios';

import { Product } from './products.model';
import { Action, API } from '../model';

const PRODUCT_API = API + 'product/';

export function fetchProducts(): Action {
  return {
    type: 'FETCH_PRODUCTS',
    payload: axios.get(PRODUCT_API)
  }
}

export function addProduct(product: Product) {

  // With redux-thunk middleware 
  return function (dispatch) {
    dispatch(addProductPending());
    axios.post(PRODUCT_API, { product }).then((res) => {
      dispatch(addProductFulfilled(res));
    }).catch((err) => {
      dispatch(addProductRejected(err));
    });
  }

  // With redux-promise-middleware middleware
  /*return {
    type: 'ADD_PRODUCT',
    payload: axios.post(PRODUCT_API, { product })
  }*/
}

function addProductPending(){
  return {
    type: 'ADD_PRODUCT_PENDING'
  }
}

function addProductFulfilled( product ){
  return {
    type: 'ADD_PRODUCT_FULFILLED',
    payload: product
  }
}

function addProductRejected( err ){
  return {
    type: 'ADD_PRODUCT_REJECTED',
    payload: err
  }
}

export function updateProduct(product: Product | any): Action {
  return {
    type: 'UPDATE_PRODUCT',
    payload: axios.put(PRODUCT_API, { product })
  }
}

export function removeProduct(product: Product): Action {
  return {
    type: 'REMOVE_PRODUCT',
    payload: axios.delete(PRODUCT_API + product._id)
  }
}