module.exports = {
  HTTP_CODE: {
    SUCCESS: 200,
    INSERT_SUCESS: 201,
    AUTHENTICATION_FAILURE: 401,
    REQUIRED_MISSING: 403,
    REQUEST_TIMED_OUT_FAILURE: 500,
    INPUT_VALIDATION_ERROR: 400,
    NO_DATA_FOUND: 404
  },
  COLOR: {
    THEME: "#5ec3e3"
  },

  PATH: {
    INDEX: "/",
    SIGIN: "/signin",
    REGISTRATION: "/registration",
    DASHBOARD: "/",
    UPDATEPASSWORD: "/update_password",
    CHANGEPASSWORD: "/change_password",
    FORGET: "/forgot_password",
    SEARCH: "/dashboard/search",
    ADVANCED_SEARCH: "/dashboard/advanced-search",
    ABOUT_US: "/about-us",
    CONTACT_US: "/contact-us",
    MEDIA: "/media",
    MAGZINE : "/magazine",
    ADVERTISE: "/advertise",
    WHAT_WE_DO: "/about-us/what-we-do",
    WHO_WE_ARE: "/about-us/who-we-are",
    HOW_WE_WORK: "/about-us/how-we-work",
    HOW_TO_ORDER: "/about-us/how-to-order",
    HOW_TO_USE_HGS: "/about-us/how-to-order/how-to-use-hgs",

    PAYMENT: "/about-us/how-to-order/payment",
    FAQ: "/about-us/how-to-order/faq",
    CONTACT_STAFF: "/about-us/how-to-order/contact-staff",

    SPECIAL_SERVICES: "/about-us/how-we-work/special-services",
    SHIPPING: "/about-us/what-we-do/container-shipping",
    MEMBERSHIPFEE: "/membership-fee",
    PRODUCT_REGISTRATION: "/product-registration",
    REGISTEREDITEMS: "/registered-items",
    FUEL_CONVERSION: "/about-us/what-we-do/fuel-conversion",
    CAR_ACCESSORIES: "/about-us/what-we-do/car-accessories",
    PARTS_EXPRESS: "/about-us/what-we-do/parts-express",
    SEARCH_DETAIL: "/search-detail",
    PARTS_DETAIL: "/parts-detail",
    transport: "/transport",
    transport_schedule: "/transport/schedule",
    ADMIN_MY_ACCOUNT: "/admin/activity",

    PRODUCT_LIST: "/product-list",
    APPROVAL_LIST: "/product-approval-list",
    PARTNER: "/partner",
    PARTNER_CONTACT: "/partner/contact",
    PARTNER_COUNTRY: "/partner/country",
    PARTNER_SUB_DESCRIPTION: "/partner/sub-description",
    SELLER: "/seller",
    HARASOW_SELLER: "/seller/harasow-seller",
    COMMUNITY: "/community"
  },

  ACTION_TYPES: {
    LOGOUT_USER: "LOGOUT_USER",
    LOGIN_USER: "LOGIN_USER",
    FORGET_PASSWORD: "FORGET_PASSWORD",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",
    UPDATE_PROFILE: "UPDATE_PROFILE",
    USER_DETAILS: "USER_DETAILS",
    SHOW_NOTIFICATION: "SHOW_NOTIFICATION",
    PATIENT_DETAIL: "PATIENT_DETAIL",
    NETWORK_CHANGE: "NETWORK_CHANGE",
    NETWORK_PROBLEM: "NETWORK_PROBLEM",
    CHANGE_UPLOADING_STATUS: "CHANGE_UPLOADING_STATUS"
  }
};
