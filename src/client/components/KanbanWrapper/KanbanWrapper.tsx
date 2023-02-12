import React, { useState } from "react";
import "antd/dist/antd.css";
import { useStyles } from "./KanbanWrapper.styles";
import type { SelectProps } from "antd/es/select";
import { AutoComplete, Input } from "antd";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DesktopOutlined,
  ContainerOutlined,
  AppstoreOutlined,
  StockOutlined,
  SettingOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
const { Header, Sider, Content } = Layout;
interface Props {
  children: any;
  noHeaderAndFooter?: boolean;
  disableMessenger?: boolean;
  menuItem: any;
}
const getItem = (
  label?: any,
  key?: any,
  icon?: any,
  children?: any,
  disabled?: boolean,
  type?: any,
) => {
  return {
    key,
    icon,
    children,
    label,
    disabled,
    type,
  };
};
const getRandomInt = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join(".")
    .split(".")
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              Found {query} on{" "}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });

const AppWrapperComponent = (props: Props): JSX.Element => {
  const { children, noHeaderAndFooter, disableMessenger, menuItem } = props;
  const [collapsed, setCollapsed] = useState(false);
  const classes = useStyles();
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };

  const items = [
    getItem(
      null,
      "Your work",
      <div className={classes.bttConfig}>
        <div className={classes.bttContainer}>Your work</div>
      </div>,
      null,
    ),
    getItem(
      null,
      "Projects",
      <div className={classes.bttConfig}>
        <div className={classes.bttContainer}>Projects</div>
      </div>,
      null,
    ),
    getItem(
      null,
      "Dashboards",
      <div className={classes.bttConfig}>
        <div className={classes.bttContainer}>Dashboards</div>
      </div>,
      null,
    ),
    getItem(
      null,
      "People",
      <div className={classes.bttConfig}>
        <div className={classes.bttContainer}>People</div>
      </div>,
      null,
    ),
  ];
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={classes.logo}>
          <Button className={classes.bttStyle} type="primary">
            Create
          </Button>
        </div>
        {/* <img src="/public/assets/finatechCloneLogo.png" alt="" /> */}
        {/* <div className={classes.userInfo}>
          <img src="/assets/finatechCloneLogo.png" alt="" />
        </div> */}
        <Menu
          className={classes.menuContainer}
          defaultOpenKeys={["Planning"]}
          theme="light"
          mode="inline"
          items={menuItem}
          selectedKeys={["Planning"]}
        />
      </Sider>
      <Layout className={classes.siteLayout}>
        <Header
          className={classes.siteLayoutBackground}
          style={{
            padding: 0,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className={classes.logoCpn}
            onClick={() => setCollapsed(!collapsed)}
          >
            <img src="/assets/finatechCloneLogo.png" alt="" />
          </div>
          <Menu
            onClick={() => {}}
            mode="horizontal"
            defaultSelectedKeys={["Your work"]}
            selectedKeys={["toolbar"]}
            items={items}
          />
          <div className={classes.configItemContainer}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <AutoComplete
                dropdownMatchSelectWidth={252}
                // style={{ width: 300 }}
                options={options}
                onSelect={onSelect}
                onSearch={handleSearch}
                disabled={true}
              >
                <Input.Search
                  size="large"
                  placeholder="Tìm kiếm ..."
                  enterButton
                />
              </AutoComplete>
            </div>
            <div className={classes.iconContainer}>
              <NotificationOutlined />
            </div>
            <div className={classes.iconContainer}>
              <SettingOutlined />
            </div>
            <div className={classes.iconContainer}>
              <img
                src={
                  // userData?.avatar ??
                  "https://vconomics.io/images/icon-default.png"
                }
                alt="avatar"
                className={classes.userAvatar}
              />
              ,
            </div>
          </div>
        </Header>
        <Content
          className={classes.siteLayoutBackground}
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

const AppWrapper = React.memo(AppWrapperComponent);
export { AppWrapper };
