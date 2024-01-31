import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { Auth } from "./Auth";
import { useLogin } from "../../hooks/useLogin";

export function Login() {
  const { login, error } = useLogin();

  return (
    <Auth
      submitLabel="Log in"
      onSubmit={(request) => login(request)}
      error={error}
    >
      <Link to={"/signup"} style={{ alignSelf: "center" }}>
        <Button variant="text" color="secondary">
          Don't have an account?
        </Button>
      </Link>
    </Auth>
  );
}
