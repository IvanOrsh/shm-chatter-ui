import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Auth } from "./Auth";
import { useCreateUser } from "../model/hooks/useCreateUser";
import { extractApolloErrorMessage } from "@shared/config/apolloClientConfig/lib/error";
import { useLogin } from "../model/hooks/useLogin";
import { UNKNOWN_ERROR_MESSAGE } from "@shared/constants/errors";

export function SignUp() {
  const [error, setError] = useState("");
  const [createUser] = useCreateUser();
  const [username, setUsername] = useState("");
  const { login } = useLogin();

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await createUser({
        variables: {
          createUserInput: {
            email,
            username,
            password,
          },
        },
      });
      // redirect to home using login
      await login({ email, password });

      setError("");
    } catch (err) {
      const errorMessage = extractApolloErrorMessage(err);
      if (errorMessage) {
        setError(errorMessage);
        return;
      }

      setError(UNKNOWN_ERROR_MESSAGE);
    }
  };

  return (
    <Auth
      submitLabel="Sign Up"
      onSubmit={onSubmit}
      error={error}
      extraFields={[
        <TextField
          type="text"
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          error={!!error}
          helperText={error}
        />,
      ]}
    >
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <Button variant="text" color="secondary">
          Already have an account?
        </Button>
      </Link>
    </Auth>
  );
}
