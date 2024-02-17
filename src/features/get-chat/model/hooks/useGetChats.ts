import { useQuery } from "@apollo/client";
import { graphql } from "@gql/gql";
import { QueryChatsArgs } from "@gql/graphql";

export const getChatsDocument = graphql(`
  query Chats($skip: Int!, $limit: Int!) {
    chats(skip: $skip, limit: $limit) {
      ...ChatFragment
    }
  }
`);

export const useGetChats = (args: QueryChatsArgs) => {
  return useQuery(getChatsDocument, {
    variables: args,
  });
};
