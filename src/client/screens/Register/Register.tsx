import React, { Fragment } from "react";
import { useStyles } from "./Register.styles";
import { Grid, Paper, Button } from "@material-ui/core";
import {
  AutoComplete,
  Button as ButtonAntd,
  Cascader,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
} from "antd";
interface Props {}
import { Formik } from "formik";
import * as yup from "yup";
import {
  UserOutlined,
  SafetyOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

const RegisterComponent = (props: Props): JSX.Element => {
  const classes = useStyles();

  const registerValidationSchema = yup.object().shape({
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

  const onRegister = () => {
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
            {/* <Item>xs=4</Item> */}
            <div className={classes.registerFormContainer}>
              <h3>Đăng ký</h3>
              <div>
                <Formik
                  validateOnChange={false}
                  validationSchema={registerValidationSchema}
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={onRegister}
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
                        <div className={classes.formRegisterItem}>
                          <div className={classes.formRegisterInput}>
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

                            <Grid
                              style={{ paddingTop: "10px" }}
                              container
                              spacing={1}
                            >
                              <Grid className={""} item xs={6}>
                                <Input
                                  allowClear
                                  className={
                                    errors.email ? "inputBorderRed" : ""
                                  }
                                  placeholder="Enter your email"
                                  // prefix={
                                  //   <UserOutlined className="site-form-item-icon" />
                                  // }
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
                              </Grid>
                              <Grid className={""} item xs={6}>
                                <Input
                                  allowClear
                                  className={
                                    errors.email ? "inputBorderRed" : ""
                                  }
                                  placeholder="Enter your email"
                                  // prefix={
                                  //   <UserOutlined className="site-form-item-icon" />
                                  // }
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
                              </Grid>
                            </Grid>

                            <DatePicker
                              allowClear
                              style={{ width: "50%" }}
                              className={errors.email ? "inputBorderRed" : ""}
                              placeholder="Enter your email"
                              // prefix={
                              //   <UserOutlined className="site-form-item-icon" />
                              // }
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />

                            <Input.Group compact>
                              <Select defaultValue="Zhejiang">
                                <Select.Option value="Zhejiang">
                                  Zhejiang
                                </Select.Option>
                                <Select.Option value="Jiangsu">
                                  Jiangsu
                                </Select.Option>
                              </Select>
                              <Input
                                style={{ width: "50%" }}
                                defaultValue="Xihu District, Hangzhou"
                              />
                            </Input.Group>
                          </div>
                        </div>
                        <div className={classes.formRegisterItem}>
                          <div className={classes.formRegisterButton}>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.registerBtn}
                              onClick={handleSubmit}
                              onKeyPress={(e: any) => {
                                if (e.key === "Enter") {
                                  handleSubmit();
                                }
                              }}
                            >
                              Đăng ký
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
const Register = React.memo(RegisterComponent);
export { Register };
