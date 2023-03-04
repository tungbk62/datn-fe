import { UserDetailScreen } from "@screens/UserDetailScreen";

export default UserDetailScreen;

export const getServerSideProps = async (context: any) => {
  return {
    props: {
      router: context.query,
    },
  };
};
