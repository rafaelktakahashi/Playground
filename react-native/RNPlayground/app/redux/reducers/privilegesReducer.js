import { GAIN_PRIVILEGES, LOSE_PRIVILEGES } from '../actions/actionNames';

const initialState = {
  userHasPrivileges: false,
};

/**
 * I know this doesn't make much sense. I just wanted to try
 * another state other than logged in / logged out.
 */
export function privilegesReducer(state = initialState, action) {
  switch (action.type) {
    case GAIN_PRIVILEGES:
      return { ...state, userHasPrivileges: true };
    case LOSE_PRIVILEGES:
      return { ...state, userHasPrivileges: false };
    default:
      return state;
  }
}
