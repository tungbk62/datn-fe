import React, {useState} from "react";
import { useStyles } from "./AdminHomeScreen.styles";
import { AppWrapper } from "@components-client/DefaultWrapper";
import {ManagementWrapper} from "@components-client/ManagementWrapper"
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import TextField from '@material-ui/core/TextField';

const title = "Trang chủ"
interface Props {}
const AdminHomeScreenComponent = (props: Props): JSX.Element => {

  const classes = useStyles();
  
  return (
    <ManagementWrapper title={title}>
      <div >
        
      </div>
    </ManagementWrapper>
  );
};
const AdminHomeScreen = React.memo(AdminHomeScreenComponent);
export { AdminHomeScreen };
