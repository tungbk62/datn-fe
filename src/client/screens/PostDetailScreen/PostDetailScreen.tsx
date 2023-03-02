import React, { useEffect, useState } from "react";
import { useStyles } from "./PostDetailScreen.styles";
import { AppWrapper } from "@components-client/DefaultWrapper";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import HomeIcon from "@material-ui/icons/Home";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import DescriptionIcon from "@material-ui/icons/Description";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import ScheduleIcon from "@material-ui/icons/Schedule";
import VisibilityIcon from "@material-ui/icons/Visibility";
import moment from "moment";
import { Grid } from "@material-ui/core";
import { Tabs } from "antd";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { CarouselItem } from "./components/CarouselItem";
import { formatMoney } from "@app-client/helpers";

interface Props {
  appState?: any;
  appReducer?: any;
  authReducer?: any;
  authState?: any;
  router: any;
}

const PostDetailScreenComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { appReducer } = props;
  const [publishPostData, setPublishPostData] = useState([]) as any;

  useEffect(() => {
    getPublishPost();
  }, [props.router.id]);

  const getPublishPost = async () => {
    const dataRes = await appReducer?.getDetailPublishPost(props.router.id);
    setPublishPostData(dataRes);
  };

  return (
    <AppWrapper>
      <div className={classes.swiperCategory}>
        <Grid className={classes.box} item xs={8}>
          <AwesomeSlider style={{ width: "80%" }}>
            {publishPostData?.imageList?.map((item: any, index: number) => (
              <div key={index}>
                <CarouselItem source={item?.url} />
              </div>
            ))}
          </AwesomeSlider>
          <Tabs defaultActiveKey="1" style={{ marginTop: 40 }}>
            <Tabs.TabPane tab="Tổng quan" key="1">
              <Grid style={{ paddingTop: "10px" }} container spacing={1}>
                <Grid className={""} item xs={6}>
                  <div className={classes.containerText}>
                    <div className={classes.row}>
                      <AttachMoneyIcon />
                      Giá:
                    </div>
                    <div>{formatMoney(publishPostData?.priceMonth)}</div>
                  </div>
                </Grid>
                <Grid className={""} item xs={6}>
                  <div className={classes.containerText}>
                    <div className={classes.row}>
                      <AspectRatioIcon style={{ marginRight: 3 }} />
                      Diện tích:
                    </div>
                    <div>
                      {publishPostData?.area}
                      {" ("}m&sup2;{")"}
                    </div>
                  </div>
                </Grid>
                {/* <Grid className={""} item xs={6}></Grid> */}
              </Grid>
              <Grid style={{ paddingTop: "10px" }} container spacing={1}>
                <Grid className={""} item xs={6}>
                  <div className={classes.containerText}>
                    <div className={classes.row}>
                      <HotelIcon style={{ marginRight: 3 }} />
                      Số phòng :
                    </div>
                    <div>{publishPostData?.room}</div>
                  </div>
                </Grid>
                <Grid className={""} item xs={6}>
                  <div className={classes.containerText}>
                    <div className={classes.row}>
                      <BathtubIcon style={{ marginRight: 3 }} /> Số toilet:
                    </div>
                    <div>{publishPostData?.bathRoom}</div>
                  </div>
                </Grid>
              </Grid>
              <Grid style={{ paddingTop: "10px" }} container spacing={1}>
                <Grid item xs={6}>
                  <div className={classes.containerText}>
                    <div className={classes.row}>
                      <HomeIcon />
                      Địa chỉ:
                    </div>
                    <div> {publishPostData?.addressDetail}</div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.containerText}>
                    <div className={classes.row}>
                      <DescriptionIcon />
                      Nội thất:
                    </div>
                    <div>{publishPostData?.furniture}</div>
                  </div>
                </Grid>
              </Grid>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Liên hệ" key="2">
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
          <h2 style={{ fontSize: "25px" }}>{publishPostData?.title}</h2>
          <span style={{ fontSize: "20px" }}>
            {publishPostData?.wards}, {publishPostData?.district},{" "}
            {publishPostData?.province}
          </span>
          <div className={classes.itemsFlexCenter}>
            <ScheduleIcon className={classes.small} />
            {moment(publishPostData?.createdDate).format("L")}
            <div style={{ width: 20 }} />
            <VisibilityIcon className={classes.small} />
            {publishPostData?.view}
          </div>
          <div style={{ fontSize: 18 }}>
            {ReactHtmlParser(publishPostData?.description)}
          </div>
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
