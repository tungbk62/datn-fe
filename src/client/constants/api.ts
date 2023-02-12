const BASE_URL_API = process.env.NEXT_PUBLIC_CURRENT_WEBSITE; // finatech.io

const API_VERSION = "/api";
const AUTH = "/auth";
const USERS = "/user";
const PROJECT = "/projects";
const ISSUE = "/issues";

export const api = {
  LOGIN: BASE_URL_API + API_VERSION + AUTH + "/login",
  REGISTER: BASE_URL_API + API_VERSION + AUTH + "/register",
  GET_USER_INFOR: BASE_URL_API + API_VERSION + USERS + "/user-info",
  /// projects
  CREAT_PROJECT: BASE_URL_API + API_VERSION + PROJECT + "/create",
  GET_PROJECT_OF_USER: BASE_URL_API + API_VERSION + PROJECT + "/get-project",

  /// issues
  CREAT_ISSUE: BASE_URL_API + API_VERSION + ISSUE +"/create",
  GET_ISSUE_OF_PROJECT: BASE_URL_API + API_VERSION + ISSUE +"/is-in-project",
};
