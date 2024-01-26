import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { Auth } from "./Auth";

export function SignUp() {
  return (
    <Auth submitLabel="Sign Up" onSubmit={async () => {}}>
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <Button variant="text" color="secondary">
          Already have an account?
        </Button>
      </Link>
    </Auth>
  );
}
