import React from 'react';
import { Divider, Drawer, List, Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import img_candidate from '../assets/image/candidate.png';
import img_license from '../assets/image/license-plate.png';
import img_home from '../assets/image/home.png';
import { Link } from 'react-router-dom';

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

export default function TheNavigator(props) {
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

      <Link style={{ textDecoration: "none" }} to="/">
        <ListItem disablePadding>
          <ListItemButton sx={sidebar}>
            <img src={img_home} style={{ width: '12%', height: '12%' }} />
            <ListItemText sx={{ margin: "auto", ml: 3 }}> หน้าแรก </ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>

      <ListItem disablePadding>
        <ListItemButton sx={sidebar}>
          <img src={img_candidate} style={{ width: '12%', height: '12%' }} />
          <ListItemText sx={{ margin: "auto", ml: 3 }}> ค้นหาป้ายทะเบียน </ListItemText>
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton sx={sidebar}>
          <img src={img_license} style={{ width: '12%', height: '12%' }} />
          <ListItemText sx={{ margin: "auto", ml: 3 }}> ค้นหาบุคคล </ListItemText>
        </ListItemButton>
      </ListItem>

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