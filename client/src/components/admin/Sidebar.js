import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Dashboard, Group, Psychology } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      sx={{
        // width: 200,
        // height: "100vh",
        // position: "fixed",
        // top: 70,
        // left: 0,
        backgroundColor: "#e9f5e6",
        // boxShadow: 2,
        // p: 2,
      }}
    >
      <List>
        <ListItemButton component={Link} to="dashboard">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="">
          <ListItemIcon>
            <Psychology />
          </ListItemIcon>
          <ListItemText primary="Challenges" />
        </ListItemButton>
        <ListItemButton component={Link} to="users">
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
