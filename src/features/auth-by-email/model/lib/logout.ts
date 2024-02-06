import { router } from "@app/providers/router";
import { authenticatedVar } from "@shared/config/apolloClientConfig/reactive-vars/authenticated-var";
import { client } from "@shared/config/apolloClientConfig/apollo-client";

export const onLogout = () => {
  authenticatedVar(false);
  router.navigate("/login");
  client.resetStore();
};
