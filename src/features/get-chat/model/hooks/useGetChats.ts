import { useQuery } from "@apollo/client";
import { graphql } from "@gql/gql";

export const getChatsDocument = graphql(`
  query Chats {
    chats {
      ...ChatFragment
    }
  }
`);

export const useGetChats = () => {
  return useQuery(getChatsDocument);
};
