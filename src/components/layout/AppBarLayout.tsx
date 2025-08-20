"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { useThemeMode } from "@/context/ThemeModeContext";
import { useI18n } from "@/context/I18nContext"; 

type AppBarLayoutProps = {
  children: React.ReactNode;
};

export default function AppBarLayout({ children }: AppBarLayoutProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const { toggleMode } = useThemeMode();
  const { t } = useI18n(); 

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;

  const drawer = (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
      onClick={() => setMobileOpen(false)}
    >
      <Typography variant="h6" sx={{ m: 2 }}>
        {t("eduly")} 
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary={t("dashboard")} /> 
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar position="fixed">
        <Toolbar>
          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo / Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {t("edulyDashboard")} 
          </Typography>

          {/* Page name on large screens */}
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: "none", sm: "block" }, mr: 2 }}
          >
            {t("dashboard")} 
          </Typography>

          {/* Dark/Light mode toggle */}
          <IconButton color="inherit" onClick={toggleMode} sx={{ mr: 1 }}>
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Profile Avatar */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar alt="User" src="/avatar.png" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>{t("profile")}</MenuItem>
            <MenuItem onClick={handleMenuClose}>{t("settings")}</MenuItem>
            <MenuItem onClick={handleMenuClose}>{t("logout")}</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Only mobile drawer */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: { xs: 7, sm: 8 },
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
