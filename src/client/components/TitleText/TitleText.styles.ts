import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme: any) => ({
  textTitle: {
    display: "flex",
    fontSize: 30,
    fontWeight: 600,
    marginTop: 48,
    [theme?.breakpoints?.between("sm", "md")]: {
      marginTop: 40,
      fontSize: 28,
    },
    [theme?.breakpoints?.down("xs")]: {
      marginTop: 18,
      fontSize: 14,
    },
  },
  leftLine: {
    backgroundColor: "#FF8E04",
    borderRadius: 4,
    width: 12,
    height: 32,
    marginRight: 12,

    [theme?.breakpoints?.down("xs")]: {
      width: 6,
      height: 20,
    },
  },
  textTitleJustify: {
    display: "flex",
    justifyContent: "space-between",
    alignItems:"center",
    fontSize: 30,
    fontWeight: 600,
    marginTop: 48,
    [theme?.breakpoints?.between("sm", "md")]: {
      marginTop: 40,
      fontSize: 28,
    },
    [theme?.breakpoints?.down("xs")]: {
      marginTop: 18,
      fontSize: 14,
    },
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
}));
