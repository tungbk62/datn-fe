import React from "react";
import { useStyles } from "./BaseModal.styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
interface Props {
  visible: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  modalClass?: string;
  contentClass?: string;
  fullViewBg?: boolean;
}
const Component = (props: Props): JSX.Element => {
  const classes = useStyles();
  const {
    visible,
    handleClose,
    children,
    modalClass,
    contentClass,
    fullViewBg,
  } = props;
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={`${classes.modal} ${modalClass}`}
      open={visible}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        classes: {
          root: fullViewBg ? classes.bgColorDark : "",
        },
      }}
    >
      <Fade in={visible}>
        <div className={`${classes.paper} ${contentClass}`}>{children}</div>
      </Fade>
    </Modal>
  );
};
const BaseModal = React.memo(Component);
export { BaseModal };
