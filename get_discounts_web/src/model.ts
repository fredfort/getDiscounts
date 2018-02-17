import { User } from './user/user.model';
import { ProductObj } from './products/products.model';


export const API: string = 'http://localhost:3000/';

/*
* Applictation's state
*/

export interface State {
  productObj: ProductObj;
  user?: User;
  dispatch?: any;
}

/*
* REDUX
*/

export interface Action {
  type: string;
  payload?: any;
}
