import React, { useEffect, useState } from "react";
import { Avatar, Button, Grid } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import Rating from "@material-ui/lab/Rating";
import TextArea from "antd/lib/input/TextArea";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Gap from "src/components/Gap";
import { Feedback } from "@src/store/models/auth/interface";
import { apiHelper } from "@src/helpers";
import { api } from "@src/constants";

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

const FeedbackItem = (feedback: Feedback) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="username" src="/public/default-profile.jpg" />
        </Grid>
        <Grid justifyContent="flex-start" item xs zeroMinWidth>
          <div className={classes.horizontal}>
            <h4 style={{ margin: 0, textAlign: "left" }}>
              {feedback.createdBy.lastName} {feedback.createdBy.firstName}
            </h4>
            <Gap.XS />
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {feedback.ratingPoint}{" "}
              <StarIcon fontSize="small" style={{ color: "orange" }} />
            </span>
          </div>
          <p style={{ textAlign: "left" }}>{feedback.description}</p>
          <p style={{ textAlign: "left", color: "gray" }}>
            {feedback.createdDate}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

type Props = {
  userId: number;
};

const FeedbackForm: React.FC<Props> = props => {
  const classes = useStyles();
  const [value, setValue] = useState(2);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const getFeedbacks = async () => {
      const res = await apiHelper.get<Feedback[]>(
        api.listFeedback(props.userId),
        { page: 0, size: 999 },
      );
      setFeedbacks(res);
    };
    void getFeedbacks();
  }, [props.userId]);

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <h2>Đánh giá</h2>
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
          {feedbacks.map(feedback => (
            <FeedbackItem key={feedback.id} {...feedback} />
          ))}
        </div>
      </form>
    </div>
  );
};

export { FeedbackForm };
