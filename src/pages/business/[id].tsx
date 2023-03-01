import React, { Fragment } from "react";
import { UserDetailScreen} from '@app-client/screens'
export default UserDetailScreen
export const getServerSideProps = async(context:any)=>{
  return {
      props:{
          router:context.query,
      }
  }
}