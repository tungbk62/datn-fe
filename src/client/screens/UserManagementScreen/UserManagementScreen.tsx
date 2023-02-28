import React, { useEffect, useState } from "react";
import { useStyles } from "./UserManagementScreen.styles";
import { ManagementWrapper } from "@components-client/ManagementWrapper";

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
import { TablePaginationActions } from "@components-client/TablePaginationActions";
import TableHead from "@material-ui/core/TableHead";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import { UserDetailModal } from "@components-client/UserDetailModal";

interface Column {
  id: "id" | "name" | "email" | "type" | "imageUrl" | "";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "imageUrl", label: "Người dùng", minWidth: 100 },
  { id: "id", label: "Id", minWidth: 100 },
  { id: "name", label: "Tên", minWidth: 100 },
  {
    id: "email",
    label: "email",
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

  useEffect(() => {
    getListUser();
    // setRows(appState?.listUserBusiness)
  }, [page]);

  const getListUser = async () => {
    const params = {
      page: page,
      size: rowsPerPage,
    };
    const tmp = await appReducer.getListUser(params);
    if (tmp) {
      setRows(tmp);
    }
  };

  const handleModalOpen = async (type?: string, item?: any) => {
    switch (type) {
      case "view":
        {
          onPressOpenModal();
          const data = await appReducer?.getDetailUser(item?.id);
          setDataModal(data);
        }
        return;
      case "review":
        {
          const params = {
            user: item?.id,
            display: item?.displayReview ? 0 : 1,
          };
          await appReducer?.displayReviewNormalUser(params);
        }
        return;
      case "lock":
        {
          const params = {
            user: item?.id,
            locked: item?.locked ? 1 : 0,
          };
          await appReducer?.lockNormalUser(params);
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
            handleModalOpen("review", item);
          }}
          edge="start"
          // className={}
        >
          {item?.displayReview ? (
            <CheckBoxOutlinedIcon />
          ) : (
            <CheckBoxOutlineBlankOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            handleModalOpen("lock", item);
          }}
          edge="start"
          // className={}
        >
          {item?.locked ? <LockIcon /> : <LockOpenIcon />}
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            handleModalOpen("view", item);
          }}
          edge="start"
          // className={}
        >
          <VisibilityIcon />
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
      {/* <div
        style={{
          height: 160,
          width: "100%",
          backgroundColor: "#E5E5E5",
        }}
      ></div> */}
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
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <Avatar
                        alt="Avatar"
                        src={row.imageUrl}
                        className={classes.small}
                      />
                    </TableCell>
                    <TableCell component="th">{row.id}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
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
const UserManagementScreen = React.memo(
  connect(mapState, mapDispatch)(UserManagementScreenComponent),
);
export { UserManagementScreen };
