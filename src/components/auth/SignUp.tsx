import { Link } from "react-router-dom";

import { Auth } from "./Auth";

export function SignUp() {
  return (
    <Auth submitLabel="Sign Up" onSubmit={async () => {}}>
      <Link to={"/login"}>Already have an account?</Link>
    </Auth>
  );
}
