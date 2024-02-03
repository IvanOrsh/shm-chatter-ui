import { PropsWithChildren, useEffect } from "react";

import { useGetMe } from "../../hooks/useGetMe";
import { excludedRoutes } from "@app/providers/router";
import { authenticatedVar } from "@shared/config/apolloClientConfig/reactive-vars/authenticated-var";
import { snackVar } from "@shared/config/apolloClientConfig/reactive-vars/snack-var";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "@shared/constants/errors";

export function Guard({ children }: PropsWithChildren) {
  const { data: user, error } = useGetMe();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (error && error.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
}
