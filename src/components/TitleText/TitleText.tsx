import React from "react";
import { useStyles } from "./TitleText.styles";
// interface Props {}
const Cpn = (props: any): JSX.Element => {
  const classes = useStyles();
  const { title, rightComponent, customStyle } = props;
  return (
    <div
      className={
        !!rightComponent
          ? classes.textTitleJustify
          : `${classes.textTitle} ${customStyle || ""}`
      }
    >
      <div className={classes.flex}>
        <div className={classes.leftLine}></div>
        <h5 style={{ margin: 0 }}>{title}</h5>
      </div>
      {!!rightComponent ? rightComponent() : <></>}
    </div>
  );
};

const TitleText = React.memo(Cpn);

export { TitleText };
