let BASE_URL = '';
let isDevelopment = true
if (window.location.hostname === 'localhost') {
  BASE_URL = 'http://35.160.123.119:8181/'
  isDevelopment = true
} else {
  BASE_URL = 'http://35.160.123.119:8181/'
  isDevelopment = false
}

module.exports = {
  BASE_URL: BASE_URL,
  isDevelopment: isDevelopment,
  OATHU: 'oauth/token',
  FORGET : 'forgetPassword',
  LOGOUT: 'api/user/logout',
  REGISTRATION: 'api/public/user/registration',
  COOKIE : 'api/public/update-cookie',
  CHANGEPASSWORD: 'changePassword',
  UPDATEPASSWORD: 'updatePassword',
  PROFILE : 'api/user/profile',
  ADVANCED_SEARCH : 'api/advanced_search',
  CAR_MASTER_DATA : 'api/public/car/master_data',
  GET_DASHBOARD_DATA : 'api/public/dashboard',
  GET_CAR_LIST : 'api/public/car/all_details',
  GET_CAR_MODEL : 'api/public/car/models',
  GET_CAR_MODEL_DETAILS : 'api/public/car/model_details',
  GET_VEHICLE_SEARCH_LIST : 'api/public/vehicleList',
  GET_VEHICLE_DETAILS : 'api/public/vehicleDetails',
}; 
