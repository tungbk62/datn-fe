import React, { Fragment } from "react";
import { useStyles } from "./LoginScreen.styles";
import { Grid, Paper, Button } from "@material-ui/core";
import { Input } from "antd";
import { Formik } from "formik";
import * as yup from "yup";
import {
  UserOutlined,
  SafetyOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { AuthWrapper } from "@components-client/AuthWrapper";
import { connect } from "react-redux";
import { useRouter } from "next/router";

interface Props {
  children?: any;
  appState?: any;
  appReducer?: any;
  title?: any;
  authState?: any;
  authReducer?: any;
}

const LoginScreenComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { children, appState, appReducer, authReducer, authState } = props;
  const router = useRouter();
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email("Email chưa chính xác!")
      .max(50, "Email quá dài!")
      .required("Bạn chưa nhập email!"),
    password: yup
      .string()
      .trim()
      .min(8, "Password chưa chính xác!")
      .required("Bạn chưa nhập password!"),
  });

  const onLogin = async(values: any) => {
    console.log("Data:", values);
    const res = await authReducer.login(values);
    if (res) {
      router.push("/")
    }
  };
  return (
    <AuthWrapper>
      <Fragment>
        <div className={classes.container}>
          <div className={classes.loginFormContainer}>
            <h3>Đăng nhập</h3>
            <div>
              <Formik
                validateOnChange={false}
                validationSchema={loginValidationSchema}
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={onLogin}
                validateOnBlur
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  touched,
                  errors,
                }: any) => {
                  return (
                    <div>
                      <div className={classes.formLoginItem}>
                        <div className={classes.formLoginInput}>
                          <Input
                            allowClear
                            className={errors.email ? "inputBorderRed" : ""}
                            placeholder="Enter your email"
                            prefix={
                              <UserOutlined className="site-form-item-icon" />
                            }
                            maxLength={50}
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e: any) => {
                              if (e.key === "Enter") {
                                handleSubmit();
                              }
                            }}
                          />
                          {touched.email && errors.email ? (
                            <div className={classes.errorMess}>
                              {errors.email}
                            </div>
                          ) : null}

                          <Input.Password
                            allowClear
                            className={errors.password ? "inputBorderRed" : ""}
                            placeholder="Enter your password"
                            prefix={
                              <SafetyOutlined className="site-form-item-icon" />
                            }
                            style={{ marginTop: "10px" }}
                            iconRender={visible =>
                              visible ? (
                                <EyeTwoTone />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                            maxLength={50}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e: any) => {
                              if (e.key === "Enter") {
                                handleSubmit();
                              }
                            }}
                          />
                          {touched.password && errors.password ? (
                            <div className={classes.errorMess}>
                              {errors.password}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className={classes.formLoginItem}>
                        <div className={classes.formLoginButton}>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.loginBtn}
                            onClick={handleSubmit}
                            onKeyPress={(e: any) => {
                              if (e.key === "Enter") {
                                handleSubmit();
                              }
                            }}
                          >
                            Đăng nhập
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </Formik>
            </div>
          </div>
          {/* </Grid> */}
          {/* </Grid> */}
        </div>
      </Fragment>
    </AuthWrapper>
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

const LoginScreen = React.memo(connect(mapState, mapDispatch)(LoginScreenComponent));
export { LoginScreen };
