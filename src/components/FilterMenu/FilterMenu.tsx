import React, {useEffect, useState } from "react";
import { useStyles } from './style';
import PriceSlider from "./PriceSlider";
import { Select as SelectAntd } from "antd";
import { Grid, Input, Modal, Slider, Tab, Tabs } from "@material-ui/core";
import { District, TypeEstate, Ward } from "@src/store/models/app/interface";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Gap from "../Gap";
import { apiHelper } from "@src/helpers";
import { api } from "@src/constants";
import { BaseButton } from "../BaseButton";
import { Router, useRouter } from "next/router";

type MyProps = {
  authReducer: any;
  authState: any;
  queryValue: any;
};

const searchValue = {
  queryValue: "",
  province: 0,
  district: 0,
  wards: 0,
  type: [],
  room: 0,
  pricemin: 0,
  pricemax: 0,
  areamin: 0,
  areamax: 0
}

const FilterMenu: React.FC<MyProps> = (props) => {

  const router = useRouter();

  const {authReducer, authState, queryValue } = props;

  const [province, setProvince] = useState("");
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  // const [currentSearchValue, setCurrentSearchValue] = useState(searchValue);
  const [typeEstates, setTypeEstates] = useState<TypeEstate[]>([]);
  const [priceRange, setPriceRange] = useState([500, 10000]);
  const [areaRange, setAreaRange] = useState([0, 500]);

  useEffect(() => {
    const getTypeEstates = async () => {
      const res = await apiHelper.get<TypeEstate[]>(api.typeEstate);
      setTypeEstates(res);
      console.log(res);
    };
    void getTypeEstates();

    console.log("reset search value");
    searchValue.province = 0;
    searchValue.district = 0;
    searchValue.wards = 0;
    searchValue.type = [];
    searchValue.room = 0;
    searchValue.pricemin = 0;
    searchValue.pricemax = 0;
    searchValue.areamin = 0;
    searchValue.areamax = 0;
    searchValue.queryValue = queryValue ? queryValue : "";
  }, []);

  useEffect(() => {
    if (!province) {
      return;
    }
    const getDataDistinct = async () => {
      const data = await authReducer?.getDetailProvince(province);
      console.log("data district", data);
      setDistricts(data);
    };
    getDataDistinct();
  }, [province]);

  const handleChangeProvince = (value: string) => {
    searchValue.province = Number(value);
    searchValue.district = 0;
    searchValue.wards = 0;
    setProvince(value);
  };

  const handleChangeDistinct = (value: string) => {
    const tmp = authState?.detailProvince.filter(
      (item: any) => item.id === value,
    );
    const tmp2 = tmp[0]?.value.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));
    console.log(tmp2);
    setWards(tmp2);

    searchValue.district = Number(value);
    searchValue.wards = 0;
  };

  const handleClickFind = () =>{
    console.log("searchValue", searchValue);
    router.push({
      pathname: "/search",
      query: searchValue,
    });
  }

    const classes = useStyles();

      return (
        <div className={classes.container}>
          <h1>Lọc bài đăng</h1>
          <div>
          <SelectAntd
              style={{borderRadius: '10px'}}
              className={classes.select}
              placeholder="Chọn tỉnh"
              options={authState?.listProvince}
              onChange={handleChangeProvince}
            />
            <Gap.XS />
            <SelectAntd
              className={classes.select}
              placeholder="Chọn huyện"
              options={districts}
              onChange={handleChangeDistinct}
            />
            <Gap.XS />
            <SelectAntd
              className={classes.select}
              placeholder="Chọn phường/xã"
              options={wards}
              onChange={(e: string) => {
                searchValue.wards = Number(e);
              }}
            />
            <Gap.XS />
            <SelectAntd
              mode="tags"
              className={classes.select}
              placeholder="Loại hình cho thuê"
              options={typeEstates.map(item => ({
                label: item.name,
                value: item.id,
              }))}
              onChange={(e: []) => {
                searchValue.type = e;
              }}
            />
            <Gap.XS />
              <Grid item md>
                <label className={classes.labelRangeName}>Mức giá (x1000)</label>
                <div className={classes.labelRange}>
                <label className={classes.labelRangeValue}>{priceRange[0]}</label>
                <ArrowForwardIcon sx={{fontSize:18,  marginLeft:3, marginRight:3}}/>
                <label className={classes.labelRangeValue}>{priceRange[1]}</label>
                </div>
                <PriceSlider
                  value={priceRange}
                  min={500}
                  max={10000}
                  onChange={(e, value: any) =>{
                    setPriceRange(value)
                    searchValue.pricemin = value[0];
                    searchValue.pricemax = value[1];
                  }
                  }
                />
              </Grid>
            <Gap.XS />
              <Grid item md>
              <label className={classes.labelRangeName}>Diện tích (m<sup>2</sup>)</label>
                <div className={classes.labelRange}>
                <label className={classes.labelRangeValue}>{areaRange[0]}</label>
                <ArrowForwardIcon sx={{fontSize:18,  marginLeft:3, marginRight:3}}/>
                <label className={classes.labelRangeValue}>{areaRange[1]}</label>
                </div>
                <PriceSlider
                  value={areaRange}
                  min={0}
                  max={500}
                  onChange={(e, value: any) =>{
                    setAreaRange(value)
                    searchValue.areamin = value[0];
                    searchValue.areamax = value[1];
                  }
                  }
                />
              </Grid>
            <Gap.XS />

          </div>
          <BaseButton
              className={classes.loginButton}
              onClick={() => {
                handleClickFind();
                console.log(searchValue);}}
            >
              Tìm kiếm
            </BaseButton>
        </div>
      );
  };

  const mapState = (rootState: any) => ({
    appState: rootState.appModel,
    authState: rootState.authModel,
  });
  
  const mapDispatch = (rootReducer: any) => ({
    appReducer: rootReducer.appModel,
    authReducer: rootReducer.authModel,
  });
  

  export default FilterMenu;