import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
      width: 500,
      height: 400,
      backgroundColor: "white",
      padding: 25,
      borderRadius: 10,
    },
  }),
);