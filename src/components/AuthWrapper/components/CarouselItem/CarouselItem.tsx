import React, { Fragment } from "react";
import { useStyles } from "./CarouselItem.styles";
interface Props {
  source?: any;
  city?:any,
  news?:any
}
const CarouselItemCpn = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { source,city,news } = props;
  return (
    <Fragment>
      <div className={classes.container}>
        <img src={source} alt="img" className={classes.img} />
        <span className={classes.textContainer}>
          <h3 className={classes.cityText}>{city}</h3>
          <h3 className={classes.cityText}>Bài viết: {news}</h3>
        </span>
      </div>
    </Fragment>
  );
};
const CarouselItem = React.memo(CarouselItemCpn);
export { CarouselItem };
