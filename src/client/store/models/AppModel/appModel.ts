import { dispatch } from "@app-client/store/store";
import { IUserState, IAppModel } from "./interface";
import Cookies from "js-cookie";
import axios from "@app-client/helpers/axios";
// import axios from "axios";
import { api } from "@app-client/constants";
import { formatDateUI, showMessage } from "@app-client/helpers";
import { setCommonAuthorizationToken } from "@app-client/helpers";
export const appModel: any = {
  state: {
    notiState: false,
    notiContent: "",
    notiTitle: "",
    notiType: "",
    notiAction: "",
    token: "",
  } as any,
  reducers: {
    setNotiState(state: IUserState, payload: any) {
      state.notiState = true;
      return { ...state };
    },
    setToken(state: any, payload: any) {
      // console.log(state.token)
      // console.log(payload)
      Cookies.set("userToken", payload.access_token);
      setCommonAuthorizationToken();
      return { ...state, token: payload.access_token };
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
  },
  effects: (dispatch: any) => ({
    async setNotiVisible() {},
    async login(payload: any) {
      try {
        const response = await axios.post(
          api.LOGIN,
          //  payload
          {
            email: payload.email,
            password: payload.password,
          },
        );

        const { data } = response;
        if (data?.status) {
          showMessage(data?.message, "success");
        } else {
          showMessage(data?.message, "error");
        }
        dispatch.appModel.setToken(data);
        return data;
      } catch (err) {}
    },
    async register(payload: any) {
      try {
        console.log(1);
        const response = await axios.post(api.REGISTER, payload);
        const { data } = response;
        console.log(response);
        showMessage("error", "Nhập lại mật khẩu chưa chính xác");
        if (data?.status === "fail") {
          // showMessage(data?.message, "success");
          showMessage(data?.message, "Nhập lại mật khẩu chưa chính xác");
        } else {
          // showMessage(data?.message, "Nhập lại mật khẩu chưa chính xác");
        }
        return data;
      } catch (err) {}
    },
    async getUserInfo(payload: any) {
      try {
      } catch (err) {}
    },
  }),
};
