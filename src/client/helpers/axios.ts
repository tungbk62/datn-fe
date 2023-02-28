import Axios from "axios";
import { dispatch, store } from "@app-client/store";
import Cookies from "js-cookie";
const axios = Axios.create();
setCommonAuthorizationToken();

// Add a request interceptor
axios.interceptors.request.use(
  async (config: any) => {
    const userToken = await Cookies.get("userToken");
    config.headers["Authorization"] = "Bearer " + userToken || "";
    // Do something before request is sent
    return config;
    // Do something before request is sent
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);
// Add a response interceptor
axios.interceptors.response.use(
  response => {
    return response;
  },
  async (error: any) => {
    // handleAxiosErrorRequest(error);
    return Promise.reject(error);
  },
);

export default axios;

export async function setCommonAuthorizationToken() {
  const userToken = await Cookies.get("userToken");
  if (userToken) {
    axios.defaults.headers.common.Authorization = "Bearer " + userToken;
  }
}

export async function removeCommonAuthorizationToken() {
  delete axios.defaults.headers.common.Authorization;
  await Cookies.remove("userToken");
}
