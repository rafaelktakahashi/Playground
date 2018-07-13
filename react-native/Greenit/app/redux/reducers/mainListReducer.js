import {
  MAIN_LIST_REQUEST,
  MAIN_LIST_SUCCESS,
  MAIN_LIST_FAILURE,
} from '../actions/actionNames';

const initialState = {
  subreddits: [],
  isRequesting: false,
  hasError: false,
  error: null,
};

export function mainListReducer(state = initialState, action) {
  switch (action.type) {
    case MAIN_LIST_REQUEST:
      return {
        ...state,
        isRequesting: true,
        hasError: false,
      };
    case MAIN_LIST_SUCCESS:
      return {
        ...state,
        subreddits: action.payload,
        hasError: false,
      };
    case MAIN_LIST_FAILURE:
      return {
        ...state,
        hasError: true,
        error: action.payload,
      };
    default:
      return state;
  }
}
