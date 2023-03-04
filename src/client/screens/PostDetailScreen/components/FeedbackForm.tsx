import React, { CSSProperties, useState } from "react";
import { Avatar, Button, Grid, TextField } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import TextArea from "antd/lib/input/TextArea";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Gap from "@app-client/components/Gap";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: 700,
      background: "white",
      borderRadius: 10,
      overflowY: "scroll",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      padding: 30,
    },
    text: {
      width: "80%",
      margin: 5,
      borderRadius: 10,
      marginBottom: 10,
    },
    sendBtn: {
      marginTop: 10,
      color: "white",
      width: "80%",
    },
    horizontal: {
      display: "flex",
      flexDirection: "row",
    },
    commentSection: {
      width: "80%",
    },
  }),
);

const FeedbackItem = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="username" src="/public/default-profile.jpg" />
        </Grid>
        <Grid justifyContent="flex-start" item xs zeroMinWidth>
          <div className={classes.horizontal}>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <Gap.XS />
            <span>4</span>
          </div>
          <p style={{ textAlign: "left" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
            Suspendisse congue vulputate lobortis. Pellentesque at interdum
            tortor. Quisque arcu quam, malesuada vel mauris et, posuere sagittis
            ipsum. Aliquam ultricies a ligula nec faucibus. In elit metus,
            efficitur lobortis nisi quis, molestie porttitor metus. Pellentesque
            et neque risus. Aliquam vulputate, mauris vitae tincidunt interdum,
            mauris mi vehicula urna, nec feugiat quam lectus vitae ex.{" "}
          </p>
          <p style={{ textAlign: "left", color: "gray" }}>
            posted 1 minute ago
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

const FeedbackForm: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState(2);

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <h2>Danh gia</h2>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue as number);
          }}
        />
        <TextArea className={classes.text} placeholder="Lời nhắn" rows={4} />
        <Button variant="contained" color="primary" className={classes.sendBtn}>
          Gửi
        </Button>
        <Gap.XS />
        <div className={classes.commentSection}>
          <FeedbackItem />
          <FeedbackItem />
          <FeedbackItem />
          <FeedbackItem />
          <FeedbackItem />
          <FeedbackItem />
          <FeedbackItem />
        </div>
      </form>
    </div>
  );
};

export { FeedbackForm };
