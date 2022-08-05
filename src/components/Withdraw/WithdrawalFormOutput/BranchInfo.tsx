import React from "react"
import { Box } from "@mui/system"
import { SvgIconTypeMap, Typography } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"

interface Props {
  text: string
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string
  }
}

export const BranchInfo = ({ text, Icon }: Props) => {
  return (
    <Box display='flex' alignItems='center'>
      <Icon color='primary' sx={{ width: "8pt", height: "8pt" }} />
      <Typography ml={1} fontSize='8pt'>
        {text}
      </Typography>
    </Box>
  )
}
