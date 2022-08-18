import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material"
import { useState } from "react"
import { drawerWidth } from "../../constants/appbar"
import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton"
import { Sidebar } from "./Sidebar"

export const MainAppBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      <AppBar
        color='primary'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          position: {
            xs: "fixed",
            sm: "absolute",
          },
          display: {
            sm: 'none'
          }
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div'>
            Altrosof Ventures
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme.palette.primary.main
            },
          }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme.palette.primary.main
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>
    </>
  )
}
