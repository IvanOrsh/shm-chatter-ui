import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { API_URL } from "@shared/constants/urls";
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

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});
