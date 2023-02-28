import { makeStyles } from "@material-ui/styles";
import { systemColor } from "@helpers-client/color";
import { color } from "@app-client/constants";

export const useStyles = makeStyles((theme: any) => ({
  categoryContainer: {},
  swiperCategory: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: 24,
    [theme?.breakpoints?.down("xs")]: {
      marginTop: 12,
    },
  },
  itemWrapper: {
    height: "100%",
    // maxWidth: 120,
    width: "90%",
    borderRadius: 12,
    overflow: "hidden",
    cursor: "pointer",
    marginRight: 25,
    boxShadow: "rgb(226 238 249) 0px 2px 10px 0px",
    [theme?.breakpoints?.down("xs")]: {
      marginRight: 12,
      width: 164,
    },
  },
  imageCategory: {
    width: "100%",
    height: 182,
    objectFit: "cover",
    [theme?.breakpoints?.down("xs")]: {
      height: 89,
    },
  },
  paddingBox: {
    padding: 15,
    [theme?.breakpoints?.down("xs")]: {
      padding: 12,
    },
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
    "&:hover": {
      color: systemColor.black300,
      fontWeight: 600,
    },
  },
  descriptionName: {
    maxWidth: "100%",
    fontSize: 15,
    lineHeight: "23px",
    color: systemColor.ink400,
    marginTop: 12,
    [theme?.breakpoints?.down("xs")]: {
      marginTop: 6,
      fontSize: 13,
      lineHeight: "18px",
    },
  },
  listItemContainer: {
    paddingBottom: 5,
    overflowX: "scroll",
    width: "100%",
    "&::-webkit-scrollbar": {
      width: 0,
      height: 0,
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#CCCCCC",
      borderRadius: 4,
    },

    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    display: "flex",
    scrollBehavior: "smooth",
  },
  itemWrapperLast: {},
  itemWrapperFirst: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  fitContent: {
    width: "fit-content !important",
    height: "auto",
  },
  nameSkeleton: {
    width: "100%",
    height: 17,
    marginTop: 10,
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
    padding: "0% 0",
    margin: "auto 0",
    height: "100%",
    "& .slick-slider": {
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  root: {
    position: "relative",
    maxHeight: 200,
    overflow: "auto",
  },
  list: {
    padding: 0,
  },
  listItem: {
    cursor: "pointer",
  },
  selectedItem: {
    backgroundColor: theme.palette.action.selected,
  },
  itemsFlex:{
    display:"flex",
    justifyContent:'space-between',
    alignItems:'center'
  },
  small: {
    width: theme.spacing(2),
    height: theme.spacing(3),
  },
  smallText:{
    fontSize: 12,
  }
}));
