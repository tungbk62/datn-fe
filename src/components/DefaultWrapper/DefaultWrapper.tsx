import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
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
import { Grid, Input, Modal, Slider, Tab, Tabs } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import Router from 'next/router'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { useStyles } from "./DefaultWrapper.styles";
import { BaseButton } from "../BaseButton";
import { PostEditModal } from "../PostEditModal";
import { Footer } from "./Footer";
import Gap from "../Gap";
import InfoForm, { ChangePWForm } from "../InfoForm";
import { Dispatch, RootState } from "@src/store";
import { apiHelper } from "@src/helpers";
import { api } from "@src/constants";
import { District, TypeEstate, Ward } from "@src/store/models/app/interface";
import Notifications from "../Notifications";
import FilterMenu from "../FilterMenu/FilterMenu";

type Anchor = "top" | "left" | "bottom" | "right";

type FormType = "edit-post" | "edit-profile" | "change-pw" | "notifications" | "filter";

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
type Props = StateProps &
  DispatchProps & {
    children: React.ReactNode;
  };

const SearchValue = {
  province: null,
  district: null,
  wards: null,
  address: null,
  type: null,
  room: null,
  pricemin: null,
  pricemax: null,
  areamin: null,
  areamax: null
}

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
  const [postFormOpened, setPostFormOpened] = useState(false);
  const [notiOpened, setNotiFormOpened] = useState(false);
  const [changePwFormOpened, setChangePwFormOpened] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [queryValue, setQueryValue] = useState("");

  useEffect(() => {
    const getSystemsData = async () => {
      const userId = await authReducer?.getUserDetail();
      setUserDataId(userId?.id);
      await appReducer?.getListPostType();
      await authReducer?.getListProvince();
      await appReducer?.getListTypeEstate();
    };
    getSystemsData();
  }, [appReducer, authReducer]);

  const handleFormAction = (formType: FormType, open = true) => {
    return () => {
      switch (formType) {
        case "edit-post": {
          setPostFormOpened(open);
          return;
        }
        case "edit-profile": {
          setInfoFormOpened(open);
          return;
        }
        case "notifications": {
          setNotiFormOpened(open);
          return;
        }
        case "change-pw": {
          setChangePwFormOpened(open);
          return;
        }
        case "filter": {
          setIsFilter(open);
          return;
        }
      }
    };
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
  const [province, setProvince] = useState("");
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [typeEstates, setTypeEstates] = useState<TypeEstate[]>([]);

  useEffect(() => {
    const getTypeEstates = async () => {
      const res = await apiHelper.get<TypeEstate[]>(api.typeEstate);
      setTypeEstates(res);
    };
    void getTypeEstates();
  }, []);

  useEffect(() => {
    if (!province) {
      return;
    }
    const getDataDistinct = async () => {
      const data = await authReducer?.getDetailProvince(province);
      console.log("data district", data);
      setDistricts(data);
    };
    getDataDistinct();
  }, [authReducer, province]);

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
    authState?.userInfo?.type === "ADMIN" ? router.push("/admin/") : null;
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
      {authState?.userInfo?.type === "ADMIN" && (
        <MenuItem onClick={onPressManagement}>Trang quản lý</MenuItem>
      )}
      {authState?.userInfo?.type === "BUSINESS" && (
        <MenuItem onClick={onPressToBusinessPage}>Bài đăng của tôi</MenuItem>
      )}
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleFormAction("edit-profile")();
        }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleFormAction("change-pw", true)();
        }}
      >
        Đổi mật khẩu
      </MenuItem>
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
          {authState?.userInfo?.type === "ADMIN" && (
            <MenuItem onClick={onPressManagement}>Trang quản lý</MenuItem>
          )}
          {authState?.userInfo?.type === "BUSINESS" && (
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
              <img src="/assets/logo_main.png" alt="" onClick={() => Router.push("/")}/>
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
              <input
                placeholder="Tìm kiếm…"
                className={`${classes.inputRoot} ${classes.inputInput}`}
                onChange={(e : any) => {setQueryValue(e.target.value);}}
              />
            </div>
            <IconButton
                  color="inherit"
                  aria-label="noti"
                  style={{marginRight: 16}}
                  onClick={() => {setIsFilter(true)}}
                ><FilterAltIcon/></IconButton>
            <BaseButton
              className={classes.loginButton}
              onClick={() => {
                console.log("helooooo");
                console.log("queryValue", queryValue);
                router.push("/search?queryValue=" + queryValue);}}
            >
              Tìm kiếm
            </BaseButton>
            <Gap.XS />
            {authState?.isSignedIn ? (
              <div className={classes.sectionDesktop}>
                {authState?.userInfo?.type === "BUSINESS" && (
                  <BaseButton
                    className={classes.loginButton}
                    onClick={onPressOpenModal}
                  >
                    Đăng tin
                  </BaseButton>
                )}
                <IconButton
                  color="inherit"
                  aria-label="noti"
                  onClick={handleFormAction("notifications", true)}
                >
                  {appState?.notiAction && appState.notiAction > 0 ? (
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
        style={{zIndex:20}}
        className={classes.center}
        open={infoFormOpened}
        onClose={handleFormAction("edit-profile", false)}
      >
        <InfoForm authReducer={authReducer}/>
      </Modal>
      <Modal
        className={classes.center}
        open={changePwFormOpened}
        onClose={handleFormAction("change-pw", false)}
      >
        <ChangePWForm />
      </Modal>
      <Modal
        className={classes.center}
        open={notiOpened}
        onClose={handleFormAction("notifications", false)}
      >
        <Notifications userId={authState.userInfo?.id as number} />
      </Modal>
      <Modal
        style={{zIndex:20}}
        className={classes.center}
        open={isFilter}
        onClose={handleFormAction("filter", false)}
      >
        <FilterMenu queryValue={queryValue} authReducer={authReducer} authState={authState}/>
      </Modal>
    </>
  );
};

const AppWrapper = React.memo(
  connect(mapState, mapDispatch)(AppWrapperComponent),
);

export { AppWrapper };
