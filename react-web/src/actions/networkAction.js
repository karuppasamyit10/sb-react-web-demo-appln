
import { ACTION_TYPES } from '../utils/Constants';

/**
 * called when changing network provider
 * @param {*} isOnline 
 */
export const networkChanged = (isOnline)=>{
  console.log('networkChanged',isOnline);
  return (dispath)=>{
    dispath(customeAction(ACTION_TYPES.NETWORK_CHANGE,{isOnline}));
  };
};


/**
 * called when there is networkProblem
 * @param {*} isNetworkProblem 
 */
export const networkProblem = (isNetworkProblem)=>{
  console.log('networkProblem',isNetworkProblem);
  return (dispath)=>{
    dispath(customeAction(ACTION_TYPES.NETWORK_PROBLEM,{isNetworkProblem}));
  };
};



/**
 * custom action for dispatch
 * @param {*} action 
 * @param {*} data 
 */
export const customeAction =(action, data)=> {
  return {
    type: action, 
    payload: data,
  };
};