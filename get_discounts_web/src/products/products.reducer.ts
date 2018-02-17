
import { Action } from '../model';
import { Product, ProductObj } from './products.model';

const defaultProductObj = {
  fetching: false,
  fetchingError: false,
  products: []
}

export function productReducer (state: ProductObj = defaultProductObj, action: Action): ProductObj {
    switch(action.type){

      // ADD PRODUCT
      case 'ADD_PRODUCT_PENDING':
        return {...state, fetching: true};
      case 'ADD_PRODUCT_FULFILLED':
        return addProduct(state, action.payload.data);

      // UPDATE PRODUCT
      case 'UPDATE_PRODUCT_FULFILLED':
        return updateProduct(state, action.payload.data);

      // REMOVE PRODUCT
      case 'REMOVE_PRODUCT_FULFILLED':
        return removeProduct(state, action.payload.data.productId);

      // FETCH PRODUCT
      case 'FETCH_PRODUCTS_FULFILLED':
        return {...state, fetching: false, products: action.payload.data}
      case 'FETCH_PRODUCTS_PENDING':
        return {...state, fetching: true};
      case 'FETCH_PRODUCTS_REJECTED':
        return {...state, fetching: false, fetchingError: action.payload.message};
      default:
        return state;
    }
} 

/*
* PRIVATE HELPERS
*/ 

function addProduct(productObj: ProductObj, product: Product): ProductObj{
  const newProducts = productObj.products.concat(product);
  return {...productObj, fetching: false,  products: newProducts};
}

function removeProduct(productObj: ProductObj, productId: string) : ProductObj{
  const { products } = productObj;
  const currentProduct = products.filter( p => p._id === productId)[0];
  const index = products.indexOf(currentProduct);
  const newProducts = products.slice(0,index).concat(products.slice(index + 1));
  return {...productObj, products: newProducts};
}

function updateProduct(productObj: ProductObj, product: Product) : ProductObj{
  const products = productObj.products;
  const newProducts =  products.map( p => {
    if(p._id !== product._id){ 
      return p;
    }
    return {...p, ...product};
  });
  return {...productObj, products: newProducts};
}
