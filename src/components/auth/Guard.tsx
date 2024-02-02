import { PropsWithChildren, useEffect } from "react";

import { useGetMe } from "../../hooks/useGetMe";
import { excludedRoutes } from "../../constants/excluded-routes";
import { authenticatedVar } from "../../constants/authenticated";

export function Guard({ children }: PropsWithChildren) {
  const { data: user } = useGetMe();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
}
