import * as React from 'react';
import { connect } from 'react-redux';
import { loggin } from './login.action';


export class Login extends React.PureComponent<any, any>{

  username: HTMLInputElement | null;;
  password: HTMLInputElement | null;;

  login(){
    const username = (this.username) ? this.username.value : '';
    const password = (this.password) ? this.password.value : '';
    this.props.dispatch(loggin(username, password));
  }

  render(){
    return <div className="login">
        <h1>Login</h1>
        <div>
          <label>
            Username
            <input type='text' name='description' ref={username => this.username = username} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type='password' name='quantity' ref={password  => this.password = password}  />
          </label>
        </div>
        <button onClick={this.login.bind(this)}>Login</button>
    </div>
  }
}

export const LoginContainer = connect()(Login);