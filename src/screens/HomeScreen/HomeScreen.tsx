import React, { useEffect, useState } from "react";
import { useStyles } from "./HomeScreen.styles";
import { AppWrapper } from "src/components/DefaultWrapper";
import { ManagementWrapper } from "src/components/ManagementWrapper";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import { PostEditModal } from "src/components/PostEditModal";
import app from "next/app";
import { connect } from "react-redux";
import { NewPost, SuggestHousing } from "./components";

interface Props {
  appState?: any;
  appReducer?: any;
  authReducer?: any;
  authState?: any;
}
const HomeScreenComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { appState, appReducer, authReducer, authState } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [publishPostData, setPublishPostData] = useState([]) as any;
  useEffect(() => {
    getPublishPost();
  }, []);
  const getPublishPost = async () => {
    const params = {
      page: page,
      size: rowsPerPage,
    };
    const dataRes = await appReducer?.getListPublishPost(params);
    // if(data?.length<)
    setPublishPostData(dataRes);
  };

  return (
    <AppWrapper>
      <NewPost data={publishPostData} />
      <SuggestHousing data={publishPostData} />
    </AppWrapper>
  );
};

const mapState = (rootState: any) => ({
  appState: rootState.appModel,
  authState: rootState.authModel,
});

const mapDispatch = (rootReducer: any) => ({
  appReducer: rootReducer.appModel,
  authReducer: rootReducer.authModel,
});

const HomeScreen = React.memo(
  connect(mapState, mapDispatch)(HomeScreenComponent),
);
export { HomeScreen };
