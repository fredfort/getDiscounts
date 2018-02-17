import axios from 'axios';

import { API } from '../model';

const USER_API = API + 'user'

export function loggin(username: string, password: string) {
  return function (dispatch) {
    dispatch(fetchUserPending());
    axios.get(USER_API).then((res) => {
      sessionStorage.setItem('token', res.data.token);
      dispatch(fetchUserFulfilled(res));
    }).catch((err) => {
      dispatch(fetchUserRejected(err));
    });
  }
}

function fetchUserPending() {
  return {
    type: 'FETCH_USER_PENDING'
  }
}

function fetchUserFulfilled(user) {
  return {
    type: 'FETCH_USER_FULFILLED',
    payload: user
  }
}

function fetchUserRejected(err) {
  return {
    type: 'FETCH_USER_REJECTED',
    payload: err
  }
}