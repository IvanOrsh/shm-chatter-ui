import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

import { API_URL, WS_URL } from "@shared/constants/urls";
import { excludedRoutes } from "@app/providers/router";
import { onLogout } from "@features/auth-by-email";

const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error.graphQLErrors[0].extensions.originalError as any)?.statusCode === 401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WS_URL}/graphql`,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink, // if function above is true
  httpLink
);

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          chats: {
            keyArgs: false,
            merge,
          },

          messages: {
            keyArgs: ["chatId"],
            merge,
          },
        },
      },
    },
  }),
  link: logoutLink.concat(splitLink),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function merge(existing: any, incoming: any, { args }: any) {
  const merged = existing ? existing.slice(0) : [];
  for (let i = 0; i < incoming.length; i += 1) {
    merged[args?.skip + i] = incoming[i];
  }
  return merged;
}
