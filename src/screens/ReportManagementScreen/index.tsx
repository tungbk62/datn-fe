import React, { useCallback, useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { UserDetailModal } from "src/components/UserDetailModal";
import { ManagementWrapper } from "src/components/ManagementWrapper";
import { useStyles } from "./styles";
import { apiHelper } from "@src/helpers";
import { api } from "@src/constants";
import { connect } from "react-redux";
import { Dispatch, RootState } from "@src/store";
import { Report } from "@src/store/models/auth/interface";
import { Input } from "@material-ui/core";
import { debounce } from "lodash";

interface Column {
  id: "phoneNumber" | "email" | "message" | "type" | "create-at" | "";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "phoneNumber", label: "Số điện thoại", maxWidth: 80 },
  { id: "email", label: "Email" },
  { id: "message", label: "Lời nhắn" },
  { id: "type", label: "Loại báo cáo", maxWidth: 30 },
  { id: "create-at", label: "Ngày tạo", maxWidth: 30 },
  { id: "", label: "Thao tác", maxWidth: 50, align: "right" },
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

const ReportManagementScreenComponent = (_: Props): JSX.Element => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [reports, setReports] = useState<Report[]>([]);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, reports.length - page * rowsPerPage);
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

  const getReports = useCallback(
    async (postId?: number | string) => {
      const params = {
        page: page,
        size: rowsPerPage,
        postId,
      };
      try {
        const res = await apiHelper.get<Report[]>(api.listReport, params);
        console.log("reports", res);
        setReports(res);
      } catch {
        setReports([]);
      }
    },
    [page, rowsPerPage],
  );

  useEffect(() => {
    getReports();
  }, [getReports, page, rowsPerPage]);

  const renderFunctionIcon = () => {
    return (
      <div>
        <IconButton color="inherit" aria-label="open drawer" edge="start">
          <DeleteForeverIcon />
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
    <ManagementWrapper title={"Báo cáo bài đăng"}>
      <Input
        placeholder="Nhập ID bài viết cần duyệt báo cáo"
        style={{ width: 350 }}
        onChange={debounce(e => {
          getReports(e.target.value);
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
            {reports
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(report => {
                return (
                  <TableRow key={report.id}>
                    <TableCell component="th">{report.phoneReport}</TableCell>
                    <TableCell align="left">{report.emailReport}</TableCell>
                    <TableCell align="left">{report.description}</TableCell>
                    <TableCell align="left">{report.typeReportName}</TableCell>
                    <TableCell align="left">{report.createdDate}</TableCell>
                    <TableCell align="right">{renderFunctionIcon()}</TableCell>
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
        count={reports?.length * 10}
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

const ReportManagementScreen = React.memo(
  connect(mapState, mapDispatch)(ReportManagementScreenComponent),
);

export default ReportManagementScreen;
