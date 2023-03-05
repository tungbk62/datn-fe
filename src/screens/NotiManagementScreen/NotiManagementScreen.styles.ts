import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
    table: {
      minWidth: 500,
    },
    container: {
      maxHeight: 440,
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    iconFunc: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    logoCpn: {
      display: "flex",
      width: "200px",
      aspectRatio: "1.74",
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
    center: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }),
);
