import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import { featurePages, infoPages } from "../../constants"

export const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const activeBg = theme.palette.primary.dark
  const inactiveBg = 'inherit'
  const activeText = theme.palette.primary.contrastText
  const inactiveText = '#ffffffB4'

  return (
    <div>
      <Toolbar sx={{paddingTop: theme.spacing(2), paddingBottom: theme.spacing(2)}}>
        <Typography color={activeText} variant="body1" component="div">Altrosof Ventures</Typography>
      </Toolbar>
      <Divider />
      <List>
        {featurePages.map(({ name, Icon, path }) => {
          const isActive = location.pathname === path
          const bgColor = isActive ? activeBg : inactiveBg
          const textColor = isActive ? activeText : inactiveText

          return (
          <ListItem key={name} disablePadding sx={{
              backgroundColor: bgColor
            }}>
            <ListItemButton onClick={() => navigate(path)}>
              <ListItemIcon>
                <Icon
                  sx={{
                    color: textColor
                  }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    variant='body2'
                    style={{
                      color: textColor,
                      fontWeight: isActive ? 'bold' : ''
                    }}
                  >
                    {name}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        )})}
      </List>
      <Divider />
      <List>
        {infoPages.map(({ name, path, Icon }) => {
          const isActive = location.pathname === path
          const bgColor = isActive ? activeBg : inactiveBg
          const textColor = isActive ? activeText : inactiveText

          return (
          <ListItem key={name} disablePadding sx={{
            backgroundColor: bgColor
          }}>
            <ListItemButton onClick={() => navigate(path)}>
              <ListItemIcon>
                <Icon
                  sx={{
                    color: textColor
                  }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    variant='body2'
                    style={{
                      color: textColor,
                      fontWeight: isActive ? 'bold' : ''
                    }}
                  >
                    {name}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
      )})}
      </List>
    </div>
  )
}
