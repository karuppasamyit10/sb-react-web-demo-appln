let BASE_URL = '';
let isDevelopment = true
if (window.location.hostname === 'localhost' && window.location.port===3000) {
  BASE_URL = 'http://localhost:8181/'
  isDevelopment = true
}  else if (window.location.hostname === '35.160.123.119' && window.location.port===8181) {
  BASE_URL = 'http://35.160.123.119:8181/'
  isDevelopment = true
} else {
  BASE_URL = 'http://35.160.123.119:8181/'
  isDevelopment = false
}

module.exports = {
  BASE_URL: 'http://localhost:8181/',
  isDevelopment: isDevelopment,
  OATHU: 'oauth/token',
  FORGET : 'forgetPassword',
  LOGOUT: 'api/user/logout',
  REGISTRATION: 'api/public/user/registration',
  COOKIE : 'api/update-cookie',
  CHANGEPASSWORD: 'changePassword',
  UPDATEPASSWORD: 'updatePassword',
  PROFILE : 'api/user/profile',
  ADVANCED_SEARCH : 'api/advanced_search',
  CAR_MASTER_DATA : 'api/public/vehicle/master_data',
  GET_DASHBOARD_DATA : 'api/public/dashboard',
  GET_VEHICLE_ALL_DETAILS : 'api/public/vehicle/all_details',
  GET_VEHICLE_MODEL : 'api/public/vehicle/models',
  GET_VEHICLE_MODEL_DETAILS : 'api/public/vehicle/model_details',
  GET_VEHICLE_SEARCH_LIST : 'api/public/vehicle/list',
  GET_VEHICLE_DETAILS : 'api/public/vehicle/details',
}; 
