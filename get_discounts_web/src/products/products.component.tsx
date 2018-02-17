import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { State } from '../model';
import { updateProduct, addProduct, removeProduct } from './products.action';
import { Product } from './product/product.component';
import { Product as ProductModel, ProductObj } from './products.model'
import { Loading } from '../loading/loading.component';
import { Error } from '../error/error.component';



export class Products extends React.PureComponent<State, any>{


  render() {
    const productObj = this.props.productObj;

    const newProductElem = this.getNewProductElement();
    const productsElem = this.getProductsElements(productObj);

    if (productObj.fetching) { return <Loading />; }
    if (productObj.fetchingError) { return <Error message={productObj.fetchingError} />; }

    return <div className='products'>
      <h1>Here is the products page</h1>
      {newProductElem} <br />
      <div>Current Products</div>
      {(productsElem.length) ? productsElem : <span>No product available</span>}
    </div>
  }

  handleInputChange(product: ProductModel, event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.type === 'number' ? parseFloat(target.value) : target.value;
    const name = target.name;
    this.props.dispatch(updateProduct({ ...product, [name]: value }))
  }

  dispatchAddProduct(p: ProductModel) {
    this.props.dispatch(addProduct(p));
  }

  dispatchRemoveProduct(p: ProductModel) {
    this.props.dispatch(removeProduct(p));
  }

  getProductsElements(productObj) {
    return productObj.products.map((p: ProductModel) => {
      return <div className='products-description' key={p._id}>
        <input type='text' name="description" onChange={this.handleInputChange.bind(this, p)} value={p.description} />
        <input type='number' min="0" name="quantity" onChange={this.handleInputChange.bind(this, p)} value={p.quantity.toString()} />
        <input type='checkbox' name="active" onChange={this.handleInputChange.bind(this, p)} checked={p.active} />
        <button onClick={this.dispatchRemoveProduct.bind(this, p)}>Remove</button>
      </div>;
    });
  }

  getNewProductElement() {
    const newProduct = { description: '', quantity: 0, active: false };
    return <React.Fragment>
      <div>New Product</div>
      <Product {...newProduct} addProduct={this.dispatchAddProduct.bind(this)} />
    </React.Fragment>
  }
}

/*
* REDUX CONNECT
*/

function mapStateToProps(state: State) {
  return { productObj: state.productObj };
}

export const ProductsContainer = connect(mapStateToProps)(Products);

