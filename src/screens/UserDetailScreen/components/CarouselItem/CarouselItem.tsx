import React, { Fragment } from "react";
import { useStyles } from "./CarouselItem.styles";

interface Props {
  source?: any;
  data?: any;
}
const CarouselItemCpn = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { source, data } = props;
  
  return (
    <Fragment>
      <div className={classes.container}>
        <img
          src={source ? source : "/assets/mkt-3.jpeg"}
          alt="img"
          className={classes.img}
        />
        <span className={classes.textContainer}>
          {/* <h3 className={classes.cityText}>{data?.city}</h3>
          <h3 className={classes.cityText}>Bài viết: {data?.news}</h3> */}
          
        </span>
      </div>
    </Fragment>
  );
};
const CarouselItem = React.memo(CarouselItemCpn);
export { CarouselItem };
