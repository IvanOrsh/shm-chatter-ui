import { PropsWithChildren, createContext } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";

import { useColorMode } from "../lib/useColorMode";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ThemeProvider({ children }: PropsWithChildren) {
  const { colorMode, theme } = useColorMode();

  return (
    <MuiThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorMode}>
        <CssBaseline />
        {children}
      </ColorModeContext.Provider>
    </MuiThemeProvider>
  );
}
