import React, { Fragment } from "react";
import { PostDetailScreen } from "@src/screens";
export default PostDetailScreen;
export const getServerSideProps = async (context: any) => {
  return {
    props: {
      router: context.query,
    },
  };
};
