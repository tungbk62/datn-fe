import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { color } from "@src/constants";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "100vh",
      // width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: "#ffff",
    },
    inputStyles: {},
    containerGird: {
      padding: "0 5%",
    },
    box: {
      height: "100%",
    },
    loginFormContainer: {
      backgroundColor: "#ffffff",
      padding: "24px",
      borderRadius: 8,
      width: "100%",
      justifyContent: "center",
      minWidth: "538px",
    },
    formLoginItem: {
      width: "100%",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "center",
    },
    formLoginInput: {
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
    formLoginButton: {
      width: "100%",
    },
    loginBtn: {
      border: "none",
      width: "100%",
      padding: "14px",
      fontSize: "24px",
      borderRadius: "4px",
      "&:hover": {
        opacity: "0.8",
        cursor: "pointer",
      },
      "& .MuiButton-label": {
        color: "#ffffff",
      },
      [theme?.breakpoints?.down("sm")]: {
        padding: "8px",
        fontSize: "16px",
      },
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
  }),
);
