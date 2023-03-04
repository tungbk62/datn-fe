import React from "react";
import { useStyles } from "./CarouselItem.styles";

interface Props {
  source?: any;
  data?: any;
}
const CarouselItemCpn = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { source } = props;

  return (
    <div className={classes.container}>
      <img
        src={source ? source : "/assets/mkt-3.jpeg"}
        alt="img"
        className={classes.img}
      />
    </div>
  );
};

const CarouselItem = React.memo(CarouselItemCpn);

export { CarouselItem };
