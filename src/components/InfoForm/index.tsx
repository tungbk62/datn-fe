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
// import {
//   RegisterValidation,
//   registerValidationSchema,
// } from "@src/store/models/auth/interface";

type Province = { value: number; label: string };
type District = { value: number; label: string };
type Ward = { value: number; label: string };

type Props = {
  authReducer: any;
  authState: any;
  // onSubmit: (values: RegisterValidation) => void;
};

const InfoForm: React.FC<Props> = props => {
  const classes = useStyles();
  const [provinceId, setProvinceId] = useState() as any;
  const [districtId, setDistrictId] = useState();
  const [wardsId, setWardsId] = useState();
  const [dataProvince, setDataProvince] = useState([]) as any;
  const [dataDistrict, setDataDistrict] = useState([]) as any;
  const [dataWards, setDataWards] = useState([]) as any;
  const [dataDistrictWards, setDataDistrictWards] = useState([]) as any;
  const [userData, setUserData] = useState() as any;
  let userDataVariable : any;
  let dataProvinceVariable : any;
  let dataDistrictVariable : any;
  let dataWardsVariable : any;
  let dataDistrictWardsVariable : any;

  const onPost = (data: any) =>{

  }

  // useEffect(() => {
  //   if (!province) {
  //     return;
  //   }
  //   const getDistricts = async () => {
  //     // const data = await authReducer?.getDetailProvince(province);
  //     const data = await apiHelper.get<District[]>(
  //       `${api.GET_LIST_PROVINCE}/${province}`,
  //     );
  //     console.log("data district", data);
  //     setDataDistrict(data);
  //   };
  //   getDistricts();
  // }, [province]);

  const getDistrictList = async (provinceId: number) =>{
    console.log("provinceId", provinceId)
    const data = await apiHelper.get<any>(api.getDetailProvince(provinceId));
      if(data){
        dataDistrictWardsVariable = data;
        setDataDistrictWards(data);
        setDataDistrict(dataDistrictWardsVariable.district.map((o: any) => { return {value: o.id, label: o.name}}))
      }
  }

  const getWardsList = async (districtId: any) => {
    console.log("districtId", dataDistrictWardsVariable);
    const data = dataDistrictWardsVariable.district.filter((o :any) => o.id === districtId)[0].map((o: any) => { return {value: o.id, label: o.name}});
    console.log("districtId", data);
    dataWardsVariable = data;
    setDataWards(data);
  }

  useEffect(() => {
    console.log("get user detail");
    const getUserData = async () => {
      const data = await apiHelper.get<any>(api.getUserDetail);
      userDataVariable = data;
      setUserData(data);
      console.log("end get user data");
    };

    const getProvinceList = async () => {
      console.log("heloooo");
      const data = await apiHelper.get<any>(api.getProvinceList);
      if(data){
        // console.log("list province", data);
        const dataMap = data.map((o :any) => {return {value: o.id, label: o.name}})
        console.log("end get province list", dataMap);
        setDataProvince(dataMap);
        getDistrictList(userDataVariable.provinceId);
        getWardsList(userDataVariable.districtId);
        // setProvinceId(userData.provinceId);
        // console.log("end get province list", userData);
      }
    }
    getUserData().then(() => {getProvinceList()});
    
  },[]);

  // useEffect(() =>{
  //   if(!provinceId){
  //     return;
  //   }
  //   console.log("useEffect get district", provinceId);
  //   getDistrictList(provinceId);
  // }, [provinceId])

  // useEffect(() =>{
  //   if(!districtId){
  //     return;
  //   }
  //   console.log("useEffect get wards", districtId);
  //   getWardsList(districtId);
  // }, [districtId])

  return (
    <Formik
      initialValues={{
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        birthDay: null,
        phone: null,
        wardsId: null,
      }}
      onSubmit={onPost}
      validateOnBlur
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
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
                    src = {userData?.imageUrl}
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
                  className={""}
                  placeholder="Nhập địa chỉ email"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  maxLength={50}
                  name="email"
                  value={userData?.email}
                  onChange={value => {
                    console.log(value.target.value);
                    setFieldValue(
                      "email",
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
                <Grid style={{ paddingTop: "10px" }} container spacing={1}>
                  <Grid className={""} item xs={6}>
                    <Input
                      allowClear
                      className={""}
                      placeholder="Nhập họ"
                      maxLength={50}
                      name="firstName"
                      onChange={value => {
                        setFieldValue(
                          "lastName",
                          value ? value.target.value : null,
                        );
                      }}
                      value={userData?.firstName}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid className={""} item xs={6}>
                    <Input
                      allowClear
                      className={""}
                      placeholder="Nhập tên"
                      maxLength={50}
                      name="lastName"
                      value={userData?.lastName}
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
                  </Grid>
                </Grid>
                <Grid style={{ paddingTop: "10px" }} container spacing={1}>
                  {/* <Grid className={""} item xs={6}>
                    <DatePicker
                      // allowClear
                      style={{
                        width: "100%",
                        // height: "100%"
                      }}
                      value={userData?.birthDay}
                      onChange={value => {
                        console.log(value?.format("yyyy-MM-DD"));
                        setFieldValue(
                          "birthDay",
                          value ? value.format("yyyy-MM-DD") : null,
                        );
                      }}
                      format="DD/MM/YYYY"
                      className={""}
                      placeholder="Ngày sinh"
                      name="birthDay"
                    />
                  </Grid> */}
                  <Grid className={""} item xs={6}>
                    <Input
                      allowClear
                      className={""}
                      placeholder="Nhập SDT"
                      value={userData?.phone}
                      onChange={value => {
                        setFieldValue(
                          "phone",
                          value ? value.target.value : null,
                        );
                      }}
                      onBlur={handleBlur}
                    />
                  </Grid>
                </Grid>

                <Grid style={{ paddingTop: "10px" }} container spacing={1}>
                  <Grid className={""} item xs={4}>
                    <SelectAntd
                      placeholder="Chọn tỉnh"
                      className={classes.selectStyles}
                      value={userData?.provinceId}
                      options={dataProvince}
                      onChange={(e) => {setProvinceId(e)}}
                    />
                  </Grid>
                  <Grid className={""} item xs={4}>
                    <SelectAntd
                      placeholder="Chọn huyện"
                      className={classes.selectStyles}
                      options={dataDistrict}
                      value={userData?.districtId}
                      onChange={(e) => {setDistrictId(e)}}
                    />
                  </Grid>
                  <Grid className={""} item xs={4}>
                    <SelectAntd
                      placeholder="Chọn phường/xã"
                      className={classes.selectStyles}
                      options={dataWards}
                      value={userData?.wardsId}
                      onChange={(e: any) => {
                        // handleChangeAddress(e);
                        setFieldValue("wardsId", e);
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className={classes.formRegisterButton}>
              <Button
                variant="contained"
                color="primary"
                className={classes.registerBtn}
                onClick={() => onPost(values)}
              >
                Cập nhật
              </Button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export const ChangePWForm: React.FC = props => {
  const classes = useStyles();

  const onChangePassword = (data: any) =>{

  }

  return (
    <Formik
      initialValues={{
        oldPassword: null,
        newPassword: null,
        reNewPassword: null,
      }}
      onSubmit={onChangePassword}
      validateOnBlur
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
      }) => {
        return (
          <div className={classes.container}>
            <div className={classes.formRegisterItem}>
              <div className={classes.formRegisterInput}>
                <Input.Password
                  allowClear
                  className={""}
                  placeholder="Nhập mật khẩu cũ"
                  prefix={<SafetyOutlined className="site-form-item-icon" />}
                  style={{ marginTop: "10px" }}
                  iconRender={visible =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  maxLength={50}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
                <Input.Password
                  allowClear
                  placeholder="Nhập mật khẩu mới"
                  prefix={<SafetyOutlined className="site-form-item-icon" />}
                  style={{ marginTop: "10px" }}
                  iconRender={visible =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  maxLength={50}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
                <Input.Password
                  allowClear
                  placeholder="Nhập lại mật khẩu mới"
                  prefix={<SafetyOutlined className="site-form-item-icon" />}
                  style={{ marginTop: "10px" }}
                  iconRender={visible =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  maxLength={50}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
              </div>
            </div>
            <div className={classes.formRegisterButton}>
              <Button
                variant="contained"
                color="primary"
                className={classes.registerBtn}
                onClick={() => onChangePassword(values)}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              >
                Cập nhật
              </Button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default InfoForm;
