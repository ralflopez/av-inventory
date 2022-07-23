import { Toolbar } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { drawerWidth } from "../../constants"

export const BodyContainer = ({ children }: any) => {
  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />
      {children}
    </Box>
  )
}
