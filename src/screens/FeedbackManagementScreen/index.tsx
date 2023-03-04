import React, { useEffect, useState } from "react";
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

import { UserDetailModal } from "src/components/UserDetailModal";
import { ManagementWrapper } from "src/components/ManagementWrapper";
import { useStyles } from "./styles";
import { apiHelper } from "@src/helpers";
import { api } from "@src/constants";
import { connect } from "react-redux";
import { Dispatch, RootState } from "@src/store";
import { Feedback } from "@src/store/models/auth/interface";

interface Column {
  id: "createdBy" | "content" | "rating" | "";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "createdBy", label: "Người viết", maxWidth: 80 },
  {
    id: "content",
    label: "Noi dung",
  },
  {
    id: "rating",
    label: "Diem so",
    // minWidth: 0,
    maxWidth: 30,
  },
  {
    id: "",
    label: "Thao tác",
    maxWidth: 50,
    align: "right",
  },
];

const mapState = (rootState: RootState) => ({
  appState: rootState.appModel,
  authState: rootState.authModel,
});

const mapDispatch = (rootReducer: Dispatch) => ({
  appReducer: rootReducer.appModel,
  authReducer: rootReducer.authModel,
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = StateProps & DispatchProps;

const FeedbackManagementScreenComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<Feedback[]>([]);
  const { appReducer } = props;
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
    const getFeedbacks = async () => {
      const params = {
        page: page,
        size: rowsPerPage,
      };
      try {
        const feedbacks = await apiHelper.get(api.listFeedback(6), params);
        console.log(feedbacks);
        if (feedbacks) {
          setRows(feedbacks);
        }
      } catch {
        setRows([]);
      }
    };
    getFeedbacks();
  }, [page, rowsPerPage]);

  const handleModalOpen = async (type?: string) => {
    switch (type) {
      case "view":
        return;
      case "review":
        return;
      case "lock":
        return;
      default:
        break;
    }
  };

  const renderFunctionIcon = (item: any) => {
    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            handleModalOpen("review", item);
          }}
          edge="start"
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

  return (
    <ManagementWrapper title={"Quản lý người dùng"}>
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
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th">
                      {row.createdBy.firstName}
                    </TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.ratingPoint}</TableCell>
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

const UserManagementScreen = React.memo(
  connect(mapState, mapDispatch)(FeedbackManagementScreenComponent),
);

export default UserManagementScreen;
