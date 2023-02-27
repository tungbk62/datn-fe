import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles((theme: any) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Barlow',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 15,
    outline: "unset"
  },
  bgColorDark: {
    backgroundColor: "rgba(0,0,0,0.65)"
  },
  container:{
    width:"500px",
    height:"160px",
    
  },
  bannerContainer:{
    display: 'flex',
    flexDirection:"row",
    justifyContent: 'flex-end',
    alignItems:"center"
  },
  titleContainer: {
    // position: "fixed",
    // marginTop: "12px",
    // marginRight:"12px",
    display: "flex",
  },
  small: {
    width: 70,
    height: 70,
  },
  containerGird: {
    padding: "0 5%",
    width:"100%",
    // height:"100%",
    "& .ant-carousel":{
      height:"100%",
      margin:"auto"
      // display:'flex',
      // justifyContent:'center',
      // alignItems:"center",
    }
  },
  box: {
    height: "100%",
    // width:"100%"
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
  }
  
}));