import { takeLatest, call, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import NavigationService from '../../NavigationService';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actions/actionNames';

/**
 * Mock saga for login. Doesn't actually login anywhere,
 * and succeeds every time.
 */

// watcher saga; watches for actions dispatched to the store
// and starts the worker saga
export function* loginSaga() {
  console.log('loginSaga listening for requests.');
  yield takeLatest(LOGIN_REQUEST, workerSaga);
}

// worker saga
function* workerSaga(action) {
  // the parameter contains the stuff we need, but we
  // mostly ignore it for now
  console.log("At loginSaga's worker saga");
  try {
    if (action.payload.username !== 'default') {
      yield put({
        type: LOGIN_FAILURE,
        payload: "I'll only accept the default user.",
      });
    }
    console.log('I will show the login page.');
    // For some reason this doesn't work
    // yield put(NavigationActions.navigate({ routeName: 'LoginLoading' }));
    yield new Promise(resolve => {
      NavigationService.navigate('LoginLoading');
      resolve();
    });
    console.log('I will wait for one second.');
    yield new Promise(resolve => setTimeout(resolve, 1000));
    console.log('I will send a success.');
    const userData = {
      // userData
      username: 'user',
      email: 'user@userland.com',
      token: 'tokentokentoken',
    };
    yield put({ type: LOGIN_SUCCESS, payload: { loggedUser: userData } });
    console.log('loginSaga has sent a success.');
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error });
  }
}
