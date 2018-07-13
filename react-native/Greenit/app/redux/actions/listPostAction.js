import {
  LIST_POSTS_REQUEST,
  LIST_POSTS_FAILURE,
  LIST_POSTS_SUCCESS,
} from './actionNames';

export function listPostsRequest() {
  return {
    type: LIST_POSTS_REQUEST,
  };
}

export function listPostsSuccess(list) {
  return {
    type: LIST_POSTS_SUCCESS,
    payload: list,
  };
}

export function listPostsFailure(error) {
  return {
    type: LIST_POSTS_FAILURE,
    payload: error,
  };
}
