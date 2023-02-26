import React, { Fragment, useState } from "react";
import "antd/dist/antd.css";
import { useStyles } from "./DefaultWrapper.styles";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Tab, Tabs } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";

// const { Header, Sider, Content } = Layout;
interface Props {
  children?: any;
  appState?: any;
  appReducer?: any;
}
type Anchor = "top" | "left" | "bottom" | "right";

const AppWrapperComponent = (props: Props): JSX.Element => {
  const classes = useStyles();

  const { children, appState, appReducer } = props;
  // console.log("appState",appState)
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const [stateDrawer, setStateDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setStateDrawer({ ...stateDrawer, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider /> */}
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabsMoblile}
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>
    </div>
  );

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
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="notifications" color="inherit">
          {/* <Badge overlap="rectangular" badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge> */}
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      <Drawer
        anchor={"left"}
        open={stateDrawer["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
      <div className={classes.grow}>
        <AppBar position="static" color="inherit">
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={toggleDrawer("left", true)}
              // edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </button>
            <div className={classes.logoCpn}>
              <img src="/assets/logo_main.png" alt="" />
            </div>

            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabsDesktop}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Tab 1" />
              <Tab label="Tab 2" />
              <Tab label="Tab 3" />
              <Tab label="Tab 5" />
            </Tabs>

            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <input
                placeholder="Search…"
                // className={{
                //   root: classes.inputRoot,
                //   input: classes.inputInput,
                // }}
                className={`${classes.inputRoot} ${classes.inputInput}`}
                // inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit" aria-label="noti">
                {appState?.notiAction && appState?.notiAction>0 ? (
                  <Badge variant="dot" color="secondary">
                    <NotificationsIcon />
                   </Badge>
                ) : (
                  <NotificationsIcon />
                )}
              </IconButton>
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
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      {children}
    </Fragment>
  );
};

const mapState = (rootState: any) => ({
  appState: rootState.appModel,
});

const mapDispatch = (rootReducer: any) => ({
  appReducer: rootReducer.appModel,
});

const AppWrapper = React.memo(
  connect(mapState, mapDispatch)(AppWrapperComponent),
);
export { AppWrapper };
