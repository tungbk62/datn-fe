import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
const drawerWidth = 240;
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    logoCpn: {
      display: "flex",
      width: "150px",
      aspectRatio: "1.74",
      padding: "8px 8px 8px 0px",
      justifyContent: "flex-start",
      backgroundColor: "#fff",
      // height: "32px",
      // margin: "16px",
      cursor: "pointer",
      "& >img": {
        width: "fit-content",
        height: "100%",
        objectFit: "cover",
      },
    },
    sectionDesktop: {
      // display: 'none',
      display: "flex",
      // [theme.breakpoints.up('md')]: {
      //   display: 'flex',
      // },
    },
    toolBarFlexBox: {
      display: "flex",
      flexDirection: "row",
      height:'100%',
      width:"100%",
      alignItems:'center',
      justifyContent:'space-between'
    },
  }),
);
