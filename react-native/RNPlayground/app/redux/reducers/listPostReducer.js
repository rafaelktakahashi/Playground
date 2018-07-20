import {
  LIST_POSTS_REQUEST,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAILURE,
} from '../actions/actionNames';

// Missing paging functionality
const initialState = {
  posts: [],
  isRequesting: false,
  hasError: false,
  error: null,
};

export function listPostReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_POSTS_REQUEST:
      return {
        ...state,
        isRequesting: true,
        hasError: false,
      };
    case LIST_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isRequesting: false,
        hasError: false,
      };
    case LIST_POSTS_FAILURE:
      return {
        ...state,
        isRequesting: false,
        hasError: true,
        error: action.payload,
      };
    default:
      return state;
  }
}
