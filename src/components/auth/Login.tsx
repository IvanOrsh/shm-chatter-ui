import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { Auth } from "./Auth";

export function Login() {
  return (
    <Auth submitLabel="Log in" onSubmit={async () => {}}>
      <Link to={"/signup"} style={{ alignSelf: "center" }}>
        <Button variant="text" color="secondary">
          Don't have an account?
        </Button>
      </Link>
    </Auth>
  );
}
