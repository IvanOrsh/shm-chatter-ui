import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AddCircle from "@mui/icons-material/AddCircle";

type ChatListHeaderProps = {
  handleAddChat: () => void;
};

export default function ChatListHeader(props: ChatListHeaderProps) {
  const { handleAddChat } = props;

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          onClick={handleAddChat}
        >
          <AddCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
