import React from "react";
import { useStyles } from "./UserDetailModal.styles";
import Fade from "@material-ui/core/Fade";
import { BaseModal } from "../BaseModal";
import Avatar from "@material-ui/core/Avatar";
import CancelIcon from "@material-ui/icons/Cancel";
import { Grid } from "@material-ui/core";

interface Props {
  visible?: boolean;
  title?: string;
  hideModal?: any;
  userData?: any;
}

const Component = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { visible, hideModal, userData } = props;
  return (
    <BaseModal
      visible={visible || false}
      handleClose={hideModal as any}
      // modalClass={classes.modal}
      // contentClass={classes.modalContent}
    >
      <div className={classes.container}>
        <Fade in={visible}>
          <div className={classes.bannerContainer}>
            <div className={classes.titleContainer}>
              <CancelIcon onClick={hideModal} />
            </div>
          </div>
        </Fade>

        <Grid className={classes.containerGird} container spacing={3}>
          <Grid className={classes.box} item xs={4}>
            <Avatar
              alt="Avatar"
              src={userData?.imageUrl}
              className={classes.small}
            />
          </Grid>
          <Grid className={classes.box} item xs={8}>
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
                {userData?.province +
                  // ", " +
                  // userData?.district +
                  ", " +
                  userData?.wards}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </BaseModal>
  );
};
const UserDetailModal = React.memo(Component);
export { UserDetailModal };
