import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AwesomeSlider from "react-awesome-slider";
import ReactHtmlParser from "react-html-parser";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import HomeIcon from "@material-ui/icons/Home";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import DescriptionIcon from "@material-ui/icons/Description";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import ScheduleIcon from "@material-ui/icons/Schedule";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import StarIcon from "@material-ui/icons/Star";
import EmailIcon from "@material-ui/icons/Email";
import moment from "moment";
import { Button, Grid, Modal } from "@material-ui/core";
import { Tabs } from "antd";
import "react-awesome-slider/dist/styles.css";
import { CarouselItem } from "./components/CarouselItem";
import { AppWrapper } from "src/components/DefaultWrapper";
import { formatMoney } from "@src/helpers";
import { useStyles } from "./PostDetailScreen.styles";
import { ContactForm, FeedbackForm, ReportForm } from "./components";
import Gap from "src/components/Gap";
import { Post } from "../HomeScreen/components";

interface Props {
  appState?: any;
  appReducer?: any;
  authReducer?: any;
  authState?: any;
  router: any;
}

type FormType = "contact" | "report" | "feedback";

interface ImageList {
  id: number;
  url: string;
  mainImage: boolean;
}

interface CreatedBy {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  ratingPoint?: any;
  imageUrl: string;
  type: string;
}

export interface PostDetail {
  id: number;
  title: string;
  description: string;
  typeEstate: string;
  province: string;
  district: string;
  wards: string;
  addressDetail: string;
  area: number;
  priceMonth: number;
  furniture: string;
  room: number;
  bathRoom: number;
  expiredDate?: any;
  longitude?: any;
  latitude?: any;
  verified: boolean;
  view: number;
  imageList: ImageList[];
  createdBy: CreatedBy;
  createdDate: string;
  modifiedDate?: any;
}

const PostDetailScreenComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { appReducer } = props;
  const [publishPostData, setPublishPostData] = useState<PostDetail | null>(
    null,
  );
  const [contactFormOpened, setContactFormOpened] = useState(false);
  const [reportFormOpened, setReportFormOpened] = useState(false);
  const [feedbackFormOpened, setFeedbackFormOpened] = useState(false);

  const handleFormAction = (formType: FormType, open = true) => {
    return () => {
      switch (formType) {
        case "contact": {
          setContactFormOpened(open);
          return;
        }
        case "report": {
          setReportFormOpened(open);
          return;
        }
        case "feedback": {
          setFeedbackFormOpened(open);
          return;
        }
        default:
          break;
      }
    };
  };

  useEffect(() => {
    const getPublishPost = async () => {
      const dataRes = await appReducer?.getDetailPublishPost(props.router.id);
      console.log("datares", dataRes);
      setPublishPostData(dataRes);
    };
    getPublishPost();
  }, [appReducer, props.router.id]);

  return (
    <AppWrapper>
      <div className={classes.swiperCategory}>
        <Grid className={classes.box} item xs={8}>
          <AwesomeSlider style={{ width: "80%" }}>
            {publishPostData?.imageList?.map((item: any, index: number) => (
              <CarouselItem key={index} source={item?.url} />
            ))}
          </AwesomeSlider>
          <div
            style={{
              marginTop: 40,
              width: 80,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FavoriteBorderIcon fontSize="large" className={classes.icon} />
            <ErrorOutlineIcon
              fontSize="large"
              className={classes.icon}
              onClick={handleFormAction("report")}
            />
          </div>
          <Tabs defaultActiveKey="1" style={{ fontSize: 18 }}>
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
                    <div className={classes.row}>
                      <EmailIcon style={{ marginRight: 3 }} /> Email :
                    </div>
                    <div>{publishPostData?.createdBy?.email}</div>
                  </div>
                </Grid>
                <Grid className={""} item xs={6}>
                  <div className={classes.containerText}>
                    <div className={classes.row}>
                      <PhoneIcon style={{ marginRight: 3 }} />
                      SĐT:
                    </div>
                    <div>{publishPostData?.createdBy?.phone}</div>
                  </div>
                </Grid>
              </Grid>
              <Grid style={{ paddingTop: "10px" }} container spacing={1}>
                <Grid className={""} item xs={6}>
                  <div
                    style={{ marginBottom: 7 }}
                    className={classes.containerText}
                  >
                    <div className={classes.row}>
                      <PersonIcon style={{ marginRight: 3 }} />
                      Được đăng bởi :
                    </div>
                    <div>
                      {publishPostData?.createdBy?.firstName}{" "}
                      {publishPostData?.createdBy?.lastName}
                    </div>
                  </div>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ color: "white" }}
                    onClick={handleFormAction("contact")}
                  >
                    Yêu cầu liên hệ lại
                  </Button>
                  <Gap.XXS />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ color: "white" }}
                    onClick={handleFormAction("feedback")}
                  >
                    đánh giá
                  </Button>
                </Grid>
                <Grid className={""} item xs={6}>
                  {publishPostData?.createdBy?.ratingPoint && (
                    <div className={classes.containerText}>
                      <div className={classes.row}>
                        <StarIcon style={{ marginRight: 3 }} />
                        Điểm đánh giá:
                      </div>
                      <div>
                        {Math.floor(publishPostData?.createdBy?.ratingPoint)}/5
                      </div>
                    </div>
                  )}
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
            {ReactHtmlParser(publishPostData?.description as string)}
          </div>
        </Grid>
      </div>
      <Modal
        className={classes.center}
        open={contactFormOpened}
        onClose={handleFormAction("contact", false)}
      >
        <ContactForm />
      </Modal>
      <Modal
        className={classes.center}
        open={reportFormOpened}
        onClose={handleFormAction("report", false)}
      >
        <ReportForm />
      </Modal>
      <Modal
        className={classes.center}
        open={feedbackFormOpened}
        onClose={handleFormAction("feedback", false)}
      >
        <FeedbackForm userId={publishPostData?.createdBy.id as number} />
      </Modal>
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
