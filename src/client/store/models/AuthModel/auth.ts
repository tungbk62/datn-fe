import { IEmployeeState, IAuthState } from "./interface";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import axios from "@app-client/helpers/axios";
// import { api } from "@app-client/constants";
import { formatDateUI, showMessage } from "@app-client/helpers";
import { setCommonAuthorizationToken } from "@app-client/helpers";

export const authModel: any = {
  state: {
    token: "",
    checkinTime: "",
    checkoutTime: "",
    attendanceTimeLimit:"",
    userInfo: {
      employeeId: "",
      email: "",
    },
  } as IEmployeeState, // initial state
  reducers: {
    
  },
  effects: (dispatch: any) => ({
    
  }),
};
