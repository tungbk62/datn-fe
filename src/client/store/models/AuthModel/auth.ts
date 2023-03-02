import { IEmployeeState, IAuthState } from "./interface";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import axios from "@app-client/helpers/axios";
// import { api } from "@app-client/constants";
import { formatDateUI, showMessage, getQueryURL } from "@app-client/helpers";
import {
  setCommonAuthorizationToken,
  removeCommonAuthorizationToken,
} from "@app-client/helpers";
import { api } from "@app-client/constants";
const SUCCESS_CODE = 200;

export const authModel: any = {
  state: {
    token: "",
    userInfo: null,
    userData: null,
    listProvince: null,
    detailProvince: null,
    isSignedIn: false,
    isAdmin: false,
    isBusiness: false,
  } as any, // initial state
  reducers: {
    setToken(state: any, payload: any) {
      Cookies.set("userToken", payload);
      setCommonAuthorizationToken();
      return { ...state, token: payload };
    },
    setListProvince: (state: any, payload: string) => {
      return {
        ...state,
        listProvince: payload,
      };
    },
    setDetailUser: (state: any, payload: string) => {
      return {
        ...state,
        userInfo: payload,
      };
    },
    setDetailProvince: (state: any, payload: string) => {
      return {
        ...state,
        detailProvince: payload,
      };
    },
    setUserInfo(state: any, payload: any) {
      return {
        ...state,
        userInfo: {
          employeeId: payload.id,
          fullname: payload.fullname,
          email: payload.email,
          phone: payload.phone,
          photo: payload.photo,
          role: payload.role,
          isAdmin: payload.isAdmin,
        },
      };
    },
    setUserData: (state: any, payload: any) => {
      return {
        ...state,
        userData: payload,
      };
    },
    setIsSignedIn: (state: any, payload: any) => {
      return {
        ...state,
        isSignedIn: payload,
      };
    },
    setIsAdmin: (state: any, payload: any) => {
      return {
        ...state,
        isAdmin: payload,
      };
    },
    setIsBusiness: (state: any, payload: any) => {
      return {
        ...state,
        isBusiness: payload,
      };
    },
  },
  effects: (dispatch: any) => ({
    async getListProvince(payload: any, state: any) {
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
    async getDetailUser(payload: any, state: any) {
      try {
        const res = await axios.get(api.GET_DETAIL_OF_USER, payload);
        if ((res.status = SUCCESS_CODE)) {
          dispatch.authModel.setDetailUser(res.data);
          return res?.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getDetailProvince(payload: any, state: any) {
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
    async register(payload: any, state: any) {
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
    async login(payload: any, state: any) {
      try {
        const res = await axios.post(api.LOGIN_ACCOUNT_BUSINESS, payload);
        if (res.status !== SUCCESS_CODE) {
          showMessage(res?.data?.message, "error");
          return;
        }
        const { data } = res;
        showMessage(res?.data?.message ?? "Đăng nhập thành công", "success");
        dispatch.authModel.setToken(data?.accessToken);
        dispatch.authModel.setIsSignedIn(true);
        if (data?.type === "ADMIN") {
          dispatch.authModel.setIsAdmin(true);
        } else if (data?.type === "BUSINESS") {
          dispatch.authModel.setIsBusiness(true);
        }
        return data;
      } catch (err) {}
    },
    async logout(payload: any, state: any) {
      try {
        dispatch.authModel.setUserData({});
        dispatch.authModel.setIsSignedIn(false);
        dispatch.authModel.setIsAdmin(false);
        const res = await axios.post(api.LOGOUT);
        await removeCommonAuthorizationToken();
        // dispatch.authModel.setToken("")
        if (res.status !== SUCCESS_CODE) {
          // showMessage(res?.data?.message, "error");
          return;
        }
        const { data } = res;
        // showMessage(res?.data?.message ?? "Đăng nhập thành công", "success");

        return data;
      } catch (err) {}
    },
  }),
};
