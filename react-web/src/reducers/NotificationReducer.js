import { ACTION_TYPES } from '../utils/Constants';

const notificationReducer = (state = {
  notificationDetails: {},
}, action)=> {    
  switch (action.type) {
    case ACTION_TYPES.SHOW_NOTIFICATION:
      state = {
        ...state,
        notificationDetails: action.payload,
      };
      break;
    default:
      break;
  }
  return state;
};
export default notificationReducer;

