import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "white",
      padding: 25,
      borderRadius: 10,
      width: 500,
    },
    notiDetail: {
      display: "flex",
      flexDirection: "row",
    },
  }),
);
