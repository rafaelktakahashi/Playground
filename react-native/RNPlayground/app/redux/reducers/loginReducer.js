import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../actions/actionNames';

// I probably made a mistake by keeping
// login and user separately.
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
        login: action.payload,
        isLoggingIn: true,
        isLoggingOut: false,
        hasError: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.loggedUser,
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
        login: null, // this resets login info
        user: null, // this resets logged user info
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
    default:
      return state;
  }
}
