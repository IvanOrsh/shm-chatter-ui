import { makeVar } from "@apollo/client";

import { SnackMessage } from "@widgets/snackbar";

export const snackVar = makeVar<SnackMessage | undefined>(undefined);
