import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { LazyLoadingImage } from "../LazyLoadingImage";
import { useStyles } from "./BaseLazySkeletonImage.styles";
interface Props {
  onClickImage?: () => void;
  imageUrl: string;
  imageClassName: string;
  scrollContainer?: string;
  altText: string;
  lazyBoxClassName?: string;
}
const BaseLazySkeletonImageComponent = (props: Props): JSX.Element => {
  const classes = useStyles();
  const {
    onClickImage,
    imageUrl,
    imageClassName,
    scrollContainer,
    altText,
    lazyBoxClassName,
  } = props;
  const [loadedImage, setLoadedImage] = useState(false);
  const onLoadImage = () => {
    setLoadedImage(true);
  };

  return (
    <LazyLoadingImage
      height={90}
      className={`${classes.avatarBox} ${lazyBoxClassName ?? ""}`}
      scrollContainer={scrollContainer}
    >
      <img
        // onClick={onClickImage}
        src={imageUrl??""}
        className={
          loadedImage
            ? imageClassName + " " + classes.avatar
            : classes.displayNone
        }
        onLoad={onLoadImage}
        alt={altText ?? ""}
      />
      <Skeleton
        style={!loadedImage ? {} : { display: "none" }}
        className={imageClassName + " " + classes.avatar}
      />
    </LazyLoadingImage>
  );
};
const BaseLazySkeletonImage = React.memo(BaseLazySkeletonImageComponent);
export { BaseLazySkeletonImage };
