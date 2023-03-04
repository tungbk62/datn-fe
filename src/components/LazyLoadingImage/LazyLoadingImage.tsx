import React, { Fragment } from "react";
import { useStyles } from "./LazyLoadingImage.styles";

// import LazyLoad from "react-lazyload";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
interface Props {
  children: any;
  height: any;
  className?: any;
  customOffset?: any;
  scrollContainer?: string;
}
const Component = (props: Props): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const matchesBreakpoint = useMediaQuery(theme.breakpoints.down("md"));

  return (
    // <LazyLoad
    //   {...props}
    //   height={props?.height}
    //   offset={props?.customOffset ?? (matchesBreakpoint ? 600 : 300)}
    //   className={props?.className ?? classes.lazyBox}
    //   scrollContainer={props?.scrollContainer}
    // >
    <Fragment className={props?.className ?? classes.lazyBox}>
      {props?.children}
    </Fragment>
      
    // </LazyLoad>
  );
};

const LazyLoadingImage = React.memo(Component);
export { LazyLoadingImage };
