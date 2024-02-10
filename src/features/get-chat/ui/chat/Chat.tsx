import { useState } from "react";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";

import { useGetChat } from "@features/get-chat/model/hooks/useGetChat";
import { useCreateMessage } from "@features/get-chat/model/hooks/useCreateMessage";
import { useGetMessages } from "@features/get-chat/model/hooks/useGetMessages";

export default function Chat() {
  const params = useParams();
  const chatId = params._id;
  const [message, setMessage] = useState("");
  const { data } = useGetChat({ _id: chatId! });
  const [createMessage] = useCreateMessage(chatId!);
  const { data: messages } = useGetMessages({ chatId: chatId! });

  const handleCreateMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: {
          content: message,
          chatId: chatId!,
        },
      },
    });
    setMessage("");
  };

  return (
    <Stack
      sx={{
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <h1>{data?.chat.name}</h1>

      <Box>
        {messages?.messages.map((message) => (
          <p key={message._id}>{message.content}</p>
        ))}
      </Box>

      {/* message bar */}
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await handleCreateMessage();
            }
          }}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          onClick={handleCreateMessage}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
}
