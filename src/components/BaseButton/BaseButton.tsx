import React, { useState, useImperativeHandle, forwardRef } from "react";
import { useStyles } from "./BaseButton.styles";
import { Button } from "@material-ui/core";
interface Props {
  disabled: boolean;
  disableRipple?: boolean
}
const Component = forwardRef((props: any, ref: any): JSX.Element => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const { disabled } = props;
  useImperativeHandle(ref, () => ({
    setButtonLoading(value: any) {
      setIsLoading(value);
    },
  }));
  return (
    <Button
      {...props}
      className={`${classes.button} ${props.className}`}
      disabled={disabled || isLoading}
      disableRipple
    >
      {props.children}
    </Button>
  );
});
const BaseButton = React.memo(Component);
BaseButton.displayName = 'BaseButton'
export { BaseButton };
