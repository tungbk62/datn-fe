export interface IEmployeeState {
  checkinTime: string,
  checkoutTime: string,
  attendanceTimeLimit:string,
  token: string,
  userInfo: {
    employeeId?: string,
    email: string,
  }
};

export interface IAuthState {
  state: IEmployeeState;
  reducers: {
    setUserState: (state: IEmployeeState, payload: any) => IEmployeeState;
    setUserInfo: (state: IEmployeeState, payload: any) => IEmployeeState;
    setTime: (state: IEmployeeState, payload: any) => IEmployeeState
  };
  effects: (
    dispatch: any
  ) => {
    setUserData: (payload: any, rootState: any) => void;
  };
};
export interface IAttendanceData {
  employeeId: string,
  email: string,
  latAndLong: {
    lat: string,
    lng: string,
  },
  emotion: string,
  dailyFeedBack: string,
  ipAddress: string,
  type: string
}
