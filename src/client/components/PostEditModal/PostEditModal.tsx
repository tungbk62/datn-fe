import React, { useState, useEffect } from "react";
import { useStyles } from "./PostEditModal.styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { BaseModal } from "../BaseModal";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Avatar from "@material-ui/core/Avatar";
import CancelIcon from "@material-ui/icons/Cancel";
import { Grid } from "@material-ui/core";
import { BaseButton } from "../BaseButton";
import { Formik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import { debounce } from "lodash";

import {
  UserOutlined,
  SafetyOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import {
  AutoComplete,
  Button as ButtonAntd,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Select as SelectAntd,
  Tooltip,
  Radio,
} from "antd";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import "react-quill/dist/quill.snow.css";

import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

interface Props {
  visible?: boolean;
  title?: string;
  hideModal?: any;
  appState?: any;
  appReducer?: any;
  authState?: any;
  authReducer?: any;
}
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
const plainOptions = [
  { label: "Người đăng bài", value: "business" },
  { label: "Thành viên", value: "customer" },
];

const Component = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { visible, hideModal, appState, appReducer, authReducer, authState } =
    props;
  const [value, setValue] = useState("");

  /// delete

  ///
  const registerValidationSchema = yup.object().shape({
    title: yup
      .string()
      .trim()
      .max(50, "Email quá dài!")
      .required("Bạn chưa nhập tiêu đề!"),
    description: yup
      .string()
      .trim()
      .min(8, "Mô tả quá ngắn!")
      .required("Bạn chưa nhập nhập mô tả!"),
    typeEstateId: yup.number().required("Bạn chưa nhập kiểu bài viết!"),
    wardsId: yup.string().required("Bạn chưa nhập địa chỉ"),
    addressDetail: yup
      .string()
      .trim()
      .max(40, "Tên địa chỉ quá dài!")
      .required("Bạn chưa nhập địa chỉ!"),
    area: yup.number().required("Bạn chưa nhập diện tích!"),
    priceMonth: yup.number().required("Bạn chưa nhập giá tiền!"),
    room: yup.number().required("Bạn chưa nhập số phòng!"),
    bathRoom: yup.number().required("Bạn chưa nhập số nhà vệ sinh!"),
    expiredDate: yup.string().nullable(),
    // .required("Bạn chưa nhập ngày hết hạn!"),
    furniture: yup
      .string()
      .trim()
      .max(20, "Mô tả nội thất!")
      .required("Bạn chưa nhập mô tả nội thất!"),
    typePostId: yup.number().required("Bạn chưa nhập loại bài viết!"),

    // type: yup.string().required("Bạn chưa chọn vị trí"),
  });
  const handleChangeProvince2 = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setLabelProvince(event.target.value);
    setProvince(event.target.value);
  };

  const handleChangeDistinct2 = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    console.log(event.target.value);
    setLabelProvince(event.target.value);
    const tmp = authState?.detailProvince?.filter(
      (item: any) => item.id === event.target.value,
    );
    const tmp2 = tmp[0]?.value.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));
    setDataAddress(tmp2);
  };
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54"),
  );
  const handleChangeAddress2 = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setIdAddress(event.target.value);
  };
  const [labelProvince, setLabelProvince] = useState() as any;
  const [province, setProvince] = useState() as any;
  const handleChangeProvince = (value: string) => {
    setProvince(value);
  };
  const [dataDistrict, setDataDistrict] = useState([]) as any;
  const [dataAddress, setDataAddress] = useState([]) as any;
  const [idAddress, setIdAddress] = useState([]) as any;

  const handleChangeDistinct = (value: string) => {
    const tmp = authState?.detailProvince?.filter(
      (item: any) => item.id === value,
    );
    const tmp2 = tmp[0]?.value.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));
    setDataAddress(tmp2);
  };

  const handleChangeAddress = (value: string) => {
    setIdAddress(value);
  };

  useEffect(() => {
    if (!province) {
      return;
    }
    getDataDistinct();
  }, [province]);


  const getDataDistinct = async () => {
    const data = await authReducer?.getDetailProvince(province);
    setDataDistrict(data);
  };

  const onPost = async (values: any) => {
    const res = await appReducer?.createPost(values);
    if (res) {
      // router.push("/");
      /// refresh
      setValue("")
      hideModal()

    }
  };

  return (
    <BaseModal
      visible={visible || false}
      handleClose={hideModal as any}
      // modalClass={classes.modal}
      // contentClass={classes.modalContent}
    >
      <div className={classes.container}>
        <Fade in={visible}>
          <div className={classes.bannerContainer}>
            <div className={classes.titleContainer}>
              <CancelIcon onClick={hideModal} />
            </div>
          </div>
        </Fade>

        <div className={classes.containerContent}>
          <Formik
            validateOnChange={false}
            validationSchema={registerValidationSchema}
            initialValues={{
              title: "",
              description: "",
              typeEstateId: 2,
              wardsId: "",
              addressDetail: "",
              area: "",
              priceMonth: "",
              furniture: "",
              room: "",
              bathRoom: "",
              expiredDate: null,
              hide: false,
              typePostId: "",
            }}
            onSubmit={onPost}
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
                  <div className={classes.formPostItem}>
                    <div className={classes.formPostInput}>
                      <Grid
                        style={{ paddingTop: "10px", paddingBottom: "10px" }}
                        container
                        spacing={1}
                      >
                        <Grid className={""} item xs={6}>
                          <Input
                            allowClear
                            className={errors.title ? "inputBorderRed" : ""}
                            placeholder="Nhập tiêu đề"
                            prefix={
                              <FileTextOutlined className="site-form-item-icon" />
                            }
                            maxLength={50}
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e: any) => {
                              if (e.key === "Enter") {
                                handleSubmit();
                              }
                            }}
                          />
                          {touched.title && errors.title ? (
                            <div className={classes.errorMess}>
                              {errors.title}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid className={""} item xs={6}></Grid>
                      </Grid>
                      <ReactQuill
                        theme="snow"
                        value={value}
                        // onChange={value => {
                        //   console.log(value)
                        //   setValue(value);
                        // }}
                        onChange={debounce(value => {
                          console.log(value);
                          setValue(value);
                          setFieldValue("description", value);
                        }, 1000)}
                        modules={modules}
                        // value={state.editorHtml}
                        // modules={Editor.modules}
                        // formats={Editor.formats}
                        // bounds={'.app'}
                        // placeholder={props.placeholder}
                      />
                      {touched.description && errors.description ? (
                        <div className={classes.errorMess}>
                          {errors.description}
                        </div>
                      ) : null}
                      <Grid
                        style={{ paddingTop: "10px" }}
                        container
                        spacing={1}
                      >
                        <Grid className={""} item xs={4}>
                          <Input
                            allowClear
                            className={errors.title ? "inputBorderRed" : ""}
                            placeholder="Nhập diện tích (m&sup2;)"
                            maxLength={50}
                            // name="area"
                            onChange={value => {
                              setFieldValue(
                                "area",
                                value ? Number(value.target.value) : null,
                              );
                            }}
                            value={values.area}
                            // onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.area && errors.area ? (
                            <div className={classes.errorMess}>
                              {errors.area}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid className={""} item xs={4}>
                          <Input
                            allowClear
                            className={errors.title ? "inputBorderRed" : ""}
                            placeholder="Nhập số phòng"
                            maxLength={50}
                            // name="room"
                            onChange={value => {
                              setFieldValue(
                                "room",
                                value ? Number(value.target.value) : null,
                              );
                            }}
                            value={values.room}
                            // onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.room && errors.room ? (
                            <div className={classes.errorMess}>
                              {errors.room}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid className={""} item xs={4}>
                          <Input
                            allowClear
                            className={errors.title ? "inputBorderRed" : ""}
                            placeholder="Nhập số phòng tắm"
                            maxLength={50}
                            // name="bathRoom"
                            onChange={value => {
                              setFieldValue(
                                "bathRoom",
                                value ? Number(value.target.value) : null,
                              );
                            }}
                            value={values.bathRoom}
                            // onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.bathRoom && errors.bathRoom ? (
                            <div className={classes.errorMess}>
                              {errors.bathRoom}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid className={""} item xs={4}></Grid>
                      </Grid>

                      <Grid style={{ paddingTop: "0px" }} container spacing={1}>
                        <Grid className={""} item xs={4}>
                          <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">
                              Chọn tỉnh
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={labelProvince}
                              onChange={handleChangeProvince2}
                            >
                              {authState?.listProvince.map(
                                (item: any, index: number) => {
                                  return (
                                    <MenuItem key={index} value={item?.value}>
                                      {item?.label}
                                    </MenuItem>
                                  );
                                },
                              )}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid className={""} item xs={4}>
                          <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">
                              Chọn quận/huyện
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={age}
                              onChange={handleChangeDistinct2}
                            >
                              {dataDistrict.map((item: any, index: number) => {
                                return (
                                  <MenuItem key={index} value={item?.value}>
                                    {item?.label}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid className={""} item xs={4}>
                          <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">
                              Chọn phường xã
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={age}
                              onChange={e => {
                                handleChangeAddress2(e);
                                setFieldValue("wardsId", e.target.value);
                              }}
                            >
                              {dataAddress?.map((item: any, index: number) => {
                                return (
                                  <MenuItem key={index} value={item?.value}>
                                    {item?.label}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      {touched.wardsId && errors.wardsId ? (
                        <div className={classes.errorMess}>
                          {errors.wardsId}
                        </div>
                      ) : null}
                      <Grid
                        style={{ paddingTop: "10px" }}
                        container
                        spacing={1}
                      >
                        <Grid className={""} item xs={4}>
                          <Input
                            allowClear
                            className={errors.title ? "inputBorderRed" : ""}
                            placeholder="Nhập địa chỉ"
                            maxLength={50}
                            name="addressDetail"
                            value={values.addressDetail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(e: any) => {
                              if (e.key === "Enter") {
                                handleSubmit();
                              }
                            }}
                          />
                          {touched.addressDetail && errors.addressDetail ? (
                            <div className={classes.errorMess}>
                              {errors.addressDetail}
                            </div>
                          ) : null}
                        </Grid>

                        <Grid className={""} item xs={4}>
                          {/* <DatePicker
                            // allowClear
                            style={{
                              width: "100%",
                              // height: "100%"
                            }}
                            onChange={value => {
                              console.log(value?.format("yyyy-MM-DD"));
                              setFieldValue(
                                "expiredDate",
                                value ? value.format("yyyy-MM-DD") : null,
                              );
                            }}
                            format="DD/MM/YYYY"
                            className={
                              errors.expiredDate ? "inputBorderRed" : ""
                            }
                            placeholder="Nhập ngày hết hạn"
                            name="expiredDate"
                          />
                          {touched.expiredDate && errors.expiredDate ? (
                            <div className={classes.errorMess}>
                              {errors.expiredDate}
                            </div>
                          ) : null} */}
                          <Input
                            allowClear
                            className={errors.title ? "inputBorderRed" : ""}
                            placeholder="Nhập mô tả nội thất phòng khách"
                            // prefix={
                            //   <UserOutlined className="site-form-item-icon" />
                            // }
                            maxLength={50}
                            name="furniture"
                            onChange={value => {
                              setFieldValue(
                                "furniture",
                                value ? value.target.value : null,
                              );
                            }}
                            value={values.furniture}
                            // onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.furniture && errors.furniture ? (
                            <div className={classes.errorMess}>
                              {errors.furniture}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid className={""} item xs={4}>
                          <Input
                            allowClear
                            className={
                              errors.priceMonth ? "inputBorderRed" : ""
                            }
                            placeholder="Nhập giá"
                            prefix={
                              <DollarCircleOutlined className="site-form-item-icon" />
                            }
                            // name="priceMonth"
                            value={values.priceMonth}
                            // onChange={handleChange}
                            onChange={value => {
                              setFieldValue(
                                "priceMonth",
                                value ? Number(value.target.value) : null,
                              );
                            }}
                            onBlur={handleBlur}
                          />
                          {touched.priceMonth && errors.priceMonth ? (
                            <div className={classes.errorMess}>
                              {errors.priceMonth}
                            </div>
                          ) : null}
                        </Grid>
                      </Grid>

                      <Grid
                        style={{ paddingTop: "10px" }}
                        container
                        spacing={1}
                      >
                        <Grid className={""} item xs={3}>
                          <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">
                              Chọn loại bài viết
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              onChange={e => {
                                setFieldValue("typePostId", e.target.value);
                              }}
                            >
                              {appState?.listPostType?.map(
                                (item: any, index: number) => {
                                  return (
                                    <MenuItem key={index} value={item?.value}>
                                      {item?.label}
                                    </MenuItem>
                                  );
                                },
                              )}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid className={""} item xs={3}></Grid>
                        <Grid className={""} item xs={3}></Grid>
                        <Grid className={""} item xs={3}></Grid>
                      </Grid>
                      {touched.typePostId && errors.typePostId ? (
                        <div className={classes.errorMess}>
                          {errors.typePostId}
                        </div>
                      ) : null}

                      <Grid
                        style={{ paddingTop: "10px" }}
                        container
                        spacing={1}
                      >
                        <Grid className={""} item xs={3}></Grid>
                        <Grid className={""} item xs={3}></Grid>
                        <Grid className={""} item xs={3}></Grid>
                        <Grid className={""} item xs={3}>
                          <BaseButton
                            className={classes.button}
                            onClick={() => {
                              console.log("errors", errors);
                              console.log(values, typeof value);
                              handleSubmit();
                            }}
                          >
                            Đăng tin
                          </BaseButton>
                        </Grid>
                      </Grid>
                      {/* <Grid
                        style={{ paddingTop: "10px" }}
                        container
                        spacing={1}
                      >
                        <Grid className={""} item xs={4}></Grid>
                        <Grid className={""} item xs={4}></Grid>
                      </Grid> */}
                    </div>
                  </div>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </BaseModal>
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
const PostEditModal = React.memo(connect(mapState, mapDispatch)(Component));
export { PostEditModal };
