import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { Auth } from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";
import { extractApolloErrorMessage } from "../../utils/error";

export function SignUp() {
  const [error, setError] = useState("");
  const [createUser] = useCreateUser();

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
            password,
          },
        },
      });
      setError("");
    } catch (err) {
      const errorMessage = extractApolloErrorMessage(err);
      if (errorMessage) {
        setError(errorMessage);
        return;
      }

      setError("Unknown error occurred");
    }
  };

  return (
    <Auth submitLabel="Sign Up" onSubmit={onSubmit} error={error}>
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <Button variant="text" color="secondary">
          Already have an account?
        </Button>
      </Link>
    </Auth>
  );
}
