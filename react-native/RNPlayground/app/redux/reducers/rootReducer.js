import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { listPostReducer } from './listPostReducer';
import { mainListReducer } from './mainListReducer';
import { privilegesReducer } from './privilegesReducer';

export default combineReducers({
  login: loginReducer,
  mainList: mainListReducer,
  listPosts: listPostReducer,
  privileges: privilegesReducer,
});
