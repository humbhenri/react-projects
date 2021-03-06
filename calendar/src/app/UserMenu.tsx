import { Avatar, Icon, IconButton, Menu, MenuItem } from "@material-ui/core";
import { Box } from "@material-ui/system";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useAuthContext } from "./authContext";

const useStyles = makeStyles({
  user: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderBottom: "1px solid rgb(224, 224, 224)",
  },
});

const UserMenu = React.memo(function UserMenu() {
  console.log("UserMenu");
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user, onSignout } = useAuthContext();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Box className={classes.user}>
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
            <div>{user.name}</div>
            <div>
              <small>{user.email}</small>
            </div>
          </Box>
          <MenuItem onClick={onSignout}>Logout</MenuItem>
        </Menu>
      </IconButton>
    </div>
  );
});

export default UserMenu;
