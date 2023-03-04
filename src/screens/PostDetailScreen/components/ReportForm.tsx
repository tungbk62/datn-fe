import React, { CSSProperties, useState } from "react";
import { Button, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import TextArea from "antd/lib/input/TextArea";

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "white",
  width: "30%",
  padding: 30,
  borderRadius: 10,
};

const textStyles: React.CSSProperties = {
  width: "70%",
  margin: 5,
  borderRadius: 10,
  marginBottom: 10,
};

type ChangeEvent = (
  event: React.ChangeEvent<HTMLInputElement>,
  value: string,
) => void;

const ReportForm: React.FC = () => {
  const [value, setValue] = useState(1);
  const handleChange: ChangeEvent = event => {
    setValue(Number(event.target.value));
  };

  return (
    <form style={styles}>
      <h2>Báo cáo bài đăng không đúng</h2>
      <RadioGroup value={String(value)} onChange={handleChange}>
        <FormControlLabel
          value="1"
          control={<Radio />}
          label="Địa chỉ không đúng"
        />
        <FormControlLabel
          value="2"
          control={<Radio />}
          label="Tin không có thật"
        />
        <FormControlLabel
          value="3"
          control={<Radio />}
          label="Trùng với bài đăng khác"
        />
        <FormControlLabel
          value="4"
          control={<Radio />}
          label="Không liên lạc được"
        />
        <FormControlLabel
          value="5"
          control={<Radio />}
          label="Sai thông tin về: giá, diện tích,..."
        />
      </RadioGroup>
      <TextArea style={textStyles} placeholder="Lời nhắn" rows={4} />
      <Button
        variant="contained"
        color="primary"
        style={{ color: "white", width: "70%" }}
      >
        Gửi yêu cầu
      </Button>
    </form>
  );
};

export { ReportForm };
