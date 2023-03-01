import { dispatch } from "@app-client/store/store";
import { IUserState, IAppModel } from "./interface";
import Cookies from "js-cookie";
import axios from "@app-client/helpers/axios";
// import axios from "axios";
import { api } from "@app-client/constants";
import { formatDateUI, showMessage } from "@app-client/helpers";
import { setCommonAuthorizationToken } from "@app-client/helpers";
import { getQueryURL, userDto } from "@app-client/helpers";
const SUCCESS_CODE = 200;

export const appModel: any = {
  state: {
    notiState: false,
    notiContent: "",
    notiTitle: "",
    notiType: "",
    notiAction: 2,
    token: "",
    listUserBusiness: null,
    listPostType: null,
  } as any,
  reducers: {
    setListUserBusiness: (state: any, payload: any) => {
      return {
        ...state,
        listUserBusiness: payload,
      };
    },
    setListPostType: (state: any, payload: any) => {
      return {
        ...state,
        listPostType: payload,
      };
    },
  },
  effects: (dispatch: any) => ({
    /// all
    async getListPostType(payload: any, state: any) {
      try {
        const res = await axios.get(api.GET_TYPE_POST, payload);
        if ((res.status = SUCCESS_CODE)) {
          dispatch.appModel.setListPostType(
            res.data.map((item: any) => ({ value: item.id, label: item.name })),
          );
        }
      } catch (error) {
        console.log(error);
      }
    },

    /// admin
    async getListUser(payload: any, state: any) {
      try {
        const res = await axios.get(
          getQueryURL(api.GET_LIST_USER_BUSINESS, payload),
        );
        if ((res.status = SUCCESS_CODE)) {
          const data = res.data.map((item: any) => userDto(item));
          dispatch.appModel.setListUserBusiness(data);
          // console.log(res.data)
          return data;
        }
        // dispatch.appModel.login()
      } catch (error) {
        console.log(error);
      }
    },
    async getDetailUser(payload: any, state: any) {
      try {
        const res = await axios.get(
          `${api.GET_DETAIL_OF_USER_BUSINESS}/${payload}`,
        );
        if ((res.status = SUCCESS_CODE)) {
          const data = res.data;
          console.log(res.data);
          return data;
        }
        // dispatch.appModel.login()
      } catch (error) {
        console.log(error);
      }
    },
    async lockNormalUser(payload: any, state: any) {
      try {
        const res = await axios.put(
          getQueryURL(`${api.LOCK_ACCOUNT_ADMIN}/${payload?.user}`, {
            locked: payload?.locked,
          }),
        );
        if (res.status != SUCCESS_CODE) {
          // dispatch.appModel.setListUserBusiness(data);
          showMessage(res?.data?.message, "error");
          // console.log(res.data)
          return;
        }
        // dispatch.appModel.login()
        showMessage(res?.data?.message, "success");
      } catch (error) {
        console.log(error);
      }
    },
    async displayReviewNormalUser(payload: any, state: any) {
      try {
        const res = await axios.put(
          getQueryURL(`${api.DISPLAY_REVIEW_ADMIN}/${payload?.user}`, {
            display: payload?.display,
          }),
        );
        if (res.status != SUCCESS_CODE) {
          // dispatch.appModel.setListUserBusiness(data);
          showMessage(res?.data?.message, "error");
          // console.log(res.data)
          return;
        }
        // dispatch.appModel.login()
        showMessage(res?.data?.message, "success");
      } catch (error) {
        console.log(error);
      }
    },
    async getListPostAdmin(payload: any, state: any) {
      try {
        const res = await axios.get(
          getQueryURL(api.ADMIN_GET_ALL_POST, payload),
        );
        if ((res.status = SUCCESS_CODE)) {
          const data = res.data;
          // dispatch.appModel.setListUserBusiness(data);
          // console.log(res.data)
          return data;
        }
        // dispatch.appModel.login()
      } catch (error) {
        console.log(error);
      }
    },
    async lockNormalPost(payload: any, state: any) {
      try {
        const res = await axios.put(
          getQueryURL(`${api.LOCK_ACCOUNT_ADMIN}/${payload?.post}`, {
            locked: payload?.locked,
          }),
        );
        if (res.status != SUCCESS_CODE) {
          // dispatch.appModel.setListUserBusiness(data);
          showMessage(res?.data?.message, "error");
          // console.log(res.data)
          return;
        }
        // dispatch.appModel.login()
        showMessage(res?.data?.message, "success");
      } catch (error) {
        console.log(error);
      }
    },
    /// business

    async createPost(payload: any, state: any) {
      try {
        const res = await axios.post(api.CREATE_POST_BUSINESS, payload);
        if (res.status !== SUCCESS_CODE) {
          showMessage(res?.data?.message, "error");
          return;
        }
        const { data } = res;
        showMessage(res?.data?.message, "success");
        return data;
      } catch (err) {}
    },
    async getMyPost(payload: any, state: any) {
      try {
        const res = await axios.get(
          getQueryURL(api.GET_MY_POST, payload),
        );
        if ((res.status = SUCCESS_CODE)) {
          const data = res.data;
          // dispatch.appModel.setListUserBusiness(data);
          // console.log(res.data)
          return data;
        }
        // dispatch.appModel.login()
      } catch (error) {
        console.log(error);
      }
    },
    /// publish

    async getListPublishPost(payload: any, state: any) {
      try {
        const res = await axios.get(getQueryURL(api.GET_PUBLISH_POST, payload));
        if ((res.status = SUCCESS_CODE)) {
          const data = res.data;
          // .map((item: any) => userDto(item));
          // dispatch.appModel.setListUserBusiness(data);
          // console.log(res.data)
          return data;
        }
        // dispatch.appModel.login()
      } catch (error) {
        console.log(error);
      }
    },
    async getDetailPublishPost(payload: any, state: any) {
      try {
        const res = await axios.get(`${api.GET_DETAIL_PUBLISH_POST}/ ${payload}`);
        if ((res.status = SUCCESS_CODE)) {
          const data = res.data;
          // .map((item: any) => userDto(item));
          // dispatch.appModel.setListUserBusiness(data);
          // console.log(res.data)
          return data;
        }
        // dispatch.appModel.login()
      } catch (error) {
        console.log(error);
      }
    },
  }),
};
