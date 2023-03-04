import React, { Fragment, useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useStyles } from "./Footer.styles";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Grid, Paper, Button } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import {
  Input,
} from "antd";
// const { Header, Sider, Content } = Layout;
interface Props {
  children?: any;
  appState?: any;
  appReducer?: any;
  authReducer?: any;
  authState?: any;
}
import {
  MailOutlined,
} from "@ant-design/icons";
type Anchor = "top" | "left" | "bottom" | "right";

const FooterComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const router = useRouter();
  // const { children, appState, appReducer, authReducer, authState } = props;

  return (
    <Fragment>
      <div className={classes.footer}>
        <div style={{ width: "100%", padding: "0px 12%" }}>
          <Grid style={{ paddingTop: "10px" }} container spacing={1}>
            <Grid className={classes.box} item xs={4}>
              <div className={classes.logoCpn}>
                <img src="/assets/logo_main.png" alt="" />
              </div>
              <div className={classes.categoryName}>Đăng ký nhận tin</div>
              <Input
                allowClear
                className={classes.inputStyle}
                placeholder="Để lại Email của bạn"
                prefix={
                  
                  <MailOutlined className="site-form-item-icon" />
                }
                maxLength={50}
                
              />
            </Grid>
            <Grid className={classes.box} item xs={4}>
              <div className={classes.logoCpn}>
                <CallIcon className={classes.large} />
                <div className={classes.contactCotainer}>
                  <span>Hotline</span>
                  <span>096.888.888</span>
                </div>
              </div>
              <div className={classes.categoryName}>Hướng dẫn</div>
              <div className={classes.normalNme}>Báo giá và hỗ trợ</div>
              <div className={classes.normalNme}>Câu hỏi thường gặp</div>
            </Grid>
            <Grid className={classes.box} item xs={4}>
              <div className={classes.logoCpn}>
                <ContactMailIcon className={classes.large} />
                <div className={classes.contactCotainer}>
                  <span>Hòm thư</span>
                  <span>batdongsan@gmail.com</span>
                </div>
              </div>
              <div className={classes.categoryName}>Quy định</div>
              <div className={classes.normalNme}>Quy định đăng tin</div>
              <div className={classes.normalNme}>Quy định hạn chế</div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Fragment>
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

const Footer = React.memo(connect(mapState, mapDispatch)(FooterComponent));
export { Footer };
