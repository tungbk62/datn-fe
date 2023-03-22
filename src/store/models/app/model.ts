import { createModel } from "@rematch/core";

import axios from "@helpers/axios";
import { api } from "@src/constants";
import { getQueryURL, userDto, showMessage } from "@src/helpers";
import { RootModel } from "..";

const SUCCESS_CODE = 200;

type AppState = {
  notiState: boolean;
  notiContent: string;
  notiTitle: string;
  notiType: string;
  notiAction: number;
  token: string;
  listUserBusiness: any;
  listPostType: any;
  listTypeEstate: any;
};

export const appModel = createModel<RootModel>()({
  state: {
    notiState: false,
    notiContent: "",
    notiTitle: "",
    notiType: "",
    notiAction: 2,
    token: "",
    listUserBusiness: null,
    listPostType: null,
    listTypeEstate: null,
  } as AppState,
  reducers: {
    setListUserBusiness: (state, payload: any) => {
      return {
        ...state,
        listUserBusiness: payload,
      };
    },
    setListPostType: (state, payload: any) => {
      return {
        ...state,
        listPostType: payload,
      };
    },
    setListTypeEstate: (state, payload: any) => {
      return {
        ...state,
        listTypeEstate: payload,
      };
    },
  },
  effects: dispatch => ({
    /// all
    async getListPostType(payload?: any) {
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

    async getListTypeEstate(payload?: any) {
      try {
        const res = await axios.get(api.typeEstate, payload);
        if ((res.status = SUCCESS_CODE)) {
          dispatch.appModel.setListTypeEstate(
            res.data.map((item: any) => ({ value: item.id, label: item.name })),
          );
        }
      } catch (error) {
        console.log(error);
      }
    },

    /// admin
    async getListUser(payload: any) {
      try {
        const res = await axios.get(
          getQueryURL(api.GET_LIST_USER_BUSINESS, payload),
        );
        if ((res.status = SUCCESS_CODE)) {
          const data = res.data.map((item: any) => userDto(item));
          dispatch.appModel.setListUserBusiness(data);
          return data;
        }
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
      } catch (error) {
        console.log(error);
      }
    },
    async lockNormalUser(payload: any, state: any) {
      try {
        const res = await axios.put(`${api.LOCK_ACCOUNT_ADMIN}/${payload?.userId}`, null, {params: {
            locked: payload?.status}});

        if (res.status != SUCCESS_CODE) {
          showMessage(res?.data?.message, "error");
          return false;
        }
        showMessage(res?.data?.message, "success");
        return true;
      } catch (error) {
        return false;
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
          showMessage(res?.data?.message, "error");
          return;
        }
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
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async hidePostForAdmin(payload: any, state: any) {
      try {
        const res = await axios.put(api.changeStatePostForAdmin(payload.postId), null, {
          params: {hide: payload.status}
          });

        if (res.status != SUCCESS_CODE) {
          showMessage(res?.data?.message, "error");
          return false;
        }
        showMessage(res?.data?.message, "success");
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async lockPostForAdmin(payload: any, state: any) {
      console.log("lock data", payload.status);
      try {
        const res = await axios.put(api.changeStatePostForAdmin(payload.postId), null, {
          params: {locked: payload.status}
          });

        if (res.status != SUCCESS_CODE) {
          showMessage(res?.data?.message, "error");
          return false;
        }
        showMessage(res?.data?.message, "success");
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    async verifiedPostForAdmin(payload: any, state: any) {
      try {
        const res = await axios.put(api.changeStatePostForAdmin(payload.postId), null, {
          params: {verified: payload.status}
          });

        if (res.status != SUCCESS_CODE) {
          showMessage(res?.data?.message, "error");
          return false;
        }
        showMessage(res?.data?.message, "success");
        return true;
      } catch (error) {
        console.log(error);
        return false;
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
    async updatePost(payload: any, state: any) {
      try {
        const res = await axios.put(api.businessUpdatePost + payload.id, payload);
        if (res.status !== SUCCESS_CODE) {
          showMessage(res?.data?.message, "error");
          return;
        }
        const { data } = res;
        showMessage(res?.data?.message, "success");
        return data;
      } catch (err) {}
    },
    async deleteImage(payload: any) {
      try {
        const res = await axios.delete(api.businessDeleteImage, {data : payload});
        if (res.status !== SUCCESS_CODE) {
          showMessage(res?.data?.message, "error");
          return;
        }
        const { data } = res;
        showMessage(res?.data?.message, "success");
        return data;
      } catch (err) {}
    },
    async hidePost(param) {
      try {
        const res = await axios.put(api.businessHidePost(param.id, param.state));
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
        const res = await axios.get(getQueryURL(api.GET_MY_POST, payload));
        if ((res.status = SUCCESS_CODE)) {
          const data = res.data;
          return data;
        }
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
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getDetailPublishPost(payload: any, state: any) {
      try {
        const res = await axios.get(
          `${api.GET_DETAIL_PUBLISH_POST}/ ${payload}`,
        );
        if ((res.status = SUCCESS_CODE)) {
          const data = res.data;
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  }),
});
