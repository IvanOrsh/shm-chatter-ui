import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";

import { Auth } from "./Auth";

export function Login() {
  return (
    <Auth submitLabel="Log in" onSubmit={async () => {}}>
      <Link to={"/signup"} style={{ alignSelf: "center" }}>
        <MUILink>Don't have an account?</MUILink>
      </Link>
    </Auth>
  );
}
