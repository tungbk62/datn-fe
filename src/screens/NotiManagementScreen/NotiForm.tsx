import React, { useEffect, useState } from "react";
import { apiHelper } from "@src/helpers";
import { api } from "@src/constants";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Select, Input, SelectProps } from "antd";
import TextArea from "antd/lib/input/TextArea";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "white",
      padding: 25,
      borderRadius: 10,
    },
    column: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      width: 500,
      marginTop: 10,
    },
  }),
);

const SendNotiForm: React.FC = () => {
  const classes = useStyles();
  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      label: `email${i}@gmail.com`,
      value: `email${i}@gmail.com`,
    });
  }
  return (
    <div className={classes.container}>
      <h2>Thông báo</h2>
      <div className={classes.column}>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Nguoi nhan"
          defaultValue={["email10@gmail.com", "email20@gmail.com"]}
          // onChange={handleChange}
          options={options}
          // className={classes.input}
        />
        {/* <Select placeholder="Loai thong bao" /> */}
        <TextArea placeholder="Nội dung" className={classes.input} />
      </div>
    </div>
  );
};

export default SendNotiForm;
