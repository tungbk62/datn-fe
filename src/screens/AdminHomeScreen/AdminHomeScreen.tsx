import React from "react";
import { ManagementWrapper } from "src/components/ManagementWrapper";

const title = "Trang chủ";

interface Props {}

const AdminHomeScreenComponent = (props: Props): JSX.Element => {
  return (
    <ManagementWrapper title={title}>
      <div></div>
    </ManagementWrapper>
  );
};
const AdminHomeScreen = React.memo(AdminHomeScreenComponent);

export { AdminHomeScreen };
