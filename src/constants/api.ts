// const BASE_URL_API = process.env.NEXT_PUBLIC_CURRENT_WEBSITE; // housing-anywhere
const BASE_URL_API = "http://13.229.115.96:8080";
const API_VERSION = "";
const AUTH = "/auth";
const USER = "/user";
const POST = "/post";
const PUBLIC = "/public";
const ADMIN = "/admin";
const BUSINESS = "/business";
const ADDRESS = "/address";
const PROVINCE = "/province";

export const api = {
  GET_USER_INFOR: BASE_URL_API + API_VERSION + USER + "/user-info",

  /// User
  LOGOUT: BASE_URL_API + AUTH + "/logout",

  /// ADMIN
  SIGN_UP_ACCOUNT_ADMIN: BASE_URL_API + AUTH + "/signup-admin",

  GET_LIST_USER_BUSINESS: BASE_URL_API + USER + ADMIN,

  GET_DETAIL_OF_USER_BUSINESS: BASE_URL_API + USER + ADMIN,

  GET_DETAIL_OF_USER: BASE_URL_API + USER,

  LOCK_ACCOUNT_ADMIN: BASE_URL_API + USER + ADMIN + "/locked",

  DISPLAY_REVIEW_ADMIN: BASE_URL_API + USER + ADMIN + "/display-review",

  DELETE_MULTI_USERS: BASE_URL_API + USER + ADMIN,

  ADMIN_GET_ALL_POST: BASE_URL_API + POST + ADMIN + "/list",

  /// Business

  SIGN_UP_ACCOUNT_BUSINESS: BASE_URL_API + AUTH + PUBLIC + "/signup",
  LOGIN_ACCOUNT_BUSINESS: BASE_URL_API + AUTH + PUBLIC + "/signin",

  GET_MY_POST: BASE_URL_API + POST + BUSINESS + "/list",

  /// POST

  GET_TYPE_POST: BASE_URL_API + POST + "/type",

  CHANGE_TYPE_OF_POST: BASE_URL_API + POST + BUSINESS + "/type",

  CHANGE_STATUS_OF_POST: BASE_URL_API + POST + "/admin/3",

  DELETE_MULTI_POSTS: BASE_URL_API + POST + BUSINESS,

  HIDE_POST: BASE_URL_API + BUSINESS + "/hide/3",

  CREATE_POST_BUSINESS: BASE_URL_API + POST + BUSINESS,

  GET_DETAIL_POST_BUSINESS: BASE_URL_API + POST + BUSINESS,

  /// province

  GET_LIST_PROVINCE: BASE_URL_API + ADDRESS + PUBLIC + PROVINCE,
  GET_DETAIL_PROVINCE: BASE_URL_API + ADDRESS + PUBLIC + PROVINCE,

  /// publish

  GET_PUBLISH_POST: BASE_URL_API + POST + PUBLIC + "/list",

  GET_DETAIL_PUBLISH_POST: BASE_URL_API + POST + PUBLIC,
  listFeedback: (userId: number) => `${BASE_URL_API}/review/public/${userId}`,
  listReport: `${BASE_URL_API}/post/admin/report`,
  typeEstate: `${BASE_URL_API}/type-estate/public`,
  notifications: `${BASE_URL_API}/notification/business/list`,
};
