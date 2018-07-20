import { takeLatest, call, put } from 'redux-saga/effects';
import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../actions/actionNames';

export function* logoutSaga() {
  yield takeLatest(LOGOUT_REQUEST, workerSaga);
}

function* workerSaga(action) {
  yield put({ type: LOGOUT_SUCCESS });
}
