import React from "react";
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";
import { Carousel } from "antd";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

import { useStyles } from "./NewsAboutUs.styles";
import { TitleText } from "@components/TitleText";
import { CarouselItem } from "@components/AuthWrapper/components/CarouselItem";

SwiperCore.use([Autoplay, Pagination, Navigation]);

export interface Post {
  id: number;
  title: string;
  typeEstate: string;
  province: string;
  district: string;
  wards: string;
  area: number;
  priceMonth: number;
  verified: boolean;
  createdBy: string;
  imageNumber: number;
  mainImageUrl: string;
  createdDate: string;
  longitude: number;
  latitude: number;
  description?: string;
}

interface Props {
  data: Post[];
}

const NewsAboutUs = (props: Props): JSX.Element => {
  const { data } = props;
  const classes = useStyles();
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
          {data?.map((item: Post, index: number) => {
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
