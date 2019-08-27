
import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import NotificationReducer from './NotificationReducer';
import NetworkInState from './networkReducer';

const rootReducer = combineReducers({
  UserReducer,
  NotificationReducer,
  NetworkInState,
});

export default rootReducer;