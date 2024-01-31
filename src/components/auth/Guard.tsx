import { PropsWithChildren } from "react";

import { useGetMe } from "../../hooks/useGetMe";
import { excludedRoutes } from "../../constants/excluded-routes";

export function Guard({ children }: PropsWithChildren) {
  const { data: user } = useGetMe();

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
}
