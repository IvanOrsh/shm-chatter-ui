import { useEffect, useState } from "react";

import { router } from "@app/providers/router";

export const usePath = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    router.subscribe((state) => setPath(state.location.pathname));
  }, []);

  return { path };
};
