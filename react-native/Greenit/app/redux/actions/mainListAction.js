import {
  MAIN_LIST_REQUEST,
  MAIN_LIST_SUCCESS,
  MAIN_LIST_FAILURE,
} from './actionNames';

/**
 * Action creator for the list of subreddits
 */
export function mainListRequest() {
  return {
    type: MAIN_LIST_REQUEST,
  };
}

export function mainListSuccess(list) {
  return {
    type: MAIN_LIST_SUCCESS,
    payload: list,
  };
}

export function mainListFailure(error) {
  return {
    type: MAIN_LIST_FAILURE,
    payload: error,
  };
}
