import { ACTION_TYPES } from '../utils/Constants';

let initalState ={
  isOnline: true, 
  isNetworkProblem: false,
};

const NetworkInState = (state = initalState, action)=> {    
  switch (action.type) {
    case ACTION_TYPES.NETWORK_CHANGE:
      state = {
        ...state,
        isOnline: action.payload.isOnline,
        isNetworkProblem: false,
      };
      break; 
    case ACTION_TYPES.NETWORK_PROBLEM:
      state = {
        ...state,
        isOnline: true,
        isNetworkProblem: action.payload.isNetworkProblem,
      };
      break;
      
    default:
      break;
  }
  return state;
};
export default NetworkInState;

