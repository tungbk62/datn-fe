import React, {useState} from "react";
import { useStyles } from "./HomeScreen.styles";
import { AppWrapper } from "@components-client/DefaultWrapper";
import {ManagementWrapper} from "@components-client/ManagementWrapper"
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import TextField from '@material-ui/core/TextField';

const title = "Trang chủ"
interface Props {}
const HomeScreenComponent = (props: Props): JSX.Element => {

  const classes = useStyles();
  
  return (
    <AppWrapper>
      <div >
        
      </div>
    </AppWrapper>
  );
};
const HomeScreen = React.memo(HomeScreenComponent);
export { HomeScreen };
