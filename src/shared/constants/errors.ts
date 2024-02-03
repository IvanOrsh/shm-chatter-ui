import { SnackMessage } from "@widgets/snackbar";

export const UNKNOWN_ERROR_MESSAGE =
  "An unknown error has occurred. Please try again later.";
export const UNKNOWN_ERROR_SNACK_MESSAGE: SnackMessage = {
  message: UNKNOWN_ERROR_MESSAGE,
  type: "error",
};
