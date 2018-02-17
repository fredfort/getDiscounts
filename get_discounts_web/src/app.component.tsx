import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import { ProductsContainer } from './products/products.component';
import { UserContainer } from './user/user.component';
import { Navigation } from './navigation/navigation.component';
import { LoginContainer } from './login/login.component';
import { store } from './store';

import { fetchProducts } from './products/products.action'
import { fetchUser } from './user/user.action'


export class App extends React.PureComponent<any, any>{

  componentDidMount() {
    //Load data - TODO FIGURE OUT WHERE THE BEST PLACE TO DO THAT IS
    // store.dispatch(fetchProducts());
    // store.dispatch(fetchUser());
  }


  render() {

    var isAuthenticated = (sessionStorage.getItem('token'));
    console.log(process.env.NODE_ENV);

    return <Provider store={store}>
      {(isAuthenticated) ? 
        <BrowserRouter>
          <div>
            <Navigation />
            <Switch>
              <Route exact path='/' component={ProductsContainer} />
              <Route path='/settings' component={UserContainer} />
            </Switch>
          </div>
        </BrowserRouter> :
        <LoginContainer />
      }
      </Provider>
  }
}