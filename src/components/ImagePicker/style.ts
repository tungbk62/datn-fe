import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageList: {
      display: 'flex',
      border: "20px",
      borderColor: "#000000",
    },
    imageContainer: {
      display: 'flex',
      position: "relative",
      width: "100px",
      height: "100px",
      marginRight: "20px",
    },
    imageItem: {
      // position: "relative",
      width: "inherit",
      height: "inherit",
    },
    imageIcon:{
      // float: "right",
      position: "absolute",
      right: "0",
      top: "0",
      cursor:"hover",
    },
  }),
);