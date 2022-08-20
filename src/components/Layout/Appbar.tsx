import { Avatar, Box, Button, Divider, Popover, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useBranchStore } from '../../store/branchStore';

export const Appbar = () => {
const branch = useBranchStore()
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined;

  return (
    <>
    <Toolbar>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <Button onClick={handleClick}>
            <Typography variant="subtitle2" color="primary">{branch.name}</Typography>
            <ArrowDropDownIcon color="primary"/>
          </Button>
          {/* <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            PaperProps={{
              variant: 'outlined'
            }}
          >
            <Typography sx={{ p: 2 }}>{branch.name}</Typography>
          </Popover> */}
          <Box>
            <Avatar sx={{width: '35px', height: '35px', fontSize: '1.2rem'}}>A</Avatar>
          </Box>
        </Box>
      </Toolbar>
      <Divider />
    </>
  )
}
