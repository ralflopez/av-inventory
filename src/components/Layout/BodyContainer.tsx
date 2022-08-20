import { Box } from "@mui/system"
import { drawerWidth } from "../../constants"
import { Appbar } from "./Appbar"

export const BodyContainer = ({ children }: any) => {

  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        padding: 0,
      }}
    >
      <Appbar />
      <Box pt={2} pb={5} pl={3} pr={3}>
        {children}
      </Box>
    </Box>
  )
}
