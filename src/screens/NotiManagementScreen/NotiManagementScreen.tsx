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
import DeleteIcon from '@mui/icons-material/Delete';

import { UserDetailModal } from "src/components/UserDetailModal";
import { ManagementWrapper } from "src/components/ManagementWrapper";
import { useStyles } from "./NotiManagementScreen.styles";
import { apiHelper } from "@src/helpers";
import { api } from "@src/constants";
import { Button } from "@material-ui/core";
import SendNotiForm from "./NotiForm";
import { Modal } from "antd";
import axios from "axios";

interface Column {
  id: "id" | "type" | "message" | "action" | "date" | "stt" | "user";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "stt", label: "STT", maxWidth: 50 },
  { id: "type", label: "Loại thông báo", minWidth: 100 },
  { id: "user", label: "Người nhận", minWidth: 100 },
  { id: "message", label: "Nội dung", minWidth: 200, maxWidth: 400 },
  { id: "date", label: "Ngày tạo", maxWidth: 80 },
  { id: "action", label: "Thao tác", minWidth: 100, align: "right" },
];

type FormType = "send-noti" | "user-detail";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  type: string;
}

interface NotificationDetail {
  id: number;
  user: User;
  typeNotification: string;
  message: string;
  viewed: boolean;
  createdDate: string;
}

interface Props {
  appState?: any;
  appReducer?: any;
  authReducer?: any;
  authState?: any;
}

const NotiManagementScreenComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [notifications, setNotifications] = useState<NotificationDetail[]>([]);
  const { appReducer } = props;
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, notifications.length - page * rowsPerPage);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };
  const [sendNotiFormOpend, setSendNotiFormOpened] = useState(false);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFormAction = (formType: FormType, open = true) => {
    return () => {
      switch (formType) {
        case "send-noti": {
          setSendNotiFormOpened(open);
          return;
        }
      }
    };
  };

  useEffect(() => {
    const getListUser = async () => {
      const params = {
        page: page,
        size: rowsPerPage,
      };
      try {
        const res = await apiHelper.get(api.adminNotifications, params);
        console.log("noti", res);
        setNotifications(res);
      } catch {
        setNotifications([]);
      }
    };
    getListUser();
  }, [appReducer, page, rowsPerPage]);

  const handleDelete = async (item : any) =>{
    const response = await axios.delete<any>(api.deleteNotification, {data: [item.id]});
    if(response.status != 200){
      return;
    }

    const newNotifications = notifications.filter((o) => o.id != item.id);
    setNotifications(newNotifications);
  }

  const renderActionIcon = (item : any) => {
    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            handleDelete(item);
          }}
          edge="start"
          // className={}
        >
          <DeleteIcon/>
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
    <ManagementWrapper title={"Quản lý thông báo"}>
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
            {notifications
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th">{index  + 1}</TableCell>
                    <TableCell align="left">{row.typeNotification}</TableCell>
                    <TableCell align="left">{row.user.firstName + " " + row.user.lastName}</TableCell>
                    <TableCell align="left">{row.message}</TableCell>
                    <TableCell align="left">{row.createdDate}</TableCell>
                    <TableCell align="right">{renderActionIcon(row)}</TableCell>
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
        count={notifications?.length * 10}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Bàn ghi mỗi trang"
      />
      <Button
        variant="contained"
        style={{ background: "red", color: "white" }}
        onClick={handleFormAction("send-noti", true)}
      >
        gửi thông báo
      </Button>
      <UserDetailModal
        visible={openModal}
        hideModal={() => {
          handleCloseModal();
        }}
        userData={dataModal}
      />
      <Modal
        visible={sendNotiFormOpend}
        className={classes.center}
        onCancel={handleFormAction("send-noti", false)}
        okText="Gửi"
      >
        <SendNotiForm />
      </Modal>
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

const NotiManagementScreen = React.memo(
  connect(mapState, mapDispatch)(NotiManagementScreenComponent),
);

export { NotiManagementScreen };
