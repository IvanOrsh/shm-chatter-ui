import { useCallback, useState } from "react";

import { snackVar } from "@shared/config/apolloClientConfig/reactive-vars/snack-var";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "@shared/constants/errors";
import { API_URL } from "@shared/constants/urls";

export const useCountChats = () => {
  const [chatsCount, setChatsCount] = useState<number | undefined>();

  const countChats = useCallback(async () => {
    const res = await fetch(`${API_URL}/chats/count`);

    if (!res.ok) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    } else {
      setChatsCount(parseInt((await res.text()) as string, 10));
    }
  }, []);

  return {
    countChats,
    chatsCount,
  };
};
