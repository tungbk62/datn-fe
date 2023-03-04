import React, { Fragment, useEffect, useState } from "react";
import { useStyles } from "./Register.styles";
import { Grid, Button } from "@material-ui/core";
import { DatePicker, Input, Select as SelectAntd } from "antd";
import { AuthWrapper } from "src/components/AuthWrapper";
import { Radio } from "antd";
import { Formik } from "formik";
import {
  UserOutlined,
  SafetyOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { registerValidationSchema } from "@src/store/models/auth/interface";

const plainOptions = [
  { label: "Người đăng bài", value: "business" },
  { label: "Thành viên", value: "customer" },
];

interface Props {
  children?: any;
  appState?: any;
  appReducer?: any;
  title?: any;
  authState?: any;
  authReducer?: any;
}

const RegisterComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { authReducer, authState } = props;
  console.log(authState);
  const router = useRouter();

  const [province, setProvince] = useState("");
  const handleChangeProvince = (value: string) => {
    setProvince(value);
  };
  const [dataDistrict, setDataDistrict] = useState([]) as any;
  const [dataAddress, setDataAddress] = useState([]) as any;
  const [idAddress, setIdAddress] = useState([]) as any;
  const [value1, setValue1] = useState("");

  const onChange1 = ({ target: { value } }: any) => {
    console.log("radio1 checked", value);
    setValue1(value);
  };

  const handleChangeDistinct = (value: string) => {
    const tmp = authState?.detailProvince.filter(
      (item: any) => item.id === value,
    );
    const tmp2 = tmp[0]?.value.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));
    console.log(tmp2);
    setDataAddress(tmp2);
  };

  const handleChangeAddress = (value: string) => {
    setIdAddress(value);
  };

  useEffect(() => {
    if (!province) {
      return;
    }
    const getDataDistinct = async () => {
      const data = await authReducer?.getDetailProvince(province);
      console.log("data district", data);
      setDataDistrict(data);
    };
    getDataDistinct();
  }, [authReducer, province]);

  const onRegister = async (values: any) => {
    console.log("Data:", values);
    const res = await authReducer.register(values);
    if (res) {
      router.push("/login");
    }
  };

  return (
    <AuthWrapper>
      <Fragment>
        <div className={classes.container}>
          <div className={classes.registerFormContainer}>
            <div className={classes.logoCpn}>
              <img src="/assets/logo_main.png" alt="" />
            </div>
            <h3>Đăng ký</h3>
            <div>
              <Formik
                validateOnChange={false}
                validationSchema={registerValidationSchema}
                initialValues={{
                  email: "",
                  password: "",
                  firstName: "",
                  lastName: "",
                  birthDay: "",
                  phone: "",
                  type: "",
                  wardsId: "",
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
                  setFieldValue,
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
                          <Grid
                            style={{ paddingTop: "10px" }}
                            container
                            spacing={1}
                          >
                            <Grid className={""} item xs={6}>
                              <Input
                                allowClear
                                className={errors.email ? "inputBorderRed" : ""}
                                placeholder="Nhập họ"
                                maxLength={50}
                                name="lastName"
                                onChange={value => {
                                  setFieldValue(
                                    "lastName",
                                    value ? value.target.value : null,
                                  );
                                }}
                                value={values.lastName}
                                onBlur={handleBlur}
                              />
                              {touched.lastName && errors.lastName ? (
                                <div className={classes.errorMess}>
                                  {errors.lastName}
                                </div>
                              ) : null}
                            </Grid>
                            <Grid className={""} item xs={6}>
                              <Input
                                allowClear
                                className={errors.email ? "inputBorderRed" : ""}
                                placeholder="Nhập tên"
                                maxLength={50}
                                name="firstName"
                                value={values.firstName}
                                onChange={value => {
                                  setFieldValue(
                                    "firstName",
                                    value ? value.target.value : null,
                                  );
                                }}
                                onBlur={handleBlur}
                                onKeyPress={(e: any) => {
                                  if (e.key === "Enter") {
                                    handleSubmit();
                                  }
                                }}
                              />
                              {touched.firstName && errors.firstName ? (
                                <div className={classes.errorMess}>
                                  {errors.firstName}
                                </div>
                              ) : null}
                            </Grid>
                          </Grid>
                          <Grid
                            style={{ paddingTop: "10px" }}
                            container
                            spacing={1}
                          >
                            <Grid className={""} item xs={6}>
                              <DatePicker
                                style={{
                                  width: "100%",
                                }}
                                onChange={value => {
                                  console.log(value?.format("yyyy-MM-DD"));
                                  setFieldValue(
                                    "birthDay",
                                    value ? value.format("yyyy-MM-DD") : null,
                                  );
                                }}
                                format="DD/MM/YYYY"
                                className={
                                  errors.birthDay ? "inputBorderRed" : ""
                                }
                                placeholder="Ngày sinh"
                                name="birthDay"
                              />
                              {touched.birthDay && errors.birthDay ? (
                                <div className={classes.errorMess}>
                                  {errors.birthDay}
                                </div>
                              ) : null}
                            </Grid>
                            <Grid className={""} item xs={6}>
                              <Input
                                allowClear
                                className={errors.phone ? "inputBorderRed" : ""}
                                placeholder="Nhập SDT"
                                value={values.phone}
                                onChange={value => {
                                  setFieldValue(
                                    "phone",
                                    value ? value.target.value : null,
                                  );
                                }}
                                onBlur={handleBlur}
                              />
                              {touched.phone && errors.phone ? (
                                <div className={classes.errorMess}>
                                  {errors.phone}
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
                              <SelectAntd
                                defaultValue="Chọn tỉnh"
                                className={classes.selectStyles}
                                options={authState?.listProvince}
                                onChange={handleChangeProvince}
                              />
                            </Grid>
                            <Grid className={""} item xs={4}>
                              <SelectAntd
                                defaultValue="Chọn thành phố"
                                className={classes.selectStyles}
                                options={dataDistrict ? dataDistrict : []}
                                onChange={handleChangeDistinct}
                              />
                            </Grid>
                            <Grid className={""} item xs={4}>
                              <SelectAntd
                                defaultValue="Chọn phường/xã"
                                className={classes.selectStyles}
                                options={dataAddress ? dataAddress : []}
                                onChange={(e: any) => {
                                  handleChangeAddress(e);
                                  setFieldValue("wardsId", e);
                                }}
                              />
                            </Grid>
                          </Grid>
                          {touched.wardsId && errors.wardsId ? (
                            <div className={classes.errorMess}>
                              {errors.wardsId}
                            </div>
                          ) : null}

                          <div className={classes.flexBox}>
                            <Radio.Group
                              options={plainOptions}
                              onChange={(e: any) => {
                                onChange1(e);
                                setFieldValue("type", e.target.value);
                              }}
                              value={value1}
                            />
                            {touched.type && errors.type ? (
                              <div className={classes.errorMess}>
                                {errors.type}
                              </div>
                            ) : null}
                          </div>
                          <div className={classes.dontHaveAccountContainer}>
                            <span className={classes.dontHaveAccountText}>
                              Bạn đã có tài khoản ?{" "}
                            </span>
                            <Link href="/login">
                              <a>
                                <span className={classes.registerText}>
                                  {" "}
                                  đăng nhập
                                </span>
                              </a>
                            </Link>
                          </div>
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

const Register = React.memo(connect(mapState, mapDispatch)(RegisterComponent));

export { Register };
