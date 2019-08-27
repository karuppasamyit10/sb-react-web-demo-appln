import { isDevelopment } from './URL';

export function myLog(...messgae) {
  if (isDevelopment) {  
    console.log(...messgae);  
  }  
}

