import React, { useState, useEffect, useRef } from "react";
import { useStyles } from "./SuggestHousing.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
SwiperCore.use([Autoplay, Pagination, Navigation]);
import { TitleText } from "src/components/TitleText";
import { BaseLazySkeletonImage } from "src/components/BaseLazySkeletonImage";
import { BaseTextBoxSlice } from "src/components/BaseTextBoxSlice";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { Carousel } from "antd";
import { CarouselItem } from "src/components/AuthWrapper/components/CarouselItem";
import { Grid, Paper, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ScheduleIcon from "@material-ui/icons/Schedule";
import moment from "moment";
import { useRouter } from "next/router";

interface Props {
  data?: [];
}

const SuggestHousingCpn = (props: Props): JSX.Element => {
  const { data } = props;
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const onPressPost = (item: any) => {
    if (item?.id) {
      router.push(`/post/${item?.id}`);
    }
    console.log(item?.id);
  };

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef(null) as any;

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [data]);

  const handleItemClick = (index: any) => {
    setSelectedIndex(index);
    // onItemClick(index);
  };

  return (
    <div className={classes.categoryContainer}>
      <TitleText title={"Dự án cho bạn"} />
      <div className={classes.swiperCategory}>
        <Grid
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
          container
          spacing={0}
        >
          {data?.map((item: any) => {
            return (
              <Grid className={classes.box} item xs={3}>
                <div
                  className={classes.itemWrapper}
                  onClick={() => {
                    onPressPost(item);
                  }}
                >
                  <div>
                    <a href={item?.url} target="_blank">
                      <BaseLazySkeletonImage
                        scrollContainer="#-main"
                        imageClassName={classes.imageCategory}
                        imageUrl={item?.mainImageUrl}
                        altText={item?.title || " "}
                      />
                    </a>
                  </div>
                  {!!item?.title ? (
                    <div className={classes.paddingBox}>
                      <a href={item?.url} target="_blank">
                        <BaseTextBoxSlice
                          numberOfLines={2}
                          additionalClassName={classes.categoryName}
                          text={item?.title}
                        >
                          <h3>{item?.title}</h3>
                        </BaseTextBoxSlice>
                      </a>
                      <BaseTextBoxSlice
                        numberOfLines={3}
                        additionalClassName={classes.descriptionName}
                      >
                        <span>{item?.description}</span>
                      </BaseTextBoxSlice>
                      <BaseTextBoxSlice
                        numberOfLines={3}
                        additionalClassName={classes.descriptionName}
                      >
                        Địa chỉ:{" "}
                        {item?.province +
                          ", " +
                          item?.district +
                          ", " +
                          item?.wards}
                      </BaseTextBoxSlice>
                      <div className={classes.itemsFlex}>
                        <div className={classes.itemsFlex}>
                          <ScheduleIcon className={classes.small} />
                          <div className={classes.smallText}>
                            {" "}
                            {moment(item?.createdDate).format("MM-DD-YYYY")}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={classes.paddingBox}>
                      <Skeleton className={classes.nameSkeleton} />
                      <Skeleton className={classes.nameSkeleton} />
                    </div>
                  )}
                </div>
              </Grid>
            );
          })}
        </Grid>
        {/* <Grid className={classes.box} item xs={4}>
          {data?.length &&
            data?.map((item: any, index: number) => {
              if (index <= 7) {
                return (
                  <div
                    onClick={() => {
                      onPressPost(item);
                    }}
                    className={classes.categoryName}
                    key={index}
                  >
                    {item?.title}
                  </div>
                );
              }
              return null;
            })}
        </Grid> */}
      </div>
    </div>
  );
};
const SuggestHousing = React.memo(SuggestHousingCpn);
export { SuggestHousing };
