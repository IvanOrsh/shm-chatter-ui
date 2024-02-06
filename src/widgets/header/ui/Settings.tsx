import { useState, MouseEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";

import { useLogout } from "@features/auth-by-email/model/hooks/useLogout";
import { onLogout } from "../../../utils/logout";
import { snackVar } from "@shared/config/apolloClientConfig/reactive-vars/snack-var";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "@shared/constants/errors";

export default function Settings() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { logout } = useLogout();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          key={"logout"}
          onClick={async () => {
            try {
              await logout();
              onLogout();
              handleCloseUserMenu();
            } catch (err) {
              snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
            }
          }}
        >
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
