import { useCallback, useState } from "react";

import { snackVar } from "@shared/config/apolloClientConfig/reactive-vars/snack-var";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "@shared/constants/errors";
import { API_URL } from "@shared/constants/urls";

export const useCountMessages = (chatId: string) => {
  const [messagesCount, setMessagesCount] = useState<number | undefined>();

  const countMessages = useCallback(async () => {
    const res = await fetch(`${API_URL}/messages/count?chatId=${chatId}`);

    if (!res.ok) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    } else {
      const { messages } = await res.json();
      setMessagesCount(messages);
    }
  }, [chatId]);

  return {
    countMessages,
    messagesCount,
  };
};
