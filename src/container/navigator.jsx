import React, { useState, useEffect } from "react"
import { Divider, Drawer, List, Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import accessMenu from "./menu";

const Logout = [
  {
    id: 'เมนู',
    name: [
      { id: 'ออกจากระบบ', icon: <LogoutIcon /> },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const sidebar = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
  marginTop: '1rem',
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

const styles = {
  listItem: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
};

export default function TheNavigator(props, PERMISSIONS, USER) {
  const [menuItems, setMenuItems] = useState(accessMenu({ PERMISSIONS }));

  useEffect(() => {
    fetchData();
  }, [PERMISSIONS, USER]);


  const fetchData = async () => {
    try {
      setMenuItems(accessMenu({ PERMISSIONS, USER }));
    } catch (error) { }
  }

  const { ...other } = props;

  const handleMenuClick = (id) => {
    if (id === 'ออกจากระบบ') {
      logout();
    }
  };

  const logout = async () => {
    localStorage.clear();
    window.location.reload();
  };



  return (
    <Drawer variant="permanent" {...other}>
      <Link style={{ textDecoration: "none" }} to="/">
        <List disablePadding>
          <ListItem sx={{ ...itemCategory, fontSize: 20, color: '#fff' }}>
            CCTV Live Streaming
          </ListItem>
        </List>
      </Link>

      <List disablePadding>
        {menuItems.map((item, index) => (
          <ListItem disablePadding key={index} sx={styles.listItem}>
            <Link to={item.to} style={{ textDecoration: "none", color: "white" }}>
              <ListItemButton sx={{ width: "100%" }}>
                {item.icon ? (
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                ) : (
                  <img src={item.src} alt={item.name} style={styles.image} />
                )}
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      {Logout.map(({ id, name }) => (
        <Box
          key={id}
          sx={{
            position: "fixed",
            bottom: 10,
            left: 0,
            width: 256,
          }}
        >
          <Divider sx={{ mb: 2 }} />
          {name.map(({ id: log_out, icon }) => (
            <ListItem disablePadding key={log_out}>
              <ListItemButton onClick={() => handleMenuClick(log_out)} sx={item}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{log_out}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      ))}
    </Drawer>
  );
}