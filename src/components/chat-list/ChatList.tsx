import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import ChatListItem from "./chat-list-item/ChatListItem";
import ChatListHeader from "./chat-list-header/ChatListHeader";

export default function ChatList() {
  return (
    <Stack>
      <ChatListHeader />

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
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
      </List>
    </Stack>
  );
}
