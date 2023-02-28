import { Tooltip } from "@material-ui/core";
import React, { ReactElement, useState } from "react";
interface Props {
  children: ReactElement<any, any>;
  title: string;
}
const BaseTooltipComponent = (props: Props): JSX.Element => {
  const { children, title } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  const onOpenTooltip = () => setShowTooltip(true);
  const onCloseTooltip = () => setShowTooltip(false);

  return (
    <Tooltip
      open={showTooltip}
      onOpen={onOpenTooltip}
      onClose={onCloseTooltip}
      title={title}
      disableHoverListener={!!title ? false : true}
      placement="bottom-end"
    >
      {children}
    </Tooltip>
  );
};
const BaseTooltip = React.memo(BaseTooltipComponent);
export { BaseTooltip };
