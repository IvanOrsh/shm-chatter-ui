import { createBrowserRouter } from "react-router-dom";

import { Home } from "@pages/Home";
import { SignUp } from "@features/auth-by-email";
import { Login } from "@features/auth-by-email";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
