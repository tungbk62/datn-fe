import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
    },

    container: {
      height: "350px",
      width: "80%",
      backgroundColor: "#ffffff",
      borderRadius: 20,
      flexDirection: "column",
      display: "flex",
    },
    img: {
      cursor: "pointer",
      width: "100%",
      height: "100%",
      // height:"300px",
      // marginTop: 13,
      marginBottom: 11,
      minHeight: 300,
      position: "relative",
      justifyContent: "center",
      display: "flex",
      overflow: "hidden",
      // borderRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      // "&:hover": {
      //   animation: "$scaleEffect 0.5s",
      // },
    },
    cityText: {
      fontSize: 18,
      fontWeight: 500,
      letterSpacing: "-.2px",
      maxHeight: 28,
    },
    newsText: {
      fontSize: 18,
      fontWeight: 500,
      letterSpacing: "-.2px",
      maxHeight: 28,
    },
    textContainer: {
      display: "flex",
      flexDirection: "row",
      width: "95%",
      padding: "0px 5%",
      height: "100%",
      justifyContent: "space-between",
      alignItems: "flex-end",
      // maxHeight:"30px"
      // top
    },
  }),
);
