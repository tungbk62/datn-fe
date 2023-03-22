import { AppWrapper, BaseLazySkeletonImage, BaseTextBoxSlice } from "@src/components";
import React, { useEffect, useState } from "react";
import { apiHelper } from "@src/helpers";
import { api } from "@src/constants";
import { useRouter } from "next/router";
import { Props } from "html-react-parser/lib/attributes-to-props";
import { Grid } from "@material-ui/core";
import { Pagination, Skeleton } from "@mui/material";
import { useStyles } from "./styles";
import moment from "moment";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { Select as SelectAntd } from "antd";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

const orderBy = [
    {
        label: "Bài đăng mới nhất",
        value: "datedesc"
    },
    {
        label: "Giá thấp đến cao",
        value: "priceasc"
    },
    {
        label: "Giá cao đến thấp",
        value: "pricedesc"
    },
    {
        label: "Diện tích bé đến lớn",
        value: "areaasc"
    },
    {
        label: "Diện tích lớn đến bé",
        value: "areadesc"
    },
]

const SearchScreen = (props: Props) => {
    const classes = useStyles();
    const router = useRouter();
    const [listPost, setListPost] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [order, setOrder] = useState("dateasc");

    useEffect(() => {
        console.log("get public post");
        const data = router.query;
        console.log(data);
        console.log(data.type);
        const param = {
            page: page - 1,
            size: size,
            order: order,
            search: data.queryValue && data.queryValue !== "" ? data.queryValue : null,
            province: data.province && data.province !== "0" ? Number(data.province) : null,
            district: data.district && data.district !== "0" ? Number(data.district) : null,
            wards: data.wards && data.wards !== "0" ? Number(data.wards) : null,
            address: data.address ? data.address : null,
            type: data.type ? data.type : null,
            room: data.room && data.room !== "0" ? Number(data.room) : null,
            pricemin: data.pricemin && data.pricemin !== "0" ? Number(data.pricemin)*1000 : null,
            pricemax:  data.pricemax && data.pricemax !== "0" ? Number(data.pricemax)*1000 : null,
            areamin: data.areamin && data.areamin !== "0" ? Number(data.areamin) : null,
            areamax: data.areamax && data.areamax !== "0" ? Number(data.areamax) : null
            }

        getPublishPost(param);
    }, [page, size, order])

    const getPublishPost = async (param: any) => {
        try {
            if(!param){
                return;
            }
            console.log("before map", param);
            
            if(param.type && param.type.length > 1){
                let stringType = "";
                param.type.forEach((o : any) => {stringType = stringType + o + ","});
                param.type = stringType.slice(0, -1);;
            }else if(param.type){
                param.type = String(param.type[0]);
            }
            
            console.log("request body", param);
            const res = await apiHelper.get<any>(api.getListPostPublic, param);
            setListPost(res);
            console.log("data", res)
        } catch (error) {
            console.log("errorrr", error);
        }
    }

    const onPressPost = (item: any) => {
        router.push("/post/" + item.id);
    }

    return(
        <AppWrapper>
        <div className={classes.container}>
            <div className={classes.headerSearch}>
                <h1>Kết quả tìm kiếm</h1>
                <SelectAntd 
                    className={classes.select}
                    placeholder="Sắp xếp theo"
                    options = {orderBy}
                    onChange = {(value) => {setOrder(value)}}
                    disabled = {listPost.length === 0}
                />
            </div>
            
            {listPost.length !== 0 ? (listPost?.map((item: any) => {
                return (
                    <Grid key={item.id} className={classes.box} item xs={3}>
                        <div
                        className={classes.itemWrapper}
                        onClick={() => {
                            onPressPost(item);
                        }}
                        >
                        <div className={classes.imageBox}>
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
                            <span className={classes.priceMonth}>{currencyFormatter.format(item?.priceMonth)}</span>
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
                                {item?.wards +
                                ", " +
                                item?.district +
                                ", " +
                                item?.province}
                            </BaseTextBoxSlice>
                            <div className={classes.itemsFlex}>
                                <div className={classes.itemsFlex}>
                                <ScheduleIcon className={classes.small} />
                                <div className={classes.smallText}>
                                    {"  "}
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
                )
                })) : (<h2>Rất tiếc, hiện tại chưa có kết quả nào phù hợp. Hãy thay
                    đổi hoặc đặt lại tiêu chí tìm kiếm.</h2>)
            }
            {listPost.length !== 0 && <Pagination className={classes.pagingFooter} onChange={(e, value) => {setPage(value)}} count={10} />}
        </div>
    </AppWrapper>
    )
}

export default SearchScreen;