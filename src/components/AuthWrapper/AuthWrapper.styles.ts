import { makeStyles, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    bg: {
      position: "absolute",
    },
    root: {
      display: "flex",
      backgroundImage: `url('/assets/auth-bg.png')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
    },
    containerGird: {
      padding: "0 5%",
      width: "100%",
      height: "100%",
      "& .ant-carousel": {
        height: "100%",
        margin: "auto",
        // display:'flex',
        // justifyContent:'center',
        // alignItems:"center",
      },
    },
    box: {
      height: "100%",
      width: "100%",
    },
    contentStyle: {
      height: "100%",
      color: "#fff",
      lineHeight: "160px",
      textAlign: "center",
      background: "#364d79",
    },
    carouselContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "25% 0",
      margin: "auto 0",
      height: "100%",
      "& .slick-slider": {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  }),
);
