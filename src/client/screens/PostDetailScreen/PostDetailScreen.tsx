import React, { useEffect, useState } from "react";
import { useStyles } from "./PostDetailScreen.styles";
import { AppWrapper } from "@components-client/DefaultWrapper";
import { ManagementWrapper } from "@components-client/ManagementWrapper";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import { PostEditModal } from "@components-client/PostEditModal";
import app from "next/app";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
// import dynamic from "next/dynamic";
// const ReactHtmlParser = dynamic(() => import("react-html-parser"), { ssr: false });
import moment from "moment";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { Grid } from "@material-ui/core";
import { Carousel } from "antd";
import { CarouselItem } from "./components/CarouselItem";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { formatMoney } from "@app-client/helpers";
import { BaseTextBoxSlice } from "@components-client/BaseTextBoxSlice";

interface Props {
  appState?: any;
  appReducer?: any;
  authReducer?: any;
  authState?: any;
  router: any;
}
const PostDetailScreenComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { appState, appReducer, authReducer, authState } = props;
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [publishPostData, setPublishPostData] = useState([]) as any;

  useEffect(() => {
    getPublishPost();
  }, [props.router.id]);

  const getPublishPost = async () => {
    const params = {
      id: props.router.id,
    };
    const dataRes = await appReducer?.getDetailPublishPost(props.router.id);
    // if(data?.length<)
    setPublishPostData(dataRes);
  };

  return (
    <AppWrapper>
      <div className={classes.swiperCategory}>
        <Grid className={classes.box} item xs={8}>
          <Carousel className={classes.carouselContainer}>
            {publishPostData?.imageList?.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <CarouselItem source={item?.url} />
                </div>
              );
            })}
          </Carousel>
          <Tabs
            defaultActiveKey="1"
            // tabBarStyle={{color:'red'}}
          >
            <Tabs.TabPane tab="Tổng quan" key="1">
              <Grid style={{ paddingTop: "10px" }} container spacing={1}>
                <Grid className={""} item xs={6}>
                  <div className={classes.containerText}>
                    <div>Giá:</div>
                    <div>{formatMoney(publishPostData?.priceMonth)}</div>
                  </div>
                </Grid>
                <Grid className={""} item xs={6}>
                  <div className={classes.containerText}>
                    <div>Diện tích:</div>
                    <div>
                      {publishPostData?.area}
                      {" ("}m&sup2;{")"}
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid style={{ paddingTop: "10px" }} container spacing={1}>
                <Grid className={""} item xs={6}>
                  <div className={classes.containerText}>
                    <div>Địa chỉ:</div>
                    <div>
                      {" "}
                      {publishPostData?.province +
                        ", " +
                        publishPostData?.wards}
                    </div>
                  </div>
                </Grid>
                {/* <Grid className={""} item xs={6}>
                  <div className={classes.containerText}>
                    <div>Diện tích:</div>
                    <div>{publishPostData?.area}{" ("}m&sup2;{")"}</div>
                  </div>
                </Grid> */}
              </Grid>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Chi tiết" key="2">
              <Grid style={{ paddingTop: "10px" }} container spacing={1}>
                <Grid className={""} item xs={6}>
                  <div className={classes.containerText}>
                    <div>Số phòng :</div>
                    <div>{publishPostData?.room}</div>
                  </div>
                </Grid>
                <Grid className={""} item xs={6}>
                  <div className={classes.containerText}>
                    <div>Nhà tắm:</div>
                    <div>{publishPostData?.bathRoom}</div>
                  </div>
                </Grid>
              </Grid>
              <Grid style={{ paddingTop: "10px" }} container spacing={1}>
                <Grid className={""} item xs={6}>
                  <div className={classes.containerText}>
                    <BaseTextBoxSlice
                      numberOfLines={3}
                      additionalClassName={classes.descriptionName}
                    >
                      Mô tả nội thất: {publishPostData?.furniture}
                    </BaseTextBoxSlice>
                  </div>
                </Grid>
              </Grid>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Liên hệ" key="3">
            <Grid style={{ paddingTop: "10px" }} container spacing={1}>
                <Grid className={""} item xs={6}>
                  <div className={classes.containerText}>
                    <div>Email :</div>
                    <div>{publishPostData?.createdBy?.email}</div>
                  </div>
                </Grid>
                <Grid className={""} item xs={6}>
                  <div className={classes.containerText}>
                    <div>SDT:</div>
                    <div>{publishPostData?.createdBy?.phone}</div>
                  </div>
                </Grid>
              </Grid>
            </Tabs.TabPane>
          </Tabs>
        </Grid>
        <Grid className={classes.box} item xs={4}>
          <h2>{publishPostData?.title}</h2>
          <div className={classes.itemsFlexCenter}>
            <ScheduleIcon className={classes.small} />{" "}
            {moment(publishPostData?.createdDate).format("L")}
          </div>
          <div>{ReactHtmlParser(publishPostData?.description)}</div>
        </Grid>
      </div>
    </AppWrapper>
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

const PostDetailScreen = React.memo(
  connect(mapState, mapDispatch)(PostDetailScreenComponent),
);
export { PostDetailScreen };
