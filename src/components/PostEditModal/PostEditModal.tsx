import React, { useState, useEffect } from "react";
import { useStyles } from "./PostEditModal.styles";
import Fade from "@material-ui/core/Fade";
import { BaseModal } from "../BaseModal";
import CancelIcon from "@material-ui/icons/Cancel";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Button, Grid } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";

import { DollarCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { Input } from "antd";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import "react-quill/dist/quill.snow.css";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Gap from "../Gap";
import ImagePicker from "../ImagePicker/ImagePicker";
import { apiHelper } from "@src/helpers";
import { api } from "@src/constants";
import axios from "axios";

interface Props {
  visible?: boolean;
  title?: string;
  hideModal?: any;
  appState?: any;
  appReducer?: any;
  authState?: any;
  authReducer?: any;
  data?: any;
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

const Component = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { visible, hideModal, appState, appReducer, authReducer, authState, data } =
    props;
  const [description, setDescription] = useState("");

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
    furniture: yup
      .string()
      .trim()
      .max(20, "Mô tả nội thất!")
      .required("Bạn chưa nhập mô tả nội thất!"),
    typePostId: yup.number().required("Bạn chưa nhập loại bài viết!"),
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
  const handleChangeAddress2 = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setIdAddress(event.target.value);
  };
  const [labelProvince, setLabelProvince] = useState() as any;
  const [province, setProvince] = useState() as any;
  const [dataDistrict, setDataDistrict] = useState([]) as any;
  const [dataAddress, setDataAddress] = useState([]) as any;
  const [idAddress, setIdAddress] = useState([]) as any;
  const [images, setImages] = useState<ImageListType>([]);
  const [deleteImageId, setDeleteImageId] = useState([]);

  useEffect(() => {
    if (!province) {
      return;
    }
    getDataDistinct();
  }, [province]);

  useEffect(() => {
    console.log("images", images);
  }, [images]);

  useEffect(() => {
    if(data){

      setDescription(data?.description);
      console.log("tao tinh");
      setProvince(data.provinceId);
      const tmp = authState?.detailProvince?.filter(
        (item: any) => item.id === data.districtId,
      );
      const tmp2 = tmp[0]?.value.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));
      console.log("heloooo");
      console.log(tmp2);
      setDataAddress(tmp2);
    }
    setImages([]);
  }, [props.visible]);

  const getDataDistinct = async () => {
    const data = await authReducer?.getDetailProvince(province);
    setDataDistrict(data);
  };

  const onPost = async (values: any) => {
    console.log(values);
    console.log(data);
    console.log('delete', deleteImageId);
    if(data){
      values.id = data.id;
      console.log(values);
      const res1 = await appReducer?.updatePost(values);

      let res2;
      if(deleteImageId.length > 0){
        res2 = await appReducer?.deleteImage(deleteImageId);
      }else{
        res2 = true;
      }

      if (res1 && res2) {
        setDescription("");
        hideModal();
      }
    }else{
      const res = await appReducer?.createPost(values);
      if (res && images.length > 0) {
        const formData = new FormData();

        const uploadLoadImage = async () =>{
          console.log("upload image");
          const resImage = await axios.post(api.uploadPostImage(res.id), formData, {headers: { "Content-Type": "multipart/form-data" }});
          if(resImage.status = 200){
            setDescription("");
            hideModal();
          }
        }

        images.forEach(o => formData.append("files", o.file as File, o.file?.name));

        console.log("formData", formData);

        uploadLoadImage();
      }else if(res){
        setDescription("");
        hideModal();
      }
    }
    
  };

  const buttonText = data ? "Cập nhật" : "Đăng tin"; 

  return (
    <BaseModal visible={visible || false} handleClose={hideModal as any}>
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
            initialValues={{
              id: null,
              title: null,
              description: null,
              typeEstateId: null,
              wardsId: null,
              addressDetail: null,
              area: null,
              priceMonth: null,
              furniture: null,
              room: null,
              bathRoom: null,
              expiredDate: null,
              hide: false,
              typePostId: null,
            }}
            onSubmit={onPost}
          >
            {({
              handleChange,
              handleBlur,
              values,
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
                            className={"inputBorderRed"}
                            placeholder="Nhập tiêu đề"
                            prefix={
                              <FileTextOutlined className="site-form-item-icon" />
                            }
                            maxLength={200}
                            name="title"
                            defaultValue={data?.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid className={""} item xs={6}></Grid>
                      </Grid>
                      <ReactQuill
                        theme="snow"
                        defaultValue={description}
                        onChange={value => {
                          console.log("value", value);
                          setDescription(value);
                          setFieldValue("description", value);
                        }}
                        modules={modules}
                      />
                      <Grid
                        style={{ paddingTop: "10px" }}
                        container
                        spacing={1}
                      >
                        <Grid className={""} item xs={4}>
                          <Input
                            allowClear
                            className={"inputBorderRed"}
                            placeholder="Nhập diện tích (m&sup2;)"
                            maxLength={50}
                            name="area"
                            onChange={event => {
                              console.log(event.target.value)
                              setFieldValue(
                                "area",
                                event ? Number(event.target.value) : null,
                              );
                            }}
                            defaultValue={data?.area}
                            // onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid className={""} item xs={4}>
                          <Input
                            allowClear
                            className={"inputBorderRed"}
                            placeholder="Nhập số phòng"
                            maxLength={50}
                            // name="room"
                            onChange={value => {
                              setFieldValue(
                                "room",
                                value ? Number(value.target.value) : null,
                              );
                            }}
                            defaultValue={data?.room}
                            // onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid className={""} item xs={4}>
                          <Input
                            allowClear
                            className={"inputBorderRed"}
                            placeholder="Nhập số phòng tắm"
                            maxLength={50}
                            onChange={value => {
                              setFieldValue(
                                "bathRoom",
                                value ? Number(value.target.value) : null,
                              );
                            }}
                            defaultValue={data?.bathRoom}
                            onBlur={handleBlur}
                          />
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
                              defaultValue={data?.provinceId}

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
                              defaultValue={data?.districtId}
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
                              // value={data?.wardsId}
                              onChange={e => {
                                handleChangeAddress2(e);
                                setFieldValue("wardsId", e.target.value);
                              }}
                              defaultValue={data?.wardsId}
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
                      <Grid
                        style={{ paddingTop: "10px" }}
                        container
                        spacing={1}
                      >
                        <Grid className={""} item xs={4}>
                          <Input
                            allowClear
                            className={"inputBorderRed"}
                            placeholder="Nhập địa chỉ"
                            maxLength={50}
                            name="addressDetail"
                            value={data?.addressDetail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>

                        <Grid className={""} item xs={4}>
                          <Input
                            allowClear
                            className={"inputBorderRed"}
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
                            defaultValue={data?.furniture}
                            // onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid className={""} item xs={4}>
                          <Input
                            allowClear
                            className={"inputBorderRed"}
                            placeholder="Nhập giá"
                            prefix={
                              <DollarCircleOutlined className="site-form-item-icon" />
                            }
                            // name="priceMonth"
                            defaultValue={data?.priceMonth}
                            // onChange={handleChange}
                            onChange={value => {
                              setFieldValue(
                                "priceMonth",
                                value ? Number(value.target.value) : null,
                              );
                            }}
                            onBlur={handleBlur}
                          />
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
                              defaultValue={data?.typePostId}
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
                        <Grid className={""} item xs={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">
                              Chọn loại hình cho thuê
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              onChange={e => {
                                setFieldValue("typeEstateId", e.target.value);
                              }}
                              defaultValue={data?.typeEstateId}
                            >
                              {appState?.listTypeEstate?.map(
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
                      </Grid>
                      {data && <ImagePicker images={data.imageList.map((o : any) => ({src: o.url, value:  o.id}))} setDeleteImageId={setDeleteImageId} />}
                      <ImageUploading
                        multiple
                        value={images}
                        onChange={imageList => {
                          setImages(imageList);}}
                        maxNumber={5}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemove,
                          dragProps,
                        }) => (
                          <div>
                            <div className={classes.images}>
                              {imageList.map((image, index) => (
                                <div
                                  key={index}
                                  className="image-item"
                                  style={{ position: "relative" }}
                                >
                                  <img
                                    src={image["data_url"]}
                                    alt=""
                                    width="150"
                                  />
                                  <DeleteForeverIcon
                                    className={classes.deleteIcon}
                                    onClick={() => onImageRemove(index)}
                                    fontSize="medium"
                                  />
                                </div>
                              ))}
                            </div>
                            <Gap.XS />
                            <Button
                              {...dragProps}
                              variant="contained"
                              color="default"
                              size="small"
                              startIcon={<CloudUploadIcon />}
                              onClick={onImageUpload}
                            >
                              Upload
                            </Button>
                          </div>
                        )}
                      </ImageUploading>
                      <Grid
                        style={{ paddingTop: "10px" }}
                        container
                        spacing={1}
                      >
                        <Grid className={""} item xs={3}></Grid>
                        <Grid className={""} item xs={3}></Grid>
                        <Grid className={""} item xs={3}></Grid>
                        <Grid className={""} item xs={3}>
                          <Button
                            className={classes.button}
                            onClick={() => {
                              console.log("images", values);
                              onPost(values);}}
                          >
                            {buttonText}
                          </Button>
                        </Grid>
                      </Grid>
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
