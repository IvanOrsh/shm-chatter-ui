import { createContext, useContext } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useColorModeContext() {
  return useContext(ColorModeContext);
}
