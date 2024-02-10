import { useState } from "react";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

import { useGetChat } from "@features/get-chat/model/hooks/useGetChat";
import { useCreateMessage } from "@features/get-chat/model/hooks/useCreateMessage";

export default function Chat() {
  const params = useParams();
  const chat_id = params._id;
  const [message, setMessage] = useState("");
  const { data } = useGetChat({ _id: chat_id! });
  const [createMessage] = useCreateMessage();

  return (
    <Stack
      sx={{
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <h1>{data?.chat.name}</h1>

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
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          onClick={() => {
            createMessage({
              variables: {
                createMessageInput: {
                  content: message,
                  chatId: chat_id!,
                },
              },
            });
          }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
}
