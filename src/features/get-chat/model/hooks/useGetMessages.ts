import { useQuery } from "@apollo/client";

import { graphql } from "@gql/gql";
import { MessagesQueryVariables } from "@gql/graphql";

export const getMessagesDocument = graphql(`
  query Messages($chatId: String!, $skip: Int!, $limit: Int!) {
    messages(chatId: $chatId, skip: $skip, limit: $limit) {
      ...MessageFragment
    }
  }
`);

export const useGetMessages = (variables: MessagesQueryVariables) => {
  return useQuery(getMessagesDocument, {
    variables,
  });
};
