import { useQuery } from "@apollo/client";

import { graphql } from "@gql/gql";
import { MessagesQueryVariables } from "@gql/graphql";

const getMessagesDocument = graphql(`
  query Messages($chatId: String!) {
    messages(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

export const useGetMessages = (variables: MessagesQueryVariables) => {
  return useQuery(getMessagesDocument, {
    variables,
  });
};