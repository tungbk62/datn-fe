const BASE_URL_API = process.env.NEXT_PUBLIC_CURRENT_WEBSITE; // housing-anywhere

const API_VERSION = "";
const AUTH = "/auth";
const USER = "/user";
const POST = "/post";
const PUBLIC = "/public";
const PASSWORD = "/password";
const ADMIN = "/admin";
const BUSINESS = "/business";
const ADDRESS = "/address"
const PROVINCE = "/province"

export const api = {
  LOGIN: BASE_URL_API + API_VERSION + AUTH + "/login",
  REGISTER: BASE_URL_API + API_VERSION + AUTH + "/register",
  GET_USER_INFOR: BASE_URL_API + API_VERSION + USER + "/user-info",

  /// User
  LOGOUT: BASE_URL_API + AUTH + "/logout",

  /// ADMIN
  SIGN_UP_ACCOUNT_ADMIN: BASE_URL_API + AUTH + "/signup-admin",

  GET_LIST_USER_BUSINESS: BASE_URL_API + USER + ADMIN,

  GET_DETAIL_OF_USER: BASE_URL_API + USER,

  LOCK_ACCOUNT_ADMIN: BASE_URL_API + USER + ADMIN + "/locked/4",

  DELETE_MULTI_USERS: BASE_URL_API + USER + ADMIN,

  /// Business

  SIGN_UP_ACCOUNT_BUSINESS: BASE_URL_API + AUTH + PUBLIC + "/signup",
  LOGIN_ACCOUNT_BUSINESS: BASE_URL_API + AUTH + PUBLIC + "/signin",

  /// POST

  GET_TYPE_POST: BASE_URL_API + POST + "/type",

  CHANGE_TYPE_OF_POST: BASE_URL_API + POST + BUSINESS + "/type/23",

  CHANGE_STATUS_OF_POST: BASE_URL_API + POST + "/admin/3",

  DELETE_MULTI_POSTS: BASE_URL_API + POST + BUSINESS,

  HIDE_POST: BASE_URL_API + BUSINESS + "/hide/3",

  /// province

  GET_LIST_PROVINCE : BASE_URL_API + ADDRESS + PUBLIC + PROVINCE,
  GET_DETAIL_PROVINCE : BASE_URL_API + ADDRESS + PUBLIC + PROVINCE
};
