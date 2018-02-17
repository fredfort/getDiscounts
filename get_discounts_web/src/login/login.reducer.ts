
import { Action } from '../model';

const defaultState = {
  isFetching: false,
  fetchingError: false,
  user: {}
}

export function loginReducer(state = defaultState, action: Action) {
  switch (action.type) {
    case 'FETCH_USER_PENDING':
      return { ...state, isFetching: true }
    case 'FETCH_USER_FULFILLED':
      return { ...state, isFetching: false, user: action.payload.data }
    case 'FETCH_USER_REJECTED':
      return { ...state, isFetching: false, fetchingError: true }
    default:
      return state;
  }
}