import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { Auth } from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";

export function SignUp() {
  const [createUser] = useCreateUser();

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await createUser({
      variables: {
        createUserInput: {
          email,
          password,
        },
      },
    });
  };

  return (
    <Auth submitLabel="Sign Up" onSubmit={onSubmit}>
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <Button variant="text" color="secondary">
          Already have an account?
        </Button>
      </Link>
    </Auth>
  );
}
