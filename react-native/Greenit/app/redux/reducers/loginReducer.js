import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../actions/actionNames';

const initialState = {
  login: null,
  user: null,
  isLoggingIn: false,
  isLoggingOut: false,
  hasError: false,
  error: null,
};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        login: action.userData,
        isLoggingIn: true,
        isLoggingOut: false,
        hasError: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.loggedUser,
        isLoggingIn: false,
        isLoggingOut: false,
        hasError: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isLoggingOut: false,
        hasError: true,
        error: action.payload,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingIn: false,
        isLoggingOut: true,
        hasError: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggingOut: false,
        user: null,
        hasError: false,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isLoggingOut: false,
        hasError: true,
        error: action.payload,
      };
  }
}
