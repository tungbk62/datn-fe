export interface IUserState {
  notiState: boolean;
  notiContent: string;
  notiTitle: string;
  notiType: string;
  notiAction: any;
}

export interface IAppModel {
  state: {
    notiState: boolean;
    notiContent: string;
    notiTitle: string;
    notiType: string;
    notiAction: any;
  };
  reducers: {
    setNotiState: (state: IUserState, payload: any) => IUserState;
  };
  effects: (dispatch: any) => {
    setNotiVisible: () => void;
  };
}

export interface TypeEstate {
  id: number;
  name: string;
}

export interface District {
  value: number;
  label: string;
}

export type Ward = District;
