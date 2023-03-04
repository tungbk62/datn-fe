import { makeStyles } from "@material-ui/core";
import { systemColor } from "@helpers/color";
export const useStyles = makeStyles((theme: any) => ({
  footer: {
    marginTop: 90,
    minHeight: 222,
    background: "#F4F4F4",
    "& a": {
      color: "unset",
      marginRight: 15,
    },
    "& a:hover": {
      // color: color.primaryColor,
    },
    [theme?.breakpoints?.down("sm")]: {
      marginTop: 50,
    },
  },
  firstCol: {
    maxWidth: "96%",
    fontSize: 14,
    lineHeight: "25px",
    textAlign: "inherit",
    color: "#838383",
    fontStyle: "italic",
    [theme?.breakpoints?.down("lg")]: {
      fontSize: 13,
    },
    [theme?.breakpoints?.down("lg")]: {
      fontSize: 13,
    },
  },
  iconLinks: {
    display: "flex",
    // justifyContent: "space-between",
    marginTop: 15,
    maxWidth: 337,
    [theme?.breakpoints?.down("sm")]: {
      paddingBottom: 25,
    },
  },
  productCol: {
    display: "flex",
    flexDirection: "column",
    [theme?.breakpoints?.down("md")]: {
      width: "100%",
    },
  },
  titleCol: {
    fontWeight: 700,
    fontSize: 20,
    lineHeight: "30px",
    color: "#080930",
    [theme?.breakpoints?.down("lg")]: {
      fontSize: 18,
    },
    [theme?.breakpoints?.down("md")]: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 15,
    },
  },
  iconExpand: {
    cursor: "pointer",
  },
  listLink: {
    listStyle: "none",
    paddingLeft: 0,
    color: "#373737",
    lineHeight: "32px",
    fontSize: 16,
    [theme?.breakpoints?.down("lg")]: {
      fontSize: 14,
    },
  },
  copyRight: {
    height: "53px",
    background: "#E4E4E4",
    fontSize: "14px",
    lineHeight: "40px",
    color: "#080930",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    [theme?.breakpoints?.down("sm")]: {
      height: "auto",
      lineHeight: "20px",
      fontSize: "12px",
      padding: "0 15px",
      "& #develop": {
        dispaly: "block",
      },
    },
  },
  thirdCol: {},
  svg: {
    fill: "#717171",
    "&:hover": {
      // fill: color.primaryColor,
    },
  },
  colContainer: {
    display: "flex",
    justifyContent: "center",
    [theme?.breakpoints?.down("md")]: {
      justifyContent: "unset",
    },
  },
  form: {
    maxWidth: 337,
    "& .MuiButton-root:hover": {
      backgroundColor: "#BFBFBF",
    },
    marginBottom: "10px",
    [theme?.breakpoints?.down("xs")]: {
      marginTop: "15px",
    },
    "& .MuiFormControl-root": {
      width: "70%",
      "& #outlined-size-normal-long-email-label": {
        color: "#808080",
        top: "-3px",
      },

      "& .MuiOutlinedInput-root": {
        borderRadius: "0",
        height: "52px",
        "& #outlined-size-normal-long-email-label::placeholer": {
          color: "#060726",
        },
        color: "#060726",
        "& fieldset": {
          "border-color": "#B8B8B8",
          borderWidth: "1px",
          borderTop: "1.5px solid #B8B8B8",
        },
      },
    },
  },
  bntEmail: {
    "&:hover": {
      backgroundColor: "#808080",
    },
    backgroundColor: "#B8B8B8",
    padding: 0,
    height: "52px",
    width: "30%",
    "& span": {
      color: "#060726",
      fontWeight: 700,
      fontSize: 16,
    },
  },
  iconMedia: {
    fill: "#717171",
    "&:hover": {
      // fill: color.primaryColor,
    },
  },
  logoNft: {
    maxWidth: 160,
    marginBottom: 5,
  },
  h2Box: {
    display: "block !important",
  },
  logoCpn: {
    display: "flex",
    width: "150px",
    aspectRatio: "1.74",
    padding: "8px 8px 8px 0px",
    justifyContent: "flex-start",
    // backgroundColor: "#fff",
    // height: "32px",
    // margin: "16px",
    cursor: "pointer",
    "& >img": {
      width: "fit-content",
      height: "100%",
      objectFit: "cover",
    },
  },
  box: {
    height: "100%",
    width: "100%",
  },
  contactCotainer: {
    display: "flex",
    padding: "0px 0px 0px 10px",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  large: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  categoryName: {
    maxWidth: "100%",
    fontSize: 16,
    lineHeight: "28px",
    fontWeight: 500,
    color: systemColor.ink500,
    [theme?.breakpoints?.down("xs")]: {
      fontSize: 13,
      lineHeight: "19px",
    },
    padding: "0px 0px 12px 0px",

    "&:hover": {
      color: systemColor.black300,
      fontWeight: 600,
    },
  },
  normalNme: {
    maxWidth: "100%",
    fontSize: 14,
    lineHeight: "28px",
    fontWeight: 400,
    color: systemColor.ink500,
    [theme?.breakpoints?.down("xs")]: {
      fontSize: 13,
      lineHeight: "19px",
    },
    padding: "0px 0px 12px 0px",

    "&:hover": {
      color: systemColor.black300,
      fontWeight: 600,
    },
  },
  inputStyle: {
    width: "70%",
  },
}));
