import { createBrowserRouter } from "react-router-dom";

import { Home } from "@pages/Home";
import { SignUp } from "../../../../components/auth/SignUp";
import { Login } from "../../../../components/auth/Login";

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
