import Axios from "axios";
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

export function setCommonAuthorizationToken() {
  const userToken = Cookies.get("userToken");
  if (userToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;
  }
}

export function removeCommonAuthorizationToken() {
  delete axios.defaults.headers.common.Authorization;
  Cookies.remove("userToken");
}

export interface ApiResponse<T> {
  data: T;
}

export const apiHelper = {
  get: async function <T>(url: string): Promise<T> {
    const response = await axios.get<T>(url);
    return response.data;
  },
  post: async function <TRequest, TResponse>(
    url: string,
    data: TRequest,
    config?: any,
  ): Promise<ApiResponse<TResponse>> {
    const response = await axios.post<ApiResponse<TResponse>>(
      url,
      data,
      config,
    );
    return response.data;
  },
  put: async function <TRequest, TResponse>(
    url: string,
    data: TRequest,
  ): Promise<ApiResponse<TResponse>> {
    const response = await axios.put<ApiResponse<TResponse>>(url, data);
    return response.data;
  },
  patch: async function <TRequest, TResponse>(
    url: string,
    data: TRequest,
  ): Promise<ApiResponse<TResponse>> {
    const response = await axios.patch<ApiResponse<TResponse>>(url, data);
    return response.data;
  },
  delete: async function <TResponse>(
    url: string,
  ): Promise<ApiResponse<TResponse>> {
    const response = await axios.delete<ApiResponse<TResponse>>(url);
    return response.data;
  },
};
