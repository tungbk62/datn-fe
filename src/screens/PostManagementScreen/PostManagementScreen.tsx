import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import { UserDetailModal } from "src/components/UserDetailModal";
import { ManagementWrapper } from "src/components/ManagementWrapper";
import { useStyles } from "./PostManagementScreen.styles";
import { Router, useRouter } from "next/router";

interface Column {
  id: "id" | "createdBy" | "title" | "type" | "mainImageUrl" | "" | "address" |"stt";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "stt", label: "STT", minWidth: 50, maxWidth: 50 },
  { id: "id", label: "ID", minWidth: 100 },
  { id: "mainImageUrl", label: "Ảnh mô tả", minWidth: 100 },
  { id: "createdBy", label: "Người tạo", minWidth: 100 },
  {
    id: "title",
    label: "Tiêu đề",
    minWidth: 100,
    maxWidth: 100,
  },
  {
    id: "address",
    label: "Địa chỉ",
    minWidth: 100,
    maxWidth: 100,
  },
  {
    id: "",
    label: "Thao tác",
    minWidth: 100,
    align: "right",
  },
];

interface Props {
  appState?: any;
  appReducer?: any;
  authReducer?: any;
  authState?: any;
}

const PostManagementScreenComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]) as any;
  const { appReducer } = props;
  const router = useRouter();
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
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

  useEffect(() => {
    getListPostAdmin();
    // setRows(appState?.listUserBusiness)
  }, [page]);

  const getListPostAdmin = async () => {
    const params = {
      page: page,
      size: rowsPerPage,
    };
    const tmp = await appReducer.getListPostAdmin(params);
    if (tmp) {
      setRows(tmp);
    }
  };

  const handleChangeData = (type: string, item: any, state: any) => {
    console.log("handleChangeData");
    const index = rows.findIndex((o : any) => o.id === item.id);
    console.log(index);

    if(index === "undefined"){
      return;
    }
    console.log(index);

    switch (type) {
      case "verified":
        {
          rows[index].verified = state;
          console.log("handleChangeData1");
        }
        break;
      case "locked":
        {
          rows[index].locked = state;
          console.log("handleChangeData2");
        }
        break;
      case "hide":
        {
          rows[index].hide = state;
          console.log("handleChangeData3");
        }
        break;
      default:
        break;
    }

    console.log("handleChangeDataEnd");
    let newRows = [...rows];
    setRows(newRows);
  }

  const handleModalOpen = async (type: string, item: any) => {
    switch (type) {
      case "verified":
        {
          const state = !item.verified;
          const data = await appReducer?.verifiedPostForAdmin({postId: item?.id, status: state});
          if(data){
            handleChangeData(type, item, state);
          }
          
        }
        return;
      case "locked":
        {
          const state = !item.locked;
          const data = await appReducer?.lockPostForAdmin({postId: item?.id, status: state});
          if(data){
            handleChangeData(type, item, state);
          }
        }
        return;
      case "hide":
        {
          const state = !item.hide;
          const data = await appReducer?.hidePostForAdmin({postId: item?.id, status: state});
          if(data){
            handleChangeData(type, item, state);
          }
        }
        return;

      default:
        break;
    }
  };

  const renderFuncionIcon = (item: any) => {
    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            handleModalOpen("verified", item);
          }}
          edge="start"
          title="Xác thực bài đăng"
          // className={}
        >
          {item?.verified ? (
            <CheckBoxOutlinedIcon />
          ) : (
            <CheckBoxOutlineBlankOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            handleModalOpen("locked", item);
          }}
          edge="start"
          title={item?.locked ? "Mở bài đăng" : "Khoá bài đăng"}
          // className={}
        >
          {item?.locked ? <LockIcon /> : <LockOpenIcon />}
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            handleModalOpen("hide", item);
          }}
          edge="start"
          title={item?.hide ? "Hiện bài đăng" : "Ẩn bài đăng"}
        >
          {item?.hide ? <VisibilityOffOutlinedIcon/> : <VisibilityIcon />}
        </IconButton>
      </div>
    );
  };

  const [openModal, setOpenModal] = useState(false) as any;
  const [dataModal, setDataModal] = useState() as any;
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <ManagementWrapper title={"Quản lý bài viết"}>
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
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" onClick={() => {router.push("/post/" + row.id)}}>{row.id}</TableCell >
                    <TableCell component="th" scope="row" onClick={() => {router.push("/post/" + row.id)}}>
                      <div className={classes.logoCpn}>
                        <img src={row.mainImageUrl} alt="" />
                      </div>
                    </TableCell>
                    <TableCell align="left">{row.createdBy}</TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">
                      {row?.province + ", " + row?.district + ", " + row?.wards}
                    </TableCell>
                    <TableCell align="right">
                      {renderFuncionIcon(row)}
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
        count={rows?.length * 10}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Bàn ghi mỗi trang"
      />
      <UserDetailModal
        visible={openModal}
        hideModal={() => {
          handleCloseModal();
        }}
        userData={dataModal}
      />
    </ManagementWrapper>
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

const PostManagementScreen = React.memo(
  connect(mapState, mapDispatch)(PostManagementScreenComponent),
);

export { PostManagementScreen };
