import { GAIN_PRIVILEGES, LOSE_PRIVILEGES } from './actionNames';

export function gainPrivileges() {
  return {
    type: GAIN_PRIVILEGES,
    payload: null,
  };
}

export function losePrivileges() {
  return {
    type: LOSE_PRIVILEGES,
    payload: null,
  };
}
