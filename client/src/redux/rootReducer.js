import { combineReducers } from 'redux';
import linksReducer from './linksCreated/linksReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
  link: linksReducer,
  user: userReducer,
});

export default rootReducer;
