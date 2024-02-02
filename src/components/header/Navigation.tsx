import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type NavigationProps = {
  pages: string[];
};

export default function Navigation(props: NavigationProps) {
  const { pages } = props;

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
          {page}
        </Button>
      ))}
    </Box>
  );
}
