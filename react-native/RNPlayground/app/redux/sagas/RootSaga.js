import { put, takeEvery, all, call } from 'redux-saga/effects';
import { loginSaga } from './LoginSaga';
import { logoutSaga } from './LogoutSaga';

/**
 * This syntax eludes me, but it works.
 */
export default function* rootSaga() {
  yield all([call(loginSaga), call(logoutSaga)]);
}
