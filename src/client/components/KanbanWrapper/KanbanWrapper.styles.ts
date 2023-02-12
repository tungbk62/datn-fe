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
    logo: {
      height: "100px",
      // margin: "16px",
      padding: "16px 0px 16px 0px",
      // margin: "8px 8px 8px 8px",
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // background: "rgba(255, 255, 255, 0.3)",
      // background:"/assets/finatechCloneLogo.png"
    },
    bttStyle: {
      width: "80%",
    },
    logoCpn: {
      display: "flex",
      padding: "8px 8px 8px 24px",
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
    menuContainer: {
      width: "100%",
      height: "100vh",
    },
    userAvatar: {
      objectFit: "cover",
      borderRadius: "25px",
      width: "20px",
      height: "20px",
    },
    iconConfig: {
      fontSize: "20px",
      paddingRight: "10px",
      paddingLeft: "10px",
    },
    bttConfig: {
      display: "flex",
      paddingLeft: "30px",
      width: "90%",
      boxShadow: "none",
      border: "none",
    },
    bttContainer: {
      display: "flex",
      width: "100px",
      justifyContent: "flex-start",
    },
    trigger: {
      padding: "0 24px",
      fontSize: "18px",
      lineHeight: "64px",
      cursor: "pointer",
      transition: "color 0.3s",
      "&:hover": {
        color: "#1890ff",
      },
    },
    iconContainer: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
      flexDirection: "row",
      justifyContent: "space-around",
      cursor: "pointer",
    },
    configItemContainer: {
      display: "flex",
      flexDirection: "row",
      position: "fixed",
      right: "0px",
      // alignItems: "center",
      // justifyContent: "center",
      top: "0",
      maxHeight: 64,
    },
  }),
);
