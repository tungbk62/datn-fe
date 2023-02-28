import React, { useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useStyles } from "./ManagementWrapper.styles";
import { connect } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ContactsIcon from "@material-ui/icons/Contacts";
import ReportIcon from "@material-ui/icons/Report";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import { useRouter } from "next/router";
interface Props {
  children?: any;
  appState?: any;
  appReducer?: any;
  title?: any;
  authReducer?: any;
  authState?: any;
}

const ManagementWrapperComponent = (props: Props) => {
  const { children, appState, appReducer, title, authReducer, authState } =
    props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    checKIsAdmin();
  }, []);

  const checKIsAdmin = () => {
    if (authState?.isAdmin) {
      return;
    }
    router.replace("/");
  };

  const renderIcon = (index: number) => {
    switch (index) {
      case 0:
        return <PersonIcon />;
      case 1:
        return <PostAddIcon />;
      case 2:
        return <ContactsIcon />;
      case 3:
        return <ReportIcon />;
      case 4:
        return;
    }
  };
  const routerToScreen = (index: number) => {
    switch (index) {
      case 0:
        {
          console.log(index);
          router.push("/admin/user-management")
        }
        return;

      case 1:
        {
          console.log(index);
          router.push("/admin/post-management")
        }
        return;
      case 2:
        return <ContactsIcon />;
      case 3:
        return <ReportIcon />;
      case 4:
        return;
    }
  };
  const menuId = "primary-search-account-menu";
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };
  const onPressLogout = async () => {
    handleMenuClose();
    router.push("/");
    await authReducer.logout();
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={onPressLogout}>Đăng xuất</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <div className={classes.toolBarFlexBox}>
            <div>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                {title}
              </Typography>
            </div>
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </div>
        </Toolbar>
        {renderMenu}
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div className={classes.logoCpn}>
            <img src="/assets/logo_main.png" alt="" />
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Người dùng", "Bài Viết", "Liên hệ", "Báo cáo"].map(
            (text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => {
                  console.log(index);
                  routerToScreen(index);
                }}
              >
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {renderIcon(index)}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ),
          )}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
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

const ManagementWrapper = React.memo(
  connect(mapState, mapDispatch)(ManagementWrapperComponent),
);
export { ManagementWrapper };