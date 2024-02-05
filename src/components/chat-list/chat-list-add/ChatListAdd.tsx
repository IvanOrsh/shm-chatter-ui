import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type ChatListAddProps = {
  open: boolean;
  handleClose: () => void;
};

export default function ChatListAdd(props: ChatListAddProps) {
  const { open, handleClose } = props;

  const [isPrivate, setIsPrivate] = useState(true); // private by default

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,

          bgcolor: "background.paper",
          // border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            Add Chat
          </Typography>
          <FormGroup>
            <FormControlLabel
              style={{
                width: 0,
              }}
              control={
                <Switch
                  defaultChecked
                  value={isPrivate}
                  onChange={(event) => setIsPrivate(event.target.checked)}
                />
              }
              label="Private"
            />
          </FormGroup>
          {isPrivate ? (
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                }}
                placeholder="Search Users"
              />
              <IconButton
                sx={{
                  p: "10px",
                }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          ) : (
            <TextField label="Name" />
          )}
          <Button variant="outlined">Save</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
