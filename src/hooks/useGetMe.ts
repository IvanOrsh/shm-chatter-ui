import { gql, useQuery } from "@apollo/client";

import { User } from "@entities/User";

const GET_ME = gql`
  query {
    me {
      _id
      email
    }
  }
`;

export const useGetMe = () => {
  return useQuery<{ me: User }>(GET_ME);
};
