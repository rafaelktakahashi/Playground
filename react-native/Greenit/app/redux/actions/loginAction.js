import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from './actionNames';

export function loginRequest(userData) {
  return {
    type: LOGIN_REQUEST,
    payload: userData,
  };
}

export function loginSuccess(loggedUser) {
  return {
    type: LOGIN_SUCCESS,
    payload: loggedUser,
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error,
  };
}
