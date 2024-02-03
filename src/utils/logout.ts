import { router } from "@app/providers/router";
import { authenticatedVar } from "@app/providers/apollo";
import { client } from "@shared/config/apolloClientConfig/apollo-client";

export const onLogout = () => {
  authenticatedVar(false);
  router.navigate("/login");
  client.resetStore();
};
