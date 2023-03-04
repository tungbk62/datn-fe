import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    siteLayout: {
      width: "100vw",
    },
    siteLayoutBackground: {
      background: "#fff",
      // width:"100vw"
    },
    tabsDesktop: {
      display: "block",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    tabsMobile: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },

    logoCpn: {
      display: "flex",
      width: "150px",
      aspectRatio: "1.74",
      padding: "8px 8px 8px 0px",
      justifyContent: "flex-start",
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
    grow: {
      flexGrow: 1,
      background: "#fff",
    },
    menuButton: {
      backgroundColor: "#ffffff",
      border: "none",
      marginRight: theme.spacing(2),
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: 8,
      backgroundColor: "#DEE0E2",
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
      [theme.breakpoints.down("xs")]: {
        display: "none !important",
      },
      display: "flex",
      alignItems: "center",
      padding: "4px 12px",
    },
    search2: {
      position: "relative",
      borderRadius: 8,
      backgroundColor: "#DEE0E2",
      // alpha(theme.palette.common.white, 0.15),
      // '&:hover': {
      //   backgroundColor: alpha(theme.palette.common.white, 0.25),
      // },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
      display: "none",
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
      alignItems: "center",
      padding: "4px 12px",
    },
    inputRoot: {
      color: "inherit",
      backgroundColor: "inherit",
      border: "none",
      "&:focus-visible": {
        outline: "none !important",
        border: "0px !important",
      },
      "&:focus": {
        border: "0px !important",
      },
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      width: "26ch",
    },
    selection: {
      borderRadius: 15,
      height: 50,
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    loginButton: {
      width: "100px",
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
    registerButton: {
      width: "100px",
      marginLeft: "12px",
      background: "#ff7961",
      fontSize: 14,
      color: "#000",
      borderRadius: 8,
      fontWeight: 400,
      padding: "12px 0",
      "&:hover": {
        // background: color.primaryColorHover,
      },
    },
    center: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    pricingWrap: {
      width: 350,
      display: "flex",
      flexDirection: "row",
    },
  }),
);
