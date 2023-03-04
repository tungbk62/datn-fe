import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles((theme: any) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Barlow',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 15,
    outline: "unset"
  },
  bgColorDark: {
    backgroundColor: "rgba(0,0,0,0.65)"
  }
}));