import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import { Select as SelectAntd } from "antd";
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
import PriceSlider from "./PriceSlider";
import Notifications from "../Notifications";

type Anchor = "top" | "left" | "bottom" | "right";

type FormType = "edit-post" | "edit-profile" | "change-pw" | "notifications";

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

  useEffect(() => {
    const getSystemsData = async () => {
      const userId = await authReducer?.getUserDetail();
      setUserDataId(userId?.id);
      await appReducer?.getListPostType();
      await authReducer?.getListProvince();
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
  const [idAddress, setIdAddress] = useState([]);
  const [prices, setPrices] = useState<[number, number]>([500, 20000]);

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

  const handleChangeProvince = (value: string) => {
    setProvince(value);
  };

  const handleChangeDistinct = (value: string) => {
    const tmp = authState?.detailProvince.filter(
      (item: any) => item.id === value,
    );
    const tmp2 = tmp[0]?.value.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));
    console.log(tmp2);
    setWards(tmp2);
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
        <Tab label="Tin t???c" />
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
        <MenuItem onClick={onPressManagement}>Trang qu???n l??</MenuItem>
      )}
      {authState?.userInfo?.type === "BUSINESS" && (
        <MenuItem onClick={onPressToBusinessPage}>B??i ????ng c???a t??i</MenuItem>
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
        ?????i m???t kh???u
      </MenuItem>
      <MenuItem onClick={onPressLogout}>????ng xu???t</MenuItem>
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
            <MenuItem onClick={onPressManagement}>Trang qu???n l??</MenuItem>
          )}
          {authState?.userInfo?.type === "BUSINESS" && (
            <MenuItem onClick={onPressToBusinessPage}>
              B??i ????ng c???a t??i
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
          <MenuItem onClick={onPressLogout}>????ng xu???t</MenuItem>
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
        <MenuItem onClick={onPressLogin}>????ng nh???p</MenuItem>
        <MenuItem onClick={onPressRegister}>????ng k??</MenuItem>
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
              <Tab label="Tin t???c" />
            </Tabs>
            <div className={classes.grow} />
            <div className={classes.search}>
              <input
                placeholder="T??m ki???m???"
                className={`${classes.inputRoot} ${classes.inputInput}`}
              />
            </div>
            <SelectAntd
              defaultValue="Ch???n t???nh"
              options={authState?.listProvince}
              onChange={handleChangeProvince}
            />
            <Gap.XS />
            <SelectAntd
              defaultValue="Ch???n th??nh ph???"
              options={districts}
              onChange={handleChangeDistinct}
            />
            <Gap.XS />
            <SelectAntd
              defaultValue="Ch???n ph?????ng/x??"
              options={wards}
              onChange={(e: string) => {
                console.log(e);
                setIdAddress(e);
              }}
            />
            <Gap.XS />
            <Grid className={classes.pricingWrap} spacing={3}>
              <Typography id="input-slider" gutterBottom>
                Gi??
              </Typography>
              <Gap.S />
              <Grid container spacing={2} alignItems="center">
                <Input
                  style={{ width: 80 }}
                  value={prices[0]}
                  onChange={e => setPrices([Number(e.target.value), prices[1]])}
                  margin="dense"
                  inputProps={{
                    step: 10,
                    min: 0,
                    max: 100,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
                <Gap.XS />
                <Grid item md>
                  <PriceSlider
                    value={prices}
                    min={500}
                    max={20000}
                    onChange={(_, newVal) =>
                      setPrices(newVal as [number, number])
                    }
                  />
                </Grid>
                <Gap.XS />
                <Input
                  style={{ width: 100 }}
                  value={prices[1]}
                  onChange={e => setPrices([prices[0], Number(e.target.value)])}
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
            <Gap.XS />
            <SelectAntd
              defaultValue="Lo???i h??nh cho thu??"
              options={typeEstates.map(item => ({
                label: item.name,
                value: item.id,
              }))}
              onChange={(e: string) => {
                console.log(e);
              }}
            />
            <Gap.XS />
            <BaseButton
              className={classes.loginButton}
              onClick={onPressOpenModal}
            >
              T??m ki???m
            </BaseButton>
            <Gap.XS />
            {authState?.isSignedIn ? (
              <div className={classes.sectionDesktop}>
                {authState?.userInfo?.type === "BUSINESS" && (
                  <BaseButton
                    className={classes.loginButton}
                    onClick={onPressOpenModal}
                  >
                    ????ng tin
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
                  ????ng nh???p
                </BaseButton>
                <BaseButton
                  className={classes.registerButton}
                  onClick={onPressRegister}
                >
                  ????ng k??
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
          placeholder="Search???"
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
    </>
  );
};

const AppWrapper = React.memo(
  connect(mapState, mapDispatch)(AppWrapperComponent),
);

export { AppWrapper };
