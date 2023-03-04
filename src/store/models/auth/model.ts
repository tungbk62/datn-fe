import { createModel } from "@rematch/core";
import Cookies from "js-cookie";

import axios, { apiHelper } from "@helpers/axios";
import {
  setCommonAuthorizationToken,
  removeCommonAuthorizationToken,
  showMessage,
} from "@src/helpers";
import { api } from "@src/constants";
import { RootModel } from "..";
import { UserInfo, UserRole, LoginSchema, LoginResponse } from "./interface";

const SUCCESS_CODE = 200;

interface AuthState {
  token: string;
  userInfo: UserInfo | null;
  listProvince: any;
  detailProvince: any;
  isSignedIn: boolean;
  type: UserRole;
}

export const authModel = createModel<RootModel>()({
  state: {
    token: "",
    userInfo: null,
    listProvince: null,
    detailProvince: null,
    isSignedIn: false,
    type: "CUSTOMER",
  } as AuthState, // initial state
  reducers: {
    setToken(state, payload) {
      Cookies.set("userToken", payload);
      setCommonAuthorizationToken();
      return { ...state, token: payload };
    },
    setListProvince: (state, payload: string) => {
      return {
        ...state,
        listProvince: payload,
      };
    },
    setUserDetail: (state, payload: UserInfo | null) => {
      return {
        ...state,
        userInfo: payload,
      };
    },
    setDetailProvince: (state, payload: string) => {
      return {
        ...state,
        detailProvince: payload,
      };
    },
    setIsSignedIn: (state, payload: any) => {
      return {
        ...state,
        isSignedIn: payload,
      };
    },
  },
  effects: dispatch => ({
    async getListProvince(payload?: any) {
      try {
        const res = await axios.get(api.GET_LIST_PROVINCE, payload);
        if ((res.status = SUCCESS_CODE)) {
          dispatch.authModel.setListProvince(
            res.data.map((item: any) => ({ value: item.id, label: item.name })),
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getUserDetail() {
      try {
        const res = await apiHelper.get<UserInfo>(api.GET_DETAIL_OF_USER);
        console.log("userdetail", res);
        dispatch.authModel.setUserDetail(res);
        return res;
      } catch (error: any) {
        showMessage(error.message, "error");
      }
    },
    async getDetailProvince(payload: string) {
      try {
        const res = await axios.get(`${api.GET_LIST_PROVINCE}/${payload}`);
        if ((res.status = SUCCESS_CODE)) {
          console.log(res.data?.district);
          dispatch.authModel.setDetailProvince(
            res.data.district.map((item: any) => ({
              value: item.wards,
              label: item.name,
              id: item?.id,
            })),
          );
          return res.data.district.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    },
    async register(payload: any) {
      try {
        const res = await axios.post(api.SIGN_UP_ACCOUNT_BUSINESS, payload);
        if (res.status !== SUCCESS_CODE) {
          showMessage(res?.data?.message, "error");
          return;
        }
        const { data } = res;
        showMessage(res?.data?.message, "success");
        return data;
      } catch (err) {}
    },
    async login(payload: LoginSchema) {
      try {
        const data = await apiHelper.post<LoginSchema, LoginResponse>(
          api.LOGIN_ACCOUNT_BUSINESS,
          payload,
        );
        showMessage("Đăng nhập thành công", "success");
        dispatch.authModel.setToken(data?.accessToken);
        dispatch.authModel.setIsSignedIn(true);
        return data;
      } catch (err: any) {
        showMessage(err.message, "error");
      }
    },
    async logout() {
      try {
        dispatch.authModel.setUserDetail(null);
        dispatch.authModel.setIsSignedIn(false);
        const res = await axios.post(api.LOGOUT);
        removeCommonAuthorizationToken();
        if (res.status !== SUCCESS_CODE) {
          return;
        }
        const { data } = res;

        return data;
      } catch (err) {}
    },
  }),
});
