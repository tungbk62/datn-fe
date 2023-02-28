import React, { Fragment } from "react";
import { PostDetailScreen} from '@app-client/screens'
export default PostDetailScreen
export const getServerSideProps = async(context:any)=>{
  return {
      props:{
          router:context.query,
      }
  }
}