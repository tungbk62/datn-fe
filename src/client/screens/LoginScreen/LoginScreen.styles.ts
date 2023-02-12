import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { color } from "@app-client/constants";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "100vh",
      // width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: "#E5E5E5",
    },
    inputStyles:{
    
    },
    containerGird: {
      padding: "0 5%",
    },
    box: {
      height: "100%",
    },
    loginFormContainer: {
      backgroundColor: "#DDDDDD",
      padding: "24px",
      borderRadius: 8,
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
      [theme?.breakpoints?.down("sm")]: {
        padding: "8px",
        fontSize: "16px",
      },
    },
  }),
  
);
