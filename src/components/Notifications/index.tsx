import React, { useEffect, useState } from "react";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { apiHelper } from "@src/helpers";
import { api } from "@src/constants";
import { useStyles } from "./styles";
import Gap from "../Gap";

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type Props = {
  userId: number;
};

export interface NotiDetail {
  id: number;
  typeNotification: string;
  viewed?: boolean;
  createdDate?: string;
  message: string;
}

const NotificationItem = (props: any) => {
  const classes = useStyles();
  const {noti, index} = props;

  return (
    <div className={classes.notiDetail}>
      <p>{index + 1}</p>
      <Gap.XS />
      <p style={{ width: 130 }}>{noti.typeNotification}</p>
      <p>{noti.message}</p>
    </div>
  );
};

const Notifications: React.FC<Props> = () => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState<NotiDetail[]>([]);
  const viewedNotis: NotiDetail[] = [];
  const notViewedNotis: NotiDetail[] = [];
  for (const noti of notifications) {
    if (noti.viewed) {
      viewedNotis.push(noti);
    } else {
      notViewedNotis.push(noti);
    }
  }

  const [value, setValue] = React.useState(0);

  const handleChange: (event: React.ChangeEvent<{}>, value: any) => void = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const data = await apiHelper.get<NotiDetail[]>(
          `${api.businessNotifications}`,
          {
            page: 0,
            size: 999,
          },
        );
        console.log("noti", data)
        setNotifications(data);
      } catch {
        setNotifications([]);
      }
    };
    getNotifications();
  }, []);

  return (
    <div className={classes.container}>
      <h2>Thông báo</h2>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="simple tabs example" style={{ background: "white" }}>
          <Tab label="Đã đọc" {...a11yProps(0)} />
          <Tab label="Chưa đọc" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {viewedNotis.map((item: any, index: number) => (<NotificationItem key={item.id} noti={item} index={index} />))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {notViewedNotis.map((item: any, index: number) => (<NotificationItem key={item.id} noti={item} index={index}/>))}
      </TabPanel>
    </div>
  );
};

export default Notifications;
