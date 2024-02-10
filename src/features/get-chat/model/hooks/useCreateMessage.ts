import { useMutation } from "@apollo/client";

import { graphql } from "@gql/gql";

const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      _id
      content
      createdAt
    }
  }
`);

export const useCreateMessage = () => {
  return useMutation(createMessageDocument);
};
