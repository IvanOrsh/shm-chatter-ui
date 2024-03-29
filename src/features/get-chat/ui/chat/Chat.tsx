import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { useGetChat } from "@features/get-chat/model/hooks/useGetChat";
import { useCreateMessage } from "@features/get-chat/model/hooks/useCreateMessage";
import { useGetMessages } from "@features/get-chat/model/hooks/useGetMessages";
import { PAGE_SIZE } from "@shared/constants/pagination/page-size";
import { useCountMessages } from "@features/get-chat/model/hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroller";

export default function Chat() {
  const params = useParams();
  const location = useLocation();
  const chatId = params._id;
  const [message, setMessage] = useState("");
  const { countMessages, messagesCount } = useCountMessages(chatId!);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  const { data } = useGetChat({ _id: chatId! });
  const [createMessage] = useCreateMessage();

  // already existing messages for this chat:
  const { data: messages, fetchMore } = useGetMessages({
    chatId: chatId!,
    skip: 0,
    limit: PAGE_SIZE,
  });

  const divRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    divRef.current?.scrollIntoView();
  };

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
    scrollToBottom();
  };

  useEffect(() => {
    if (messages?.messages && messages.messages.length <= PAGE_SIZE) {
      setMessage("");
      scrollToBottom();
    }
  }, [location, messages]);

  return (
    <Stack
      sx={{
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <h1>{data?.chat.name}</h1>

      <Box
        sx={{
          maxHeight: "70vh",
          overflow: "auto",
        }}
      >
        <InfiniteScroll
          pageStart={0}
          isReverse={true}
          loadMore={() =>
            fetchMore({
              variables: {
                chatId: chatId!,
                skip: messages?.messages.length || 0,
                limit: PAGE_SIZE,
              },
            })
          }
          hasMore={
            messages && messagesCount
              ? messages.messages.length < messagesCount
              : false
          }
          useWindow={false}
        >
          {messages &&
            [...messages.messages]
              .sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              )
              .map((message) => (
                <Grid
                  container
                  alignItems="center"
                  marginBottom="1rem"
                  key={message._id}
                >
                  <Grid item xs={2} lg={1}>
                    <Avatar
                      src=""
                      sx={{
                        height: "52px",
                        width: "52px",
                      }}
                    />
                  </Grid>

                  <Grid item xs={10} lg={11}>
                    <Stack>
                      <Paper sx={{ width: "fit-content" }}>
                        <Typography sx={{ padding: "0.9rem" }}>
                          {message.content}
                        </Typography>
                      </Paper>
                      <Typography variant="caption" sx={{ ml: "0.25rem" }}>
                        {new Date(message.createdAt).toLocaleTimeString()} -{" "}
                        {new Date(message.createdAt).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
          {/* scroll to most recent message */}
          <div ref={divRef}></div>
        </InfiniteScroll>
      </Box>

      {/* message bar */}
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0",
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
