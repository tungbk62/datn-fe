import React, { useEffect, useState } from "react";
import { apiHelper } from "@src/helpers";
import { api } from "@src/constants";
import { useStyles } from "./styles";

type Props = {
  userId: number;
};

export interface NotiDetail {
  id: number;
  typeNotification: string;
  viewed: boolean;
  createdDate: string;
}

const NotificationItem = (noti: NotiDetail) => {
  return (
    <div>
      <p>{noti.viewed ? "da doc" : "chua doc"}</p>
      {/* <p>{noti.typeNotification}</p> */}
      <span>{noti.createdDate}</span>
    </div>
  );
};

const Notifications: React.FC<Props> = () => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState<NotiDetail[]>([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const data = await apiHelper.get<NotiDetail[]>(`${api.notifications}`, {
          page: 0,
          size: 999,
        });
        setNotifications(data);
      } catch {
        setNotifications([]);
      }
    };
    getNotifications();
  }, []);

  return (
    <div className={classes.container}>
      <h2>Thong bao</h2>
      {notifications.map(item => (
        <NotificationItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Notifications;
