import React, { Fragment } from "react";
import { useStyles } from "./LoginScreen.styles";
import { Button } from "@material-ui/core";
import { Input } from "antd";
import { Formik } from "formik";
import {
  UserOutlined,
  SafetyOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { AuthWrapper } from "src/components/AuthWrapper";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { Dispatch, RootState } from "@src/store";
import {
  LoginSchema,
  loginValidationSchema,
} from "@src/store/models/auth/interface";

const mapState = (rootState: RootState) => ({
  appState: rootState.appModel,
  authState: rootState.authModel,
});

const mapDispatch = (rootReducer: Dispatch) => ({
  appReducer: rootReducer.appModel,
  authReducer: rootReducer.authModel,
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = StateProps & DispatchProps;

const LoginScreenComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { authReducer } = props;
  const router = useRouter();

  const onLogin = async (values: LoginSchema) => {
    const res = await authReducer.login(values);
    if (res) {
      router.push("/");
    }
  };

  return (
    <AuthWrapper>
      <Fragment>
        <div className={classes.container}>
          <div className={classes.loginFormContainer}>
            <div className={classes.logoCpn}>
              <img src="/assets/logo_main.png" alt="" />
            </div>
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
                      <div className={classes.dontHaveAccountContainer}>
                        <span className={classes.dontHaveAccountText}>
                          Bạn chưa có tài khoản ?{" "}
                        </span>
                        <Link href="/register">
                          <a>
                            <span className={classes.registerText}>
                              {" "}
                              đăng ký
                            </span>
                          </a>
                        </Link>
                      </div>
                      <div className={classes.dontHaveAccountContainer}>
                        <Link href="/forget-password">
                          <a>
                            <span className={classes.registerText}>
                              {" "}
                              quên mật khẩu
                            </span>
                          </a>
                        </Link>
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
        </div>
      </Fragment>
    </AuthWrapper>
  );
};

const LoginScreen = React.memo(
  connect(mapState, mapDispatch)(LoginScreenComponent),
);
export { LoginScreen };
