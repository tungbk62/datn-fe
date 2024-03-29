import { makeStyles } from "@material-ui/styles";
import { systemColor } from "@helpers/color";
import { color } from "@src/constants";

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
  container: {
    marginTop: 20,
    width: 800,
    marginRight: "auto",
    marginLeft: "auto",
  },
  itemWrapper: {
    display: "flex",
    height: 180,
    // maxWidth: 120,
    width: 800,
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
    // marginLeft: "auto",
    // marginRight: "auto",
    maxWidth: "100%",
    height: 180,
    [theme?.breakpoints?.down("xs")]: {
      height: 89,
    },
  },
  imageBox:{
    textAlign: "center",
    width: 200,
    height: 180,
  },
  paddingBox: {
    float: "right",
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
    fontSize: 18,
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
    // width: "100%",
    paddingBottom: "20px",
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
  itemsFlex: {
    bottom: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  small: {
    width: theme.spacing(2),
    height: theme.spacing(3),
  },
  smallText: {
    fontSize: 18,
  },
  select: {
    position: "absolute",
    fontSize: 18,
    right: 0,
    width: 200
  },
  headerSearch: {
    position: "relative",
    display: "flex",
    alignItems: "center"
  },
  priceMonth: {
    fontSize: 18
  },
  pagingFooter:{
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
    fontSize: 18
  }
}));
