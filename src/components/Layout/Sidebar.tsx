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

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {featurePages.map(({ name, Icon, path }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton onClick={() => navigate(path)}>
              <ListItemIcon>
                <Icon
                  color={location.pathname === path ? "primary" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    variant='body2'
                    style={
                      location.pathname === path
                        ? {
                            color: theme.palette.primary.main,
                          }
                        : {}
                    }
                  >
                    {name}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {infoPages.map(({ name, path }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton onClick={() => navigate(path)}>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    variant='body2'
                    style={
                      location.pathname === path
                        ? {
                            color: theme.palette.primary.main,
                          }
                        : {}
                    }
                  >
                    {name}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}
