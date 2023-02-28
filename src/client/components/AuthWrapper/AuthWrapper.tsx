import React, { useEffect, useState } from "react";

import { useStyles } from "./AuthWrapper.styles";
import { connect } from "react-redux";
import { Grid, Paper, Button } from "@material-ui/core";

import { Carousel } from "antd";
import { CarouselItem } from "./components";
import { useRouter } from "next/router";

interface Props {
  children?: any;
  appState?: any;
  appReducer?: any;
  title?: any;
  authState?:any
  authReducer?:any
}

const AuthWrapperComponent = (props: Props) => {
  const { children, appState, appReducer,authReducer,authState } = props;
  const router = useRouter();
  const classes = useStyles();
  useEffect(()=>{
    authReducer.getListProvince()
    checKSignIn()
  },[])

  const checKSignIn =()=>{
    if(authState?.isSignedIn){
      router.replace("/")
    }
  }

  return (
    <div className={classes.root}>
      {/* <img src="/assets/auth-bg.jpeg" alt="" className={classes.bg} /> */}
      {children}
      {/* <Grid className={classes.containerGird} container spacing={3}>
        <Grid className={classes.box} item xs={7}>
          <Carousel className={classes.carouselContainer} autoplay>
            <div>
              <CarouselItem
                source={"/assets/mkt-1.jpeg"}
                city={"TP. Hồ Chí Minh"}
                news={"7125"}
              />
            </div>
            <div>
              <CarouselItem
                source={"/assets/mkt-2.jpeg"}
                city={"TP. Hà Nội"}
                news={"1558"}
              />
            </div>
            <div>
              <CarouselItem
                source={"/assets/mkt-3.jpeg"}
                city={"TP. Đã Nắng"}
                news={"5426"}
              />
            </div>
            <div>
              <CarouselItem
                source={"/assets/mkt-4.jpeg"}
                city={"TP. Hải Phòng"}
                news={"1234"}
              />
            </div>
          </Carousel>
        </Grid>
        <Grid className={classes.box} item xs={5}>
          {children}
        </Grid>
      </Grid> */}
    </div>
  );
};

const mapState = (rootState: any) => ({
  appState: rootState.appModel,
  authState: rootState.authModel,
});

const mapDispatch = (rootReducer: any) => ({
  appReducer: rootReducer.appModel,
  authReducer: rootReducer.authModel,
});

const AuthWrapper = React.memo(
  connect(mapState, mapDispatch)(AuthWrapperComponent),
);
export { AuthWrapper };
