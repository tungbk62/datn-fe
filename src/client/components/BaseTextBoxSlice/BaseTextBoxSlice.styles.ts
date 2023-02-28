import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme: any) => ({
  textStyle: {
    width: "fit-content",
    maxWidth: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    wordBreak: "break-word",
  },
}));
