let BASE_URL = '';
let isDevelopment = true
if (window.location.hostname === 'localhost' && window.location.port === '3000') {
  BASE_URL = 'http://35.160.123.119:8181/'
  isDevelopment = true
} else if (window.location.hostname === 'localhost' && window.location.port === '4000') {
  BASE_URL = 'http://localhost:8181/'
  isDevelopment = true
} else if (window.location.hostname === 'localhost' && window.location.port === '8181') {
  BASE_URL = 'http://localhost:8181/'
  isDevelopment = true
} else if (window.location.hostname === '35.160.123.119' && window.location.port === '8181') {
  BASE_URL = 'http://35.160.123.119:8181/'
  isDevelopment = true
} else {
  BASE_URL = `http://${window.location.hostname}:${window.location.port}/`
  isDevelopment = false
}
console.log(window.location);
console.log(BASE_URL);
module.exports = {
  BASE_URL: BASE_URL,
  isDevelopment: isDevelopment,
  OATHU: 'oauth/token',
  FORGET: 'forgetPassword',
  LOGOUT: 'api/user/logout',
  REGISTRATION: 'api/public/user/registration',
  PRODUCT_REGISTRATION: "api/seller/add/product",
  COOKIE: 'api/public/update-cookie',
  COMMON: 'api/public/common',
  CHANGEPASSWORD: 'changePassword',
  UPDATEPASSWORD: 'updatePassword',
  PROFILE: 'api/user/profile',
  ADVANCED_SEARCH: 'api/advanced_search',
  CAR_MASTER_DATA: 'api/public/vehicle/master_data',
  GET_DASHBOARD_DATA: 'api/public/dashboard',
  GET_VEHICLE_ALL_DETAILS: 'api/public/vehicle/all_details',
  GET_VEHICLE_MODEL: 'api/public/vehicle/models',
  GET_VEHICLE_MODEL_DETAILS: 'api/public/vehicle/model_details',
  GET_VEHICLE_CATEGORY2S: 'api/public/vehicle/category2s',
  GET_VEHICLE_SEARCH_LIST: 'api/public/vehicle/list',
  GET_VEHICLE_DETAILS: 'api/public/vehicle/details',
  ADD_TO_SAVED_SEARCH: 'api/public/add/savedmysearches',
  DELETE_SAVED_SEARCH: '/api/public/delete/savedmysearches',
  GET_SAVED_SEARCH: '/api/public/getAll/savedmysearches',
  GET_ADMIN_USER_LIST: '/api/admin/get/userlist',
  GET_APPROVAL_LIST: '/api/admin/get/pending/approvallist',
  CHANGE_MEMBERSHIP: '/api/admin/update/membership'
}; 
