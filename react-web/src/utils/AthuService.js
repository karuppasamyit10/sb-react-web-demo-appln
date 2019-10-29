import { logout , registerCookie , getCommonDetails} from '../actions/userAction';
// import { myLog } from './Utility';
import store from 'store';  
import {networkChanged} from '../actions/networkAction';
import stores from '../stores';
export let userSessionTimer;
export let userTokenRenewalTimer;

export const cookiePresent = () =>{
  registerCookie();
  return true;
}

export const commonDetailsPresent = () =>{
  let userSession = store.get("userSession");
  if(userSession && !userSession.common){
    getCommonDetails()
  }
  return true;
}

export const isLoggedIn = () =>{
  if(typeof store.get('userSession') === 'object') {
    const currentDate = new Date();
    // check token expiry time
    if(!store.get('userSession') || store.get('userSession').expiry_time < currentDate.getSeconds()) {
      return false;
    }
    else {
      // start scheduleTokenRenewal timer if its not started
      if(! userSessionTimer) {
        // scheduleTokenRenewal();
      }
      // start userTokenRenewalTimer timer if its not started
      if(! userTokenRenewalTimer) {
        tokenRenewalTimeout();
      }
    }
    
    return true;
  }
  // if userSession object is not present return false
  return false;
};

// logout user when user is not active for 30 mins
export const scheduleTokenRenewal = () => {
  let sessionTime = 0;
  userSessionTimer = setInterval(() => {
    // myLog('interviewing the interval');
    sessionTime++;
    // logout user when session expires
    if(sessionTime > 120) {
      logout(()=> {
        alert('Seesion timeout');
        window.location.href='/';
      } );
    }
  }, 1000);
};

// timer to check the access token validity and renew token before it expires
export const tokenRenewalTimeout = () => {

  userTokenRenewalTimer = setInterval(() => {
    // myLog('interviewing the userTokenRenewalTimer');
    let currentDate = new Date();
    if(!store.get('userSession')) {
      return false
    }
    if(store.get('userSession').expiry_time < (currentDate.getSeconds() + 12000)) {  
      alert('call Refersh token');
      // renewToken()
    }
  }, 1000);
};

const keyDownTextField = (e) => {
  // myLog('keyDownTextField');
  // if(isLoggedIn()) {
  //   restartInterval();
  // }
};

function keyDownEvent(e) {
  // myLog('keyDownEvent');

  // if(isLoggedIn()) {
  //   restartInterval();
  // }
}

function mouseMoveEvent(e) {
  // myLog('mouseMoveEvent');

  // if(isLoggedIn()) {
  //   restartInterval();
  // }
}

// Listen to user keypress and reset timer
document.addEventListener('keypress', keyDownTextField, false);

// Listen to user keypress and reset timer
document.addEventListener('keypress', keyDownEvent, false);

// Listen to user keypress and reset timer
document.addEventListener('mousemove', mouseMoveEvent, false);

window.addEventListener('offline', (e) =>{
  stores.dispatch(networkChanged(false));
});

window.addEventListener('online', (e)=>{ 
  stores.dispatch(networkChanged(true));
});
