import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { useReactiveVar } from "@apollo/client";
import { useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useColorModeContext } from "@app/providers/theme";
import Branding from "./Branding";
import MobileNav from "./mobile/MobileNav";
import MobileBranding from "./mobile/MobileBranding";
import Navigation from "./Navigation";
import Settings from "./Settings";
import { authenticatedVar } from "@shared/config/apolloClientConfig/reactive-vars/authenticated-var";
import type { Page } from "../../../interfaces/page";

const pages: Page[] = [
  {
    title: "Home",
    path: "/",
  },
];

const unauthenticatedPages: Page[] = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Sign Up",
    path: "/signup",
  },
];

export default function Header() {
  const authenticated = useReactiveVar(authenticatedVar);
  const colorMode = useColorModeContext();
  const theme = useTheme();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO */}
          <Branding />

          {/* Mobile Navigation */}
          <MobileNav pages={authenticated ? pages : unauthenticatedPages} />

          {/* Mobile Branding */}
          <MobileBranding />

          {/* Desktop Navigation */}
          <Navigation pages={authenticated ? pages : unauthenticatedPages} />

          {/* TODO: extract to a separate component */}
          <IconButton
            color="inherit"
            onClick={colorMode.toggleColorMode}
            sx={{ mr: 2 }}
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>

          {/* Settings */}
          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
