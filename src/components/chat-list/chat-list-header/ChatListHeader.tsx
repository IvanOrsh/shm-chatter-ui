import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AddCircle from "@mui/icons-material/AddCircle";

export default function ChatListHeader() {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit">
          <AddCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
