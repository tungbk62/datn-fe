import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
    },
    container: {
      width: "100%",
      backgroundColor: "#ffffff",
      borderRadius: 20,
    },
    img: {
      cursor: "pointer",
      width: "100%",
      height: "100%",
      marginBottom: 11,
      minHeight: 300,
      // position: "relative",
      display: "flex",
      justifyContent: "center",
      overflow: "hidden",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
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
    },
  }),
);
