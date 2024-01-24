import { Link } from "react-router-dom";
import { Auth } from "./Auth";

export function Login() {
  return (
    <Auth submitLabel="Log in" onSubmit={async () => {}}>
      <Link to={"/signup"}>Don't have an account?</Link>
    </Auth>
  );
}
