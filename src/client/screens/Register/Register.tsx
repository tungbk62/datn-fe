import React, { Fragment } from "react";
import { useStyles } from "./Register.styles";
import { Grid, Paper, Button } from "@material-ui/core";
import {
  AutoComplete,
  Button as ButtonAntd,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Select as SelectAntd,
  Tooltip,
} from "antd";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
                                  placeholder="Nhập họ"
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
                                  placeholder="Nhập tên"
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

                            <Grid
                              style={{ paddingTop: "10px" }}
                              container
                              spacing={1}
                            >
                              <Grid className={""} item xs={4}>
                                <DatePicker
                                  allowClear
                                  style={{ width: "100%",height:"100%" }}
                                  className={
                                    errors.email ? "inputBorderRed" : ""
                                  }
                                  placeholder="Ngày sinh"
                                  // prefix={
                                  //   <UserOutlined className="site-form-item-icon" />
                                  // }
                                  name="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </Grid>
                              <Grid className={""} item xs={4}>
                                <SelectAntd
                                  defaultValue="lucy"
                                  className={classes.selectStyles}
                                  // disabled
                                  options={[{ value: 'lucy', label: 'Lucy' }]}
                                />
                              </Grid>
                              <Grid className={""} item xs={4}>
                                <Input
                                  style={{ width: "100%",height:"100%" }}
                                  defaultValue="Đông Anh"
                                  allowClear
                                  className={
                                    errors.email ? "inputBorderRed" : ""
                                  }
                                  placeholder="Nhập tên"
                                  // prefix={
                                  //   <UserOutlined className="site-form-item-icon" />
                                  // }
                                  maxLength={50}
                                  name="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </Grid>
                            </Grid>
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
