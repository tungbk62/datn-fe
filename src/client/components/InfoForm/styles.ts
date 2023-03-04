import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "white",
      padding: 25,
      borderRadius: 10,
    },
    registerFormContainer: {
      backgroundColor: "#ffffff",
      padding: "24px",
      borderRadius: 8,
      width: "100%",
      justifyContent: "center",
      minWidth: "538px",
    },
    formRegisterItem: {
      width: "100%",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "center",
    },
    formRegisterInput: {
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
    formRegisterButton: {
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
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginBottom: 10,
    },
    uploadButton: {
      marginBottom: 5,
    },
  }),
);
