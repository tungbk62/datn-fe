import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
      width: 500,
      // height: 400,
      backgroundColor: "white",
      padding: 25,
      borderRadius: 10,
    },
    pricingWrap: {
      width: 350,
      display: "flex",
      flexDirection: "row",
    },
    select: {
      // zIndex:2000, 
      width: 300, 
      borderRadius: 10,
      color: "black",
      fontSize: 18
    },
    loginButton: {
      float: "right",
      width: "100px",
      // marginLeft:"24px",
      background: "#ff7961",
      fontSize: 14,
      color: "#000000",
      borderRadius: 30,
      fontWeight: 400,
      padding: "12px 0",
      "&:hover": {
        // background: color.primaryColorHover,
      },
    },
    labelRangeName: {
      fontSize: 20,
      marginBottom: 3400
    },
    labelRange: {
      flexDirection: "row"
    },
    labelRangeValue: {
      fontSize: 18,
      border: 10,
      borderColor: "black",
    }
    
  }),
);