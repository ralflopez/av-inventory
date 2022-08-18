import { Toolbar, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { drawerWidth } from "../../constants"

export const BodyContainer = ({ children }: any) => {
  const theme = useTheme()

  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        paddingTop: { sm: theme.spacing(5) },
        paddingBottom: theme.spacing(5)
      }}
    >
      <Toolbar sx={{display: {sm: 'none'}}} />
      {children}
    </Box>
  )
}
