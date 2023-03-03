import React, { CSSProperties } from "react";
import { Button, TextField } from "@material-ui/core";
import TextArea from "antd/lib/input/TextArea";

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "white",
  width: "40%",
  padding: 30,
  borderRadius: 10,
};

const textStyles: React.CSSProperties = {
  width: "90%",
  margin: 5,
  borderRadius: 10,
  marginBottom: 10,
};

const ContactForm: React.FC = () => {
  return (
    <form style={styles}>
      <h2>Yêu cầu liên hệ</h2>
      <TextField
        style={textStyles}
        type="email"
        label="Email"
        variant="outlined"
      />
      <TextField
        style={textStyles}
        type="tel"
        label="Số điện thoại"
        variant="outlined"
      />
      <TextArea style={textStyles} placeholder="Lời nhắn" rows={4} />
      <Button
        variant="contained"
        color="primary"
        style={{ color: "white", width: "90%" }}
      >
        Yêu cầu liên hệ lại
      </Button>
    </form>
  );
};

export { ContactForm };
