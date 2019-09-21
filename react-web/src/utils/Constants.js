module.exports = {
    HTTP_CODE: {
      SUCCESS : 200,
      INSERT_SUCESS: 201,
      AUTHENTICATION_FAILURE : 401,
      REQUIRED_MISSING : 403,
      REQUEST_TIMED_OUT_FAILURE : 500,
      INPUT_VALIDATION_ERROR :400,
      NO_DATA_FOUND:404,
    },
    COLOR:{
      THEME: '#5ec3e3', 
    },

    PATH: {
      INDEX: '/',
      SIGIN : '/signin',
      REGISTRATION: '/registration',
      DASHBOARD: '/',
      UPDATEPASSWORD: '/update_password',
      CHANGEPASSWORD: '/change_password',
      FORGET: '/forgot_password',
      SEARCH : '/dashboard/search',
      ADVANCED_SEARCH : '/dashboard/advanced-search',
      ABOUT_US : '/about-us',
      WHAT_WE_DO : '/about-us/what-we-do'
    },

    ACTION_TYPES: {
      LOGOUT_USER: 'LOGOUT_USER',
      LOGIN_USER: 'LOGIN_USER',
      FORGET_PASSWORD: 'FORGET_PASSWORD',
      CHANGE_PASSWORD:'CHANGE_PASSWORD',
      UPDATE_PROFILE:'UPDATE_PROFILE',
      USER_DETAILS:  'USER_DETAILS',
      SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
      PATIENT_DETAIL: 'PATIENT_DETAIL',
      NETWORK_CHANGE:'NETWORK_CHANGE',
      NETWORK_PROBLEM:'NETWORK_PROBLEM',
      CHANGE_UPLOADING_STATUS : 'CHANGE_UPLOADING_STATUS',
    },
}