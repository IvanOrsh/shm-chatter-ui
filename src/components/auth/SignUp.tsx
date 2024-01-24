import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";

import { Auth } from "./Auth";

export function SignUp() {
  return (
    <Auth submitLabel="Sign Up" onSubmit={async () => {}}>
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <MUILink>Already have an account?</MUILink>
      </Link>
    </Auth>
  );
}
