import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Grid, Button, Avatar } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { DatePicker, Input, Select as SelectAntd } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SafetyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useStyles } from "./styles";
import { apiHelper } from "@src/helpers";
import { api } from "@src/constants";
import {
  RegisterValidation,
  registerValidationSchema,
} from "@src/store/models/auth/interface";

type Province = { value: number; label: string };
type District = { value: number; label: string };
type Ward = { value: number; label: string };

type Props = {
  provinces: Province[];
  onSubmit: (values: RegisterValidation) => void;
};

const InfoForm: React.FC<Props> = props => {
  const classes = useStyles();
  const [province, setProvince] = useState() as any;
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const handleChangeProvince = (value: string) => {
    setProvince(value);
  };

  const handleChangeDistrict = (value: string) => {
    // const tmp = districts.filter(item => item.id === value);
    // const tmp2 = tmp[0]?.value.map((item: any) => ({
    //   value: item.id,
    //   label: item.name,
    // }));
    // console.log(tmp2);
    // setDataAddress(tmp2);
  };

  useEffect(() => {
    if (!province) {
      return;
    }
    const getDistricts = async () => {
      // const data = await authReducer?.getDetailProvince(province);
      const data = await apiHelper.get<District[]>(
        `${api.GET_LIST_PROVINCE}/${province}`,
      );
      console.log("data district", data);
      setDistricts(data);
    };
    getDistricts();
  }, [province]);

  return (
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
      onSubmit={props.onSubmit}
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
      }) => {
        return (
          <div className={classes.container}>
            <div className={classes.formRegisterItem}>
              <div className={classes.formRegisterInput}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src="/public/default-profile.jpg"
                    className={classes.avatar}
                  />
                  <Button
                    variant="contained"
                    color="default"
                    size="small"
                    className={classes.uploadButton}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                  </Button>
                </div>
                <Input
                  allowClear
                  className={errors.email ? "inputBorderRed" : ""}
                  placeholder="Enter your email"
                  prefix={<UserOutlined className="site-form-item-icon" />}
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
                  <div className={classes.errorMess}>{errors.email}</div>
                ) : null}

                <Input.Password
                  allowClear
                  className={errors.password ? "inputBorderRed" : ""}
                  placeholder="Enter your password"
                  prefix={<SafetyOutlined className="site-form-item-icon" />}
                  style={{ marginTop: "10px" }}
                  iconRender={visible =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
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
                  <div className={classes.errorMess}>{errors.password}</div>
                ) : null}

                <Grid style={{ paddingTop: "10px" }} container spacing={1}>
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
                      <div className={classes.errorMess}>{errors.lastName}</div>
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
                <Grid style={{ paddingTop: "10px" }} container spacing={1}>
                  <Grid className={""} item xs={6}>
                    <DatePicker
                      // allowClear
                      style={{
                        width: "100%",
                        // height: "100%"
                      }}
                      onChange={value => {
                        console.log(value?.format("yyyy-MM-DD"));
                        setFieldValue(
                          "birthDay",
                          value ? value.format("yyyy-MM-DD") : null,
                        );
                      }}
                      format="DD/MM/YYYY"
                      className={errors.birthDay ? "inputBorderRed" : ""}
                      placeholder="Ngày sinh"
                      name="birthDay"
                    />
                    {touched.birthDay && errors.birthDay ? (
                      <div className={classes.errorMess}>{errors.birthDay}</div>
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
                      <div className={classes.errorMess}>{errors.phone}</div>
                    ) : null}
                  </Grid>
                </Grid>

                <Grid style={{ paddingTop: "10px" }} container spacing={1}>
                  <Grid className={""} item xs={4}>
                    <SelectAntd
                      defaultValue="Chọn tỉnh"
                      className={classes.selectStyles}
                      options={props.provinces}
                      onChange={handleChangeProvince}
                    />
                  </Grid>
                  <Grid className={""} item xs={4}>
                    <SelectAntd
                      defaultValue="Chọn thành phố"
                      className={classes.selectStyles}
                      options={districts}
                      onChange={handleChangeDistrict}
                    />
                  </Grid>
                  <Grid className={""} item xs={4}>
                    <SelectAntd
                      defaultValue="Chọn phường/xã"
                      className={classes.selectStyles}
                      options={wards}
                      onChange={(e: any) => {
                        // handleChangeAddress(e);
                        setFieldValue("wardsId", e);
                      }}
                    />
                  </Grid>
                </Grid>
                {touched.wardsId && errors.wardsId ? (
                  <div className={classes.errorMess}>{errors.wardsId}</div>
                ) : null}
              </div>
            </div>
            <div className={classes.formRegisterButton}>
              <Button
                variant="contained"
                color="primary"
                className={classes.registerBtn}
                onClick={() => handleSubmit()}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              >
                Cap nhat
              </Button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default InfoForm;
