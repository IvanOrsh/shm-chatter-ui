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

import { useCreateChat } from "../model/hooks/useCreateChat";
import { UNKNOWN_ERROR_MESSAGE } from "@shared/constants/errors";
import { router } from "@app/providers/router";

type ChatListAddProps = {
  open: boolean;
  handleClose: () => void;
};

export default function ChatListAdd(props: ChatListAddProps) {
  const { open, handleClose } = props;

  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const [createChat] = useCreateChat();

  const onClose = () => {
    setError("");
    setIsPrivate(false);
    setName("");
    handleClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
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
                  defaultChecked={isPrivate}
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
            <TextField
              label="Name"
              error={!!error}
              helperText={error}
              onChange={(event) => setName(event.target.value)}
            />
          )}
          <Button
            variant="outlined"
            onClick={async () => {
              if (!name.length) {
                setError("Chat name is required");
                return;
              }

              try {
                const chat = await createChat({
                  variables: {
                    createChatInput: {
                      isPrivate,
                      name: name || undefined,
                    },
                  },
                });
                onClose();
                router.navigate(`/chats/${chat.data?.createChat._id}`);
              } catch (err) {
                setError(UNKNOWN_ERROR_MESSAGE);
              }
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
