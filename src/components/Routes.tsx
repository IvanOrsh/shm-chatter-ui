import { createBrowserRouter } from "react-router-dom";

import { SignUp } from "./auth/SignUp";
import { Login } from "./auth/Login";
import Home from "./home/Home";

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
