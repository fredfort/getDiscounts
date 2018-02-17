import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../model';
import { setFirstName, updateUser } from './user.action'

export class User extends React.PureComponent<any, any> {

  firstName: HTMLInputElement | null;

  handleSubmit(event: any) {
    const firstName = (this.firstName) ? this.firstName.value : '';
    const lastName = (this.refs.lastName as HTMLInputElement).value;
    this.props.dispatch(updateUser({ firstName, lastName }));
    event.preventDefault();
  }

  render() {
    const { user } = this.props;
    return <div className="user">
      <h1>User page {user.firstName} {user.lastName}</h1>
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:<input type="text" ref={firstName => this.firstName = firstName} defaultValue={user.firstName} />
        </label>
        <br /> <br />
        <label>
          Last Name:<input type="text" ref="lastName" defaultValue={user.lastName} />
        </label>
        <br /> <br />
        <button type="button" onClick={this.handleSubmit.bind(this)}>Update User</button>
      </form>
    </div>
  }
}



function mapStateToProps(state: State) {
  return {
    user: state.user
  };
}

export const UserContainer = connect(mapStateToProps)(User);