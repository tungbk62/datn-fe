import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: Theme) => createStyles({
    loginButton: {
        marginLeft: "30px",
        height: "30px",
        width: "100px",
        // marginLeft:"24px",
        background: "#ff7961",
        fontSize: 14,
        color: "#000000",
        borderRadius: 8,
        fontWeight: 400,
        padding: "12px 0",
        "&:hover": {
        //   background: color.primaryColorHover,
        },
    },
      container: {
        maxHeight: 640,
      },
}));
