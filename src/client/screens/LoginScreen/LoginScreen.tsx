import React, { Fragment } from "react";
import { useStyles } from "./LoginScreen.styles";
import { Grid, Paper, Button } from "@material-ui/core";
import { Input } from "antd";
interface Props {}
import { Formik } from "formik";
import * as yup from "yup";
import {
  UserOutlined,
  SafetyOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

const LoginScreenComponent = (props: Props): JSX.Element => {
  const classes = useStyles();

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email("Invalid email!")
      .max(50, "Email too long!")
      .required("Please input email!"),
    password: yup
      .string()
      .trim()
      .min(8, "Invalid password!")
      .required("Please input password!"),
    passwordConfirm: yup
      .string()
      .trim()
      .min(8, "Invalid password confirm!")
      .required("Please input password confirm!"),
    name: yup.string().trim().required("Please input your name!"),
  });

  const onLogin = () => {
    console.log(1);
  };
  return (
    <Fragment>
      <div className={classes.container}>
        <Grid className={classes.containerGird} container spacing={6}>
          <Grid className={classes.box} item xs={8}>
            <div>abc</div>
          </Grid>
          <Grid className={classes.box} item xs={4}>
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
                              className={
                                errors.password ? "inputBorderRed" : ""
                              }
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
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};
const LoginScreen = React.memo(LoginScreenComponent);
export { LoginScreen };
