import { useQuery } from "@apollo/client";
import { graphql } from "@gql/gql";

// import { User } from "@entities/User";

const getMeDocument = graphql(`
  query Me {
    me {
      _id
      email
    }
  }
`);

export const useGetMe = () => {
  return useQuery(getMeDocument);
};
