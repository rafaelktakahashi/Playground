import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { listPostReducer } from './listPostReducer';

export default combineReducers({
  login: loginReducer,
  mainList: mainListReducer,
  listPosts: listPostReducer,
});
