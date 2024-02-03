import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import type { Page } from "../../interfaces/page";
import { router } from "@app/providers/router";

type NavigationProps = {
  pages: Page[];
};

export default function Navigation(props: NavigationProps) {
  const { pages } = props;

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page.title}
          sx={{ my: 2, color: "white", display: "block" }}
          onClick={() => router.navigate(page.path)}
        >
          {page.title}
        </Button>
      ))}
    </Box>
  );
}
