import React, { useCallback, useEffect, useState } from "react";
import { useStyles } from "./UserManagementScreen.styles";
import { ManagementWrapper } from "src/components/ManagementWrapper";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { TablePaginationActions } from "src/components/TablePaginationActions";
import TableHead from "@material-ui/core/TableHead";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import { UserDetailModal } from "src/components/UserDetailModal";
import { Input } from "@material-ui/core";
import { debounce } from "lodash";
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

interface Column {
  id: "id" | "name" | "email" | "type" | "imageUrl" | "" | "stt" | "type";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "stt", label: "STT", minWidth: 50, maxWidth: 50 },
  { id: "id", label: "ID", minWidth: 50, maxWidth: 50 },
  { id: "imageUrl", label: "Avatar", minWidth: 50 },
  { id: "name", label: "Họ Tên", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    // align: 'right',
  },
  {
    id: "type",
    label: "Loại tài khoản",
    minWidth: 100,
    // align: 'right',
  },
  {
    id: "",
    label: "Thao tác",
    minWidth: 100,
    align: "right",
  },
  // {
  //   id: 'size',
  //   label: 'Size\u00a0(km\u00b2)',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value: number) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'density',
  //   label: 'Density',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value: number) => value.toFixed(2),
  // },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

interface Props {
  appState?: any;
  appReducer?: any;
  authReducer?: any;
  authState?: any;
}
const UserManagementScreenComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]) as any;
  const { appState, appReducer, authReducer, authState } = props;
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

  const getListUser = useCallback(
    async (query?: string) => {
      const params = {
        page: page,
        size: rowsPerPage,
        query,
      };
      const tmp = await appReducer.getListUser(params);
      if (tmp) {
        setRows(tmp);
      }
    },
    [appReducer, page, rowsPerPage],
  );

  useEffect(() => {
    getListUser();
  }, [getListUser]);

  const handleChangeData = (item: any, state: any) => {

    const index = rows.findIndex((o : any) => o.id === item.id);
    console.log(index);

    if(index === "undefined"){
      return;
    }

    rows[index].locked = state;

    let newRows = [...rows];
    setRows(newRows);
  }

  const handleLocked = async (item: any) => {
          const state = !item.locked;
          const data = await appReducer?.lockNormalUser({userId: item?.id, status: state});
          if(data){
            handleChangeData(item, state);
          }
  }

  const openUserDetail = async(item: any) => {
    const data = await appReducer?.getDetailUser(item?.id);
      if(data){
        setOpenModal(true);
        setDataModal(data);
      }
  }

  const renderFunctionIcon = (item: any) => {
    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          title="Khoá tài khoản"
          onClick={() => {
            handleLocked(item);
          }}
          edge="start"
        >
          {item?.locked ? <LockIcon /> : <LockOpenIcon />}
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          title="Xem chi tiết thông tin tài khoản"
          onClick={() => {
            openUserDetail(item);
          }}
          edge="start"
        >
          <ViewHeadlineIcon />
        </IconButton>
      </div>
    );
  };

  const [openModal, setOpenModal] = useState(false) as any;
  const [dataModal, setDataModal] = useState() as any;
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const onPressOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <ManagementWrapper title={"Quản lý người dùng"}>
      <Input
        placeholder="Nhập thông tin người dùng cần tìm kiếm"
        style={{ width: 350 }}
        onChange={debounce(e => {
          getListUser(e.target.value);
        }, 500)}
      />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                console.log(row);
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Avatar
                        alt="Avatar"
                        src={row.imageUrl}
                        className={classes.small}
                      />
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.type === "BUSINESS" ? "Kinh doanh" : "Khách hàng"}</TableCell>
                    <TableCell align="right">
                      {renderFunctionIcon(row)}
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

const UserManagementScreen = React.memo(
  connect(mapState, mapDispatch)(UserManagementScreenComponent),
);

export { UserManagementScreen };
