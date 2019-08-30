let BASE_URL = '';
let isDevelopment = true
if (window.location.hostname === 'localhost') {
  BASE_URL = 'http://localhost:8080/'
  isDevelopment = true
} else {
  BASE_URL = 'http://localhost:8080/'
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
}; 
