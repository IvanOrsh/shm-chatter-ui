import { useState } from "react";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import ChatListItem from "./chat-list-item/ChatListItem";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { ChatListAdd } from "@features/add-chat";
import { useGetChats } from "../model/hooks/useGetChats";

export default function ChatList() {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);

  const { data } = useGetChats();

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

        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          {data?.chats.map((chat) => (
            <ChatListItem key={chat._id} name={chat.name} />
          ))}
        </List>
      </Stack>
    </>
  );
}