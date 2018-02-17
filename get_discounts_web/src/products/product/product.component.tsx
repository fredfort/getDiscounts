import * as React from 'react';
import { Product as ProductModel} from '../products.model';

export class Product extends React.PureComponent<any, any>{

  newProductDescription: HTMLInputElement | null;
  newProductQuantity: HTMLInputElement | null;
  newProductActive: HTMLInputElement | null;

  addProduct(){
    const description = (this.newProductDescription) ? this.newProductDescription.value : '';
    const quantity = (this.newProductQuantity) ? parseFloat(this.newProductQuantity.value) : '';
    const active = (this.newProductActive) ? this.newProductActive.checked : '';
    this.props.addProduct({ description, quantity, active });
  }

  render(){
    return <div>
        <input type='text' name='description' ref={desc => this.newProductDescription = desc} defaultValue={this.props.description}/>
        <input type='number' name='quantity' ref={qte  => this.newProductQuantity = qte} defaultValue={this.props.quantity} />
        <input type='checkbox' name='active' ref={active => this.newProductActive = active} defaultChecked={this.props.active} />
        <button onClick={this.addProduct.bind(this)}>Add</button>
    </div>
  }


}