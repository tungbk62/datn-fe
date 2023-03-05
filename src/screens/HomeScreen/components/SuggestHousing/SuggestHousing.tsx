import React, { useEffect, useRef } from "react";
import { useStyles } from "./SuggestHousing.styles";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import { TitleText } from "src/components/TitleText";
import { BaseLazySkeletonImage } from "src/components/BaseLazySkeletonImage";
import { BaseTextBoxSlice } from "src/components/BaseTextBoxSlice";
import Skeleton from "react-loading-skeleton";
import { Grid } from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import moment from "moment";
import { useRouter } from "next/router";
import { Post } from "../NewsAboutUs";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

interface Props {
  data: Post[];
}

const SuggestHousingCpn = (props: Props): JSX.Element => {
  const { data } = props;
  const classes = useStyles();
  const router = useRouter();
  const onPressPost = (item: any) => {
    if (item?.id) {
      router.push(`/post/${item?.id}`);
    }
    console.log(item?.id);
  };

  const listRef = useRef(null) as any;

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <div className={classes.categoryContainer}>
      {/* <TitleText title={"Kết quả tìm kiếm"} /> */}
      <TitleText title={"Dự án cho bạn"} />
      <div className={classes.swiperCategory}>
        <Grid
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
          container
          spacing={0}
        >
          {data?.map((item: Post) => {
            return (
              <Grid key={item.id} className={classes.box} item xs={3}>
                <div
                  className={classes.itemWrapper}
                  onClick={() => {
                    onPressPost(item);
                  }}
                >
                  <div>
                    <BaseLazySkeletonImage
                      scrollContainer="#-main"
                      imageClassName={classes.imageCategory}
                      imageUrl={item.mainImageUrl}
                      altText={item.title || " "}
                    />
                  </div>
                  {!!item?.title ? (
                    <div className={classes.paddingBox}>
                      <BaseTextBoxSlice
                        numberOfLines={2}
                        additionalClassName={classes.categoryName}
                        text={item?.title}
                      >
                        <h3>{item?.title}</h3>
                      </BaseTextBoxSlice>
                      <span>{currencyFormatter.format(item?.priceMonth)}</span>
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
      </div>
    </div>
  );
};
const SuggestHousing = React.memo(SuggestHousingCpn);
export { SuggestHousing };
