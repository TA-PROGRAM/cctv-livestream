import React from "react"
import { AppBar, Avatar, Grid, Toolbar } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import avatar from "../assets/image/ThaiAkitech.png"
import Tooltip from "@mui/material/Tooltip"
import MenuIcon from "@mui/icons-material/Menu"

const TheHeader = (props) => {
  const { onDrawerToggle } = props
  const serialized = localStorage.getItem("session-user")
  const parsedData = JSON.parse(serialized)
  if (parsedData && parsedData.username) {
  } else {
    console.log("Username not found")
  }
  return (
    <React.Fragment>
      <AppBar color="primary" position="relative" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton color="inherit" aria-label="open drawer" onClick={onDrawerToggle} edge="start">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">{parsedData.username}</IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src={avatar} alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default TheHeader
