import React from "react";
import { useStyles } from "./NewsAboutUs.styles";
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
import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";

interface Props {
  data: [];
}

const NewsAboutUs = (props: Props): JSX.Element => {
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

  return (
    <div className={classes.categoryContainer}>
      <TitleText title={"Tin mới"} />
      <div className={classes.swiperCategory}>
        <Grid className={classes.box} item xs={8}>
          <Carousel className={classes.carouselContainer} autoplay>
            <div>
              <CarouselItem
                source={"/assets/mkt-1.jpeg"}
                city={"TP. Hồ Chí Minh"}
                news={"7125"}
              />
            </div>
            <div>
              <CarouselItem
                source={"/assets/mkt-2.jpeg"}
                city={"TP. Hà Nội"}
                news={"1558"}
              />
            </div>
            <div>
              <CarouselItem
                source={"/assets/mkt-3.jpeg"}
                city={"TP. Đã Nắng"}
                news={"5426"}
              />
            </div>
            <div>
              <CarouselItem
                source={"/assets/mkt-4.jpeg"}
                city={"TP. Hải Phòng"}
                news={"1234"}
              />
            </div>
          </Carousel>
        </Grid>
        <Grid className={classes.box} item xs={4}>
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
        </Grid>
      </div>
    </div>
  );
};
const NewPost = React.memo(NewsAboutUs);
export { NewPost };
