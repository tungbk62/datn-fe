import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme: any) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Barlow",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 15,
    outline: "unset",
  },
  bgColorDark: {
    backgroundColor: "rgba(0,0,0,0.65)",
  },
  container: {
    width: "800px",
    height: "450px",
    "& .ql-editor": {
      maxHeight: "180px",
      minHeight: "180px",
    },
  },
  containerContent: {
    height: "400px",
    overflowY: "scroll",
    overflowX: "hidden",
    maxHeight: 420,
  },
  bannerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  titleContainer: {
    // position: "fixed",
    // marginTop: "12px",
    // marginRight:"12px",
    display: "flex",
  },
  small: {
    width: 70,
    height: 70,
  },
  containerGird: {
    padding: "0 5%",
    width: "100%",
    // height:"100%",
    "& .ant-carousel": {
      height: "100%",
      margin: "auto",
      // display:'flex',
      // justifyContent:'center',
      // alignItems:"center",
    },
  },
  box: {
    height: "100%",
    width: "100%",
  },
  textStyle: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#080930",
  },
  textBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  button: {
    width: "100%",
    // marginLeft:"24px",
    background: "#ff7961",
    fontSize: 14,
    color: "#fff",
    borderRadius: 8,
    fontWeight: 400,
    padding: "12px 0",
    "&:hover": {
      // background: color.primaryColorHover,
    },
  },

  formPostItem: {
    width: "100%",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
  },
  formPostInput: {
    width: "100%",

    "& input": {
      fontSize: "14px",
      marginLeft: "10px",
      [theme?.breakpoints?.down("sm")]: {
        fontSize: "13px",
      },
    },
    "& .ant-input-affix-wrapper": {
      fontSize: "18px",
      [theme?.breakpoints?.down("sm")]: {
        fontSize: "14px",
      },
    },
    inputBorderRed: {
      border: "1px solid red !important",
    },
    "& .ant-input-clear-icon": {
      fontSize: "14px",
    },
  },
  errorMess: {
    color: "red",
  },
  formPostButton: {
    width: "100%",
  },
  registerBtn: {
    border: "none",
    width: "100%",
    padding: "10px",
    // backgroundColor: prim,
    color: "#fff",
    fontSize: "20px",
    borderRadius: "4px",
    "&:hover": {
      opacity: "0.8",
      cursor: "pointer",
    },
    [theme?.breakpoints?.down("sm")]: {
      padding: "8px",
      fontSize: "16px",
    },
    "& .MuiButton-label": {
      color: "#ffffff",
    },
  },
  selectStyles: {
    width: "100%",
    height: "100%",
    "& .ant-select-selector": {
      height: "100% !important",
    },
  },
  flexBox: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "12px 0",
  },
  logoCpn: {
    display: "flex",
    width: "150px",
    aspectRatio: "1.74",
    padding: "8px 8px 8px 0px",
    justifyContent: "center",
    backgroundColor: "#fff",
    // height: "32px",
    // margin: "16px",
    cursor: "pointer",
    "& >img": {
      width: "fit-content",
      height: "100%",
      objectFit: "cover",
    },
  },
  dontHaveAccountContainer: {
    marginTop: 12,
    display: "flex",
    justifyContent: "center",
    marginBottom: 12,
  },
  dontHaveAccountText: {
    color: "#080930",
    fontSize: 15,
  },
  registerText: {
    color: "#ff7961",
    fontSize: 15,
    textDecoration: "underline",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  images: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  deleteIcon: {
    position: "absolute",
    top: 2,
    right: 2,
    cursor: "pointer",
  },
}));
