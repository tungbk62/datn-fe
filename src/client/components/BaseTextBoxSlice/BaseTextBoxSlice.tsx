import React from "react";
import { BaseTooltip } from "../BaseTooltip";
import { useStyles } from "./BaseTextBoxSlice.styles";
interface Props {
  numberOfLines: number;
  additionalClassName?: string;
  text?: any;
  children?: any;
}
const BaseTextBoxSliceComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { numberOfLines, additionalClassName, text, children } = props;

  const styleNumberLines = {
    WebkitLineClamp: numberOfLines ?? 1,
  };

  return (
    <BaseTooltip title={text}>
      <div
        style={styleNumberLines}
        className={`${classes.textStyle} ${additionalClassName ?? ""}`}
        {...props}
      >
        {!!children ? children : text}
      </div>
    </BaseTooltip>
  );
};
const BaseTextBoxSlice = React.memo(BaseTextBoxSliceComponent);
export { BaseTextBoxSlice };
