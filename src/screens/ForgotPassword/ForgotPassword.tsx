import React, { Fragment } from "react";
import { useStyles } from "./ForgotPassword.styles";
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
import { AuthWrapper } from "src/components/AuthWrapper";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

interface Props {
  children?: any;
  appState?: any;
  appReducer?: any;
  title?: any;
  authState?: any;
  authReducer?: any;
}
function getSteps() {
  return ["Nhập email", "Nhập mã OTP", "Nhập mật khẩu mới"];
}

function getStepContent(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return "Nhập email";
    case 1:
      return "Nhập mã OTP?";
    case 2:
      return "Nhập mật khẩu mới!";
    default:
      return "Đổi mật khẩu thành công";
  }
}

const ForgotPasswordComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  // const { children, appState, appReducer, authReducer, authState } = props;
  const router = useRouter();
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email("Email chưa chính xác!")
      .max(50, "Email quá dài!"),
    // .required("Bạn chưa nhập email!"),

    otp: yup
      .string()
      .trim()
      .email("Email chưa chính xác!")
      .max(50, "Email quá dài!"),
    newPassword: yup.string().trim().min(8, "Password chưa chính xác!"),
    // .required("Bạn chưa nhập password!"),
  });

  const onPressSubmit = async (values: any) => {
    console.log("Data:", values);
    // const res = await authReducer.login(values);
    // if (res) {
    //   router.push("/");
    // }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <AuthWrapper>
      <Fragment>
        <div className={classes.container}>
          <div className={classes.loginFormContainer}>
            <div className={classes.logoCpn}>
              <img src="/assets/logo_main.png" alt="" />
            </div>
            <h3>Đổi mât khẩu</h3>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              <Formik
                validateOnChange={false}
                validationSchema={loginValidationSchema}
                initialValues={{
                  email: "",
                  newPassword: "",
                  otp: "",
                }}
                onSubmit={onPressSubmit}
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
                          {activeStep < 2 ? (
                            <Input
                              allowClear
                              className={errors.email ? "inputBorderRed" : ""}
                              placeholder="Nhập email"
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
                          ) : (
                            <></>
                          )}

                          {touched.email && errors.email ? (
                            <div className={classes.errorMess}>
                              {errors.email}
                            </div>
                          ) : null}

                          {activeStep === 1 ? (
                            <Input
                              allowClear
                              className={errors.otp ? "inputBorderRed" : ""}
                              placeholder="Nhập mã Otp"
                              prefix={
                                <UserOutlined className="site-form-item-icon" />
                              }
                              style={{ marginTop: "10px" }}
                              maxLength={50}
                              name="email"
                              value={values.otp}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          ) : (
                            <></>
                          )}
                          {activeStep === 2 ? (
                            <Input.Password
                              allowClear
                              className={
                                errors.newPassword ? "inputBorderRed" : ""
                              }
                              placeholder="Nhập mật khẩu mới"
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
                              name="newPassword"
                              value={values.newPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e: any) => {
                                if (e.key === "Enter") {
                                  handleSubmit();
                                }
                              }}
                            />
                          ) : (
                            <></>
                          )}

                          {touched.newPassword && errors.newPassword ? (
                            <div className={classes.errorMess}>
                              {errors.newPassword}
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
                      <Grid
                        style={{ paddingTop: "10px" }}
                        container
                        spacing={1}
                      >
                        <Grid className={""} item xs={6}>
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.loginBtn}
                            disabled={activeStep === 0}
                            onClick={() => {
                              console.log(values);
                              handleSubmit();
                              handleBack();
                            }}
                          >
                            Quay lại
                          </Button>
                        </Grid>
                        <Grid className={""} item xs={6}>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.loginBtn}
                            onClick={() => {
                              console.log(values);
                              handleSubmit();
                              handleNext();
                            }}
                          >
                            {activeStep === steps.length - 1
                              ? "Đổi mật khẩu"
                              : "Tiếp tục"}
                          </Button>
                        </Grid>
                      </Grid>
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

const ForgotPassword = React.memo(
  connect(mapState, mapDispatch)(ForgotPasswordComponent),
);
export { ForgotPassword };
