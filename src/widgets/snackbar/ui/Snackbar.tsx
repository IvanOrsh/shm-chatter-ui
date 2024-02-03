import * as React from "react";
import MUISnackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useReactiveVar } from "@apollo/client";

import { snackVar } from "@shared/config/apolloClientConfig/reactive-vars/snack-var";

export default function Snackbar() {
  const snack = useReactiveVar(snackVar);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    snackVar(undefined);
  };

  return (
    <>
      {snack && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          <MUISnackbar
            open={!!snack}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snack.type}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snack.message}
            </Alert>
          </MUISnackbar>
        </Stack>
      )}
    </>
  );
}
