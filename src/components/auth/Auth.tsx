import { Button, Stack, TextField } from "@mui/material";
import { PropsWithChildren, useState } from "react";

type AuthProps = {
  submitLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  error?: string;
};

export function Auth(props: PropsWithChildren<AuthProps>) {
  const { submitLabel, onSubmit, error, children } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: {
          sm: "70%",
          md: "30%",
        },
        marginInline: "auto",
        justifyContent: "center",
      }}
    >
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        error={!!error}
        helperText={error}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        error={!!error}
        helperText={error}
      />
      <Button variant="contained" onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
}
