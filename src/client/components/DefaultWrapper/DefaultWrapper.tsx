import React, { Fragment, useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import { BaseButton } from "../BaseButton";
import { PostEditModal } from "../PostEditModal";
import { Footer } from "./Footer";

// const { Header, Sider, Content } = Layout;
interface Props {
  children?: any;
  appState?: any;
  appReducer?: any;
  authReducer?: any;
  authState?: any;
}
type Anchor = "top" | "left" | "bottom" | "right";

const AppWrapperComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const router = useRouter();
  const { children, appState, appReducer, authReducer, authState } = props;
  useEffect(() => {
    getSystemsData();
  }, []);
  const [userDataId, setUserDataId] = useState() as any;
  const getSystemsData = async () => {
    const userId = await authReducer?.getDetailUser();
    setUserDataId(userId?.id);
    await appReducer?.getListPostType();
    await authReducer?.getListProvince();
  };

  // console.log("appState",appState)
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState() as any;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
    setTimeout(() => {
      setValue();
    }, 1500);
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

  const onPressLogout = async () => {
    handleMenuClose();
    await authReducer.logout();
    router.push("/");
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
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabsMoblile}
      >
        <Tab
          label="Nhà đất cho thuê"
          onClick={() => {
            onRedirectHome();
          }}
        />
        <Tab label="Nhà đất cho bán" />
        <Tab label="Dự án" />
        <Tab label="Tin tức" />
      </Tabs>
    </div>
  );
  const onPressManagement = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    authState?.isAdmin ? router.push("/admin/") : null;
  };
  const onPressToBusinessPage = () => {
    if (!userDataId) {
      return;
    }
    router.push(`/business/${userDataId}`);
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
      {authState?.isAdmin ? (
        <MenuItem onClick={onPressManagement}>Trang quản lý</MenuItem>
      ) : (
        <></>
      )}
      {authState?.isBusiness ? (
        <MenuItem onClick={onPressToBusinessPage}>Bài đăng của tôi</MenuItem>
      ) : (
        <></>
      )}
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={onPressLogout}>Đăng xuất</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = () => {
    if (authState?.isSignedIn) {
      return (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          {authState?.isAdmin ? (
            <MenuItem onClick={onPressManagement}>Trang quản lý</MenuItem>
          ) : (
            <></>
          )}
          {authState?.isBusiness ? (
            <MenuItem onClick={onPressToBusinessPage}>
              Bài đăng của tôi
            </MenuItem>
          ) : (
            <></>
          )}
          <MenuItem
            onClick={() => {
              handleMenuClose();
            }}
          >
            Notifications
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={onPressLogout}>Đăng xuất</MenuItem>
        </Menu>
      );
    }
    return (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={onPressLogin}>Đăng nhập</MenuItem>
        <MenuItem onClick={onPressRegister}>Đăng ký</MenuItem>
      </Menu>
    );
  };

  const onPressLogin = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    router.push("/login");
  };
  const onPressRegister = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    router.push("/register");
  };

  const onRedirectHome = () => {
    router.push("/");
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
              <Tab
                label="Nhà đất cho thuê"
                onClick={() => {
                  onRedirectHome();
                }}
              />
              <Tab label="Nhà đất cho bán" />
              <Tab label="Dự án" />
              <Tab label="Tin tức" />
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
            {authState?.isSignedIn ? (
              <div className={classes.sectionDesktop}>
                {authState?.isBusiness || authState?.isAdmin ? (
                  <BaseButton
                    className={classes.loginButton}
                    onClick={onPressOpenModal}
                  >
                    Đăng tin
                  </BaseButton>
                ) : (
                  <></>
                )}

                <IconButton color="inherit" aria-label="noti">
                  {appState?.notiAction && appState?.notiAction > 0 ? (
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
            ) : (
              <div className={classes.sectionDesktop}>
                <BaseButton
                  className={classes.loginButton}
                  onClick={onPressLogin}
                >
                  Đăng nhập
                </BaseButton>
                <BaseButton
                  className={classes.registerButton}
                  onClick={onPressRegister}
                >
                  Đăng ký
                </BaseButton>
                {/* <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton> */}
              </div>
            )}
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
        {renderMobileMenu()}
        {renderMenu}
      </div>
      <div className={classes.search2}>
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
      <div style={{ width: "100%", padding: "0px 12%" }}>{children}</div>
      <Footer />
      <PostEditModal
        visible={openModal}
        hideModal={() => {
          handleCloseModal();
        }}
        // userData={dataModal}
      />
    </Fragment>
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

const AppWrapper = React.memo(
  connect(mapState, mapDispatch)(AppWrapperComponent),
);
export { AppWrapper };
