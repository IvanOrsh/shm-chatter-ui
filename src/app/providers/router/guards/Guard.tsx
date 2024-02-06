import { PropsWithChildren, useEffect } from "react";

import { excludedRoutes } from "../config/excluded-routes";
import { usePath } from "../lib/hooks/usePath";
import { useGetMe } from "@features/auth-by-email";
import { authenticatedVar } from "@shared/config/apolloClientConfig/reactive-vars/authenticated-var";
import { snackVar } from "@shared/config/apolloClientConfig/reactive-vars/snack-var";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "@shared/constants/errors";

export function Guard({ children }: PropsWithChildren) {
  const { data: user, error } = useGetMe();
  const { path } = usePath();

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

  return <>{excludedRoutes.includes(path) ? children : user && children}</>;
}
