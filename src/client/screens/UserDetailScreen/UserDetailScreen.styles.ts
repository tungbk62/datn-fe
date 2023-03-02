import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { systemColor } from "@helpers-client/color";
export const useStyles = makeStyles((theme:Theme)=>createStyles({
  textTime:{
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 400,
    color: "#999",
    marginBottom: "8px"
  },
  small: {
    width: theme.spacing(2),
    height: theme.spacing(3),
  },
  itemsFlexCenter:{
    display:"flex",
    justifyContent:'flex-start',
    alignItems:'center'
  },
  swiperCategory: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: 24,
    [theme?.breakpoints?.down("xs")]: {
      marginTop: 12,
    },
  },
  box: {
    height: "100%",
    width:"100%"
  },
  carouselContainer:{
    display:'flex',
    justifyContent:'center',
    alignItems:"center",
    padding:"0% 0",
    margin:"auto 0",
    height:"100%",
    "& .slick-slider":{
      height:"100%",
      display:'flex',
      justifyContent:'center',
      alignItems:"center",
    }
  },containerText:{
    padding:"0px 0px 12px 0px",
    borderBottom: `0.5px solid ${systemColor.black300}`,
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    maxWidth:"80%"
  },
  descriptionName: {
    maxWidth: "100%",
    fontSize: 15,
    lineHeight: "23px",
    // color: systemColor.ink400,
    marginTop: 12,
    [theme?.breakpoints?.down("xs")]: {
      marginTop: 6,
      fontSize: 13,
      lineHeight: "18px",
    },
    
  },
  textStyle:{
    fontSize:"15px",
    fontWeight:500,
    color:"#080930"
  },
  textBox:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    width:"100%"
  },
  large:{
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  paper:{
    margin: 24,
    padding:"24px 0"
  },
  categoryName: {
    maxWidth: "100%",
    fontSize: 16,
    lineHeight: "28px",
    fontWeight: 500,
    color: systemColor.ink500,
    [theme?.breakpoints?.down("xs")]: {
      fontSize: 13,
      lineHeight: "19px",
    },
    padding:"0px 0px 12px 0px",
    borderBottom: `0.5px solid ${systemColor.black300}`,
    "&:hover": {
      color: systemColor.black300,
      fontWeight: 600,
    },
  },
  container: {
      maxHeight: 440,
    },
    logoCpn:{
      display: "flex",
      width: "200px",
      aspectRatio: "1.74",
      
      justifyContent: "flex-start",
      // backgroundColor: "#fff",
      // height: "32px",
      // margin: "16px",
      cursor: "pointer",
      "& >img": {
        width: "fit-content",
        height: "100%",
        objectFit: "cover",
      },
    }
}));