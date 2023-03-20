import React, { useEffect, useState } from "react";
import { useStyles } from "./UserDetailScreen.styles";
import { AppWrapper } from "src/components/DefaultWrapper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import TableHead from "@material-ui/core/TableHead";
// import dynamic from "next/dynamic";
// const ReactHtmlParser = dynamic(() => import("react-html-parser"), { ssr: false });
import { Grid, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import { useRouter } from "next/router";
import { TitleText } from "src/components/TitleText";
import { api } from "@src/constants";
import { apiHelper } from "@src/helpers";
import { PostEditModal } from "@src/components/PostEditModal";

interface Column {
  id: "id" | "createdBy" | "title" | "type" | "mainImageUrl" | "" | "address";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "left" | "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "mainImageUrl", label: "Ảnh mô tả", minWidth: 80 },
  {
    id: "title",
    label: "Tiêu đề",
    minWidth: 60,
    maxWidth: 80,
  },
  {
    id: "address",
    label: "địa chỉ",
    minWidth: 100,
    maxWidth: 100,
  },
  {
    id: "",
    label: "Thao tác",
    minWidth: 100,
    align: "left",
  },
];

interface Props {
  appState?: any;
  appReducer?: any;
  authReducer?: any;
  authState?: any;
  router: any;
}
const UserDetailScreenComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { appReducer, authReducer } = props;
  const router = useRouter();
  const [userData, setUserData] = useState() as any;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [publishPostData, setPublishPostData] = useState([]) as any;
  const [postFormOpened, setPostFormOpened] = useState(false);
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, publishPostData.length - page * rowsPerPage);
  const [postData, setPostData] = useState() as any;  

  useEffect(() => {
    const getMyPost = async () => {
      const params = {
        page: page,
        size: rowsPerPage,
      };
      const tmp = await appReducer?.getMyPost(params);
      if (tmp) {
        setPublishPostData(tmp);
      }
    };
    const getUserData = async () => {
      const dataRes = await authReducer?.getUserDetail();
      console.log(dataRes);
      setUserData(dataRes);
    };
    getUserData();
    getMyPost();
  }, [appReducer, authReducer, page, props.router.id, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeItemData = (id : number, hide : boolean) =>{
    console.log(publishPostData);
    const index = publishPostData.findIndex((o : any) => o.id === id);
    console.log("index", index);
    publishPostData[index].hide = hide;
    let newPublishPostData = [...publishPostData];
    setPublishPostData(newPublishPostData);
  }

  const handleModalOpen = async (
    type: "edit-post" | "hide",
    item = null,
  ) => {
    console.log(item);
    switch (type) {
      case "edit-post":
        {
          const res = await apiHelper.get(api.businessPostDetail + item?.id);
          if(res){
            setPostData(res);
            setPostFormOpened(true);
            console.log(postData);
          }
        }
        return;
      // case "lock":
      //   {
      //     // const params = {
      //     //   user: item?.id,
      //     //   display: item?.displayReview ? 0 : 1,
      //     // };
      //     // await appReducer?.displayReviewNormalUser(params);
      //   }
      //   return;
      case "hide":
        {
          const params = {
            id: item?.id,
            state: item?.hide ? false : true,
          };
          const res = await appReducer?.hidePost(params);
          if(res){
            handleChangeItemData(params.id, params.state);
          }
        }
        return;

      default:
        break;
    }
  };

  const renderFunctionIcons = (item: any) => {
    return (
      <div className={classes.functionIcons}>
        <IconButton
          color="inherit"
          onClick={() => {
            handleModalOpen("edit-post", item);
          }}
        >
          <EditIcon />
        </IconButton>
        {/* <IconButton
          color="inherit"
          onClick={() => {
            handleModalOpen("lock", item);
          }}
        >
          {item?.locked ? <LockIcon /> : <LockOpenIcon />}
        </IconButton> */}
        <IconButton
          color="inherit"
          onClick={() => {
            handleModalOpen("hide", item);
          }}
        >
          {item?.hide ? <VisibilityOffOutlinedIcon/> : <VisibilityIcon />}
        </IconButton>
      </div>
    );
  };

  return (
    <AppWrapper>
      <div className={classes.swiperCategory}>
        <Grid
          style={{
            paddingTop: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
          container
          spacing={2}
        >
          <Grid item xs={3}>
            <div style={{ marginTop: "48px" }}></div>
            <Paper elevation={3}>
              <div className={classes.paper}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    alt="Avatar"
                    src={userData?.imageUrl}
                    className={classes.large}
                  />
                </div>
                <div className={classes.textBox}>
                  <div className={classes.textStyle}>Họ tên:</div>
                  <div className={classes.textStyle}>
                    {userData?.firstName + " " + userData?.lastName}
                  </div>
                </div>
                <div className={classes.textBox}>
                  <div className={classes.textStyle}>Email:</div>
                  <div className={classes.textStyle}>{userData?.email}</div>
                </div>
                <div className={classes.textBox}>
                  <div className={classes.textStyle}>Id:</div>
                  <div className={classes.textStyle}>{userData?.id}</div>
                </div>
                <div className={classes.textBox}>
                  <div className={classes.textStyle}>SDT:</div>
                  <div className={classes.textStyle}>{userData?.phone}</div>
                </div>
                <div className={classes.textBox}>
                  <div className={classes.textStyle}>Địa chỉ:</div>
                  <div className={classes.textStyle}>
                    {`${userData?.province}`}
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid className={classes.box} item xs={9}>
            <TitleText title={"Bài viết của tôi"} />
            <div style={{ paddingTop: "15px" }}></div>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          maxWidth: column.maxWidth,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {publishPostData
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                    .map((row: any, index: number) => {
                      return (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            <div className={classes.logoCpn}>
                              <img src={row.mainImageUrl} alt="" />
                            </div>
                          </TableCell>
                          <TableCell align="left">{row.title}</TableCell>
                          <TableCell align="left">
                            {`${row?.province}, ${row?.district}, ${row?.wards}`}
                          </TableCell>
                          <TableCell align="right">
                            {renderFunctionIcons(row)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={publishPostData?.length * 10}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Bàn ghi mỗi trang"
            />
          </Grid>
        </Grid>
      </div>
      <PostEditModal
        visible={postFormOpened}
        hideModal={() => {setPostFormOpened(false)}}
        data={postData}
      />
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

const UserDetailScreen = React.memo(
  connect(mapState, mapDispatch)(UserDetailScreenComponent),
);
export { UserDetailScreen };
