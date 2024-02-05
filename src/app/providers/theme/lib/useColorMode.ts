import { useState, useMemo } from "react";
import { createTheme } from "@mui/material";

export function useColorMode() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                color: "skyblue",
              },
            },
          },
        },
      }),
    [mode]
  );
  return { colorMode, theme };
}
