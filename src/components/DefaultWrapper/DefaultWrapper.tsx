import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useStyles } from "./DefaultWrapper.styles";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  Modal,
  Select,
  Slider,
  Tab,
  Tabs,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import { useRouter } from "next/router";
import { BaseButton } from "../BaseButton";
import { PostEditModal } from "../PostEditModal";
import { Footer } from "./Footer";
import Gap from "../Gap";
import InfoForm from "../InfoForm";

interface Props {
  children?: any;
  appState?: any;
  appReducer?: any;
  authReducer?: any;
  authState?: any;
}

type Anchor = "top" | "left" | "bottom" | "right";

type FormType = "edit-post" | "edit-profile";

const AppWrapperComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const router = useRouter();
  const { children, appState, appReducer, authReducer, authState } = props;
  const [userDataId, setUserDataId] = useState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [stateDrawer, setStateDrawer] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [infoFormOpened, setInfoFormOpened] = useState(false);
  const [postFormOpened, setPostFormOpened] = useState(false) as any;

  useEffect(() => {
    getSystemsData();
  }, []);

  const handleFormAction = (formType: FormType, open = true) => {
    return () => {
      if (formType === "edit-post") {
        setPostFormOpened(open);
        return;
      }
      setInfoFormOpened(open);
    };
  };

  const getSystemsData = async () => {
    const userId = await authReducer?.getDetailUser();
    setUserDataId(userId?.id);
    await appReducer?.getListPostType();
    await authReducer?.getListProvince();
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
    handleFormAction("edit-profile")();
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
        aria-label="Vertical tabs example"
        className={classes.tabsMobile}
        value={0}
      >
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
  console.log("authstate", authState);

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
      {authState?.isAdmin && (
        <MenuItem onClick={onPressManagement}>Trang quản lý</MenuItem>
      )}
      {authState?.isBusiness && (
        <MenuItem onClick={onPressToBusinessPage}>Bài đăng của tôi</MenuItem>
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
          {authState?.isAdmin && (
            <MenuItem onClick={onPressManagement}>Trang quản lý</MenuItem>
          )}
          {authState?.isBusiness && (
            <MenuItem onClick={onPressToBusinessPage}>
              Bài đăng của tôi
            </MenuItem>
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

  const onPressOpenModal = () => {
    setPostFormOpened(true);
  };

  return (
    <>
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
              className={classes.tabsDesktop}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              value={0}
            >
              <Tab label="Tin tức" />
            </Tabs>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <input
                placeholder="Search…"
                className={`${classes.inputRoot} ${classes.inputInput}`}
              />
            </div>
            <FormControl variant="filled" style={{ minWidth: 75 }}>
              <InputLabel id="demo-simple-select-filled-label">Tinh</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ha Noi</MenuItem>
                <MenuItem value={20}>Ha Tay</MenuItem>
                <MenuItem value={30}>Ha Dong</MenuItem>
              </Select>
            </FormControl>
            <Gap.XS />
            <FormControl variant="filled" style={{ minWidth: 90 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Huyen
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ha Noi</MenuItem>
                <MenuItem value={20}>Ha Tay</MenuItem>
                <MenuItem value={30}>Ha Dong</MenuItem>
              </Select>
            </FormControl>
            <Gap.XS />
            <FormControl variant="filled">
              <InputLabel id="demo-simple-select-filled-label">Xa</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ha Noi</MenuItem>
                <MenuItem value={20}>Ha Tay</MenuItem>
                <MenuItem value={30}>Ha Dong</MenuItem>
              </Select>
            </FormControl>
            <Gap.XS />
            <div style={{ width: 200 }}>
              <Typography id="input-slider" gutterBottom>
                Gia
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider
                    // value={typeof value === "number" ? value : 0}
                    aria-labelledby="input-slider"
                  />
                </Grid>
                <Grid item>
                  <Input
                    style={{ width: 42 }}
                    value={40}
                    margin="dense"
                    inputProps={{
                      step: 10,
                      min: 0,
                      max: 100,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
              </Grid>
            </div>
            {authState?.isSignedIn ? (
              <div className={classes.sectionDesktop}>
                {(authState?.isBusiness || authState?.isAdmin) && (
                  <BaseButton
                    className={classes.loginButton}
                    onClick={onPressOpenModal}
                  >
                    Đăng tin
                  </BaseButton>
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
          className={`${classes.inputRoot} ${classes.inputInput}`}
        />
      </div>
      <div style={{ width: "100%", padding: "0px 12%" }}>{children}</div>
      <Footer />
      <PostEditModal
        visible={postFormOpened}
        hideModal={handleFormAction("edit-post", false)}
      />
      <Modal
        className={classes.center}
        open={infoFormOpened}
        onClose={handleFormAction("edit-profile", false)}
      >
        <InfoForm provinces={[]} onSubmit={console.log} />
      </Modal>
    </>
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
