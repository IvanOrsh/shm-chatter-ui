import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import InfiniteScroll from "react-infinite-scroller";

import ChatListItem from "./chat-list-item/ChatListItem";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { ChatListAdd } from "@features/add-chat";
import { useGetChats } from "../model/hooks/useGetChats";
import { usePath } from "@app/providers/router";
import { useMessageCreated } from "../model/hooks/useMessageCreated";
import { PAGE_SIZE } from "@shared/constants/pagination/page-size";
import { useCountChats } from "../model/hooks/useCountChats";

export default function ChatList() {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data, fetchMore } = useGetChats({
    skip: 0,
    limit: PAGE_SIZE,
  });
  const { path } = usePath();
  const { countChats, chatsCount } = useCountChats();

  useEffect(() => {
    countChats();
  }, [countChats]);

  useMessageCreated({
    chatIds: data?.chats.map((chat) => chat._id) || [],
  });

  useEffect(() => {
    const pathSplit = path.split("chats/");
    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />

      <Stack>
        <ChatListHeader
          handleAddChat={() => {
            setChatListAddVisible(true);
          }}
        />

        <Divider />

        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={() => {
              fetchMore({
                variables: {
                  skip: data?.chats.length || 0,
                },
              });
            }}
            hasMore={
              data?.chats && chatsCount ? data.chats.length < chatsCount : false
            }
            useWindow={false}
          >
            <>
              {data?.chats &&
                [...data.chats]
                  .sort((a, b) => {
                    if (!a.latestMessage) {
                      return -1;
                    }
                    return (
                      new Date(a.latestMessage.createdAt).getTime() -
                      new Date(b.latestMessage?.createdAt).getTime()
                    );
                  })
                  .map((chat) => (
                    <ChatListItem
                      key={chat._id}
                      chat={chat}
                      selected={chat._id === selectedChatId}
                    />
                  ))
                  .reverse()}
            </>
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
}
