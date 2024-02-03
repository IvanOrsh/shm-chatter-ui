import { router } from "@app/providers/router";
import client from "../constants/apollo-client";
import { authenticatedVar } from "../constants/authenticated";

export const onLogout = () => {
  authenticatedVar(false);
  router.navigate("/login");
  client.resetStore();
};
