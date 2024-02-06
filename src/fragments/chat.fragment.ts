import { graphql } from "@gql/gql";

graphql(`
  fragment ChatFragment on Chat {
    _id
    userId
    isPrivate
    userIds
    name
  }
`);
