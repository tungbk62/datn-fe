import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme: any) => ({
  avatarBox: {
    width: "auto",
    textAlign: "center"
  },
  displayNone: {
    display: "none",
  },
  avatar: {
    animation: `$fadeEffect 1000ms ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes fadeEffect": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
}));
