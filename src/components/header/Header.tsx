import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import Branding from "./Branding";
import MobileNav from "./mobile/MobileNav";
import MobileBranding from "./mobile/MobileBranding";
import Navigation from "./Navigation";
import Settings from "./Settings";

const pages: string[] = [];

export default function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO */}
          <Branding />

          {/* Mobile Navigation */}
          <MobileNav pages={pages} />

          {/* Mobile Branding */}
          <MobileBranding />

          {/* Desktop Navigation */}
          <Navigation pages={pages} />

          {/* Settings */}
          <Settings />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
