export interface IUserState {
    notiState:boolean,
    notiContent:string,
    notiTitle:string,
    notiType:string,
    notiAction:string,
}

export interface IAppModel {
    state: {
        notiState:boolean,
        notiContent:string,
        notiTitle:string,
        notiType:string,
        notiAction:string,

    };
    reducers: {
        setNotiState: (state: IUserState,payload:any)=> IUserState
    };
    effects: (
      dispatch: any
    ) => {
      setNotiVisible:() => void,
      
    };
  }