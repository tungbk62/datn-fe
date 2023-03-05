import React, { useEffect, useState } from "react";
import { AppWrapper } from "@src/components/DefaultWrapper";
import { NewPost, Post, SuggestHousing } from "./components";
import { apiHelper } from "@src/helpers";
import { api } from "@src/constants";

const HomeScreen = (): JSX.Element => {
  const [publishPostData, setPublishPostData] = useState<Post[]>([]);

  useEffect(() => {
    const getPublishPost = async () => {
      const params = {
        page: 0,
        size: 8,
      };
      const dataRes = await apiHelper.get<Post[]>(api.GET_PUBLISH_POST, params);
      console.log(dataRes);
      setPublishPostData(dataRes);
    };
    getPublishPost();
  }, []);

  return (
    <AppWrapper>
      <NewPost data={publishPostData} />
      <SuggestHousing data={publishPostData} />
    </AppWrapper>
  );
};

export { HomeScreen };
