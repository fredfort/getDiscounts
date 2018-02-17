import { Action } from '../model';
import { User } from './user.model';



export function fetchUser(){
  return {
    type: 'FETCH_USER'
  }
}


export function setFirstName(firstName: string): Action {
  return {
    type: 'SET_FIRST_NAME', 
    payload: firstName
  }
}


export function updateUser(user: User): Action {
  return {
    type: 'UPDATE_USER', 
    payload: user
  }
}