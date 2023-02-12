import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
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
    containerGird: {
      padding: "0 5%",
    },
    box: {
      height: "100%",
    },
    registerFormContainer: {
      backgroundColor: "#DDDDDD",
      padding: "24px",
      borderRadius: 8,
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
    },
  }),
);
