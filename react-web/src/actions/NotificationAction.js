import { ACTION_TYPES } from "../utils/Constants";
/**
 * showNotification
 * @param {String} message 
 * @param {String} type 
 */
export const showNotification = (message, type)=>{
  return (dispath)=>{
    dispath(customeAction(ACTION_TYPES.SHOW_NOTIFICATION,{
      message,
      type,
      status:true,
    }))
  }
}

/**
 * clears the notification
 */
export const clearNotification = () =>{
  return (dispath)=>{
    dispath(customeAction(ACTION_TYPES.CLEAR_NOTIFICATION,null))
  }
}

/**
 * custom action for dispatching own action types
 * @param {String} action 
 * @param {Object} data 
 */
export const customeAction =(action, data)=> {
  return {
    type: action, 
    payload: data,
  }
}
