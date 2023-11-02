import React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import img_candidate from '../assets/image/candidate.png';
import img_license from '../assets/image/license-plate.png';
import img_home from '../assets/image/home.png';

const categories = [
  {
    id: '',
    children: [
      { id: 'หน้าแรก', src: img_home },
      { id: 'ค้นหาป้ายทะเบียน', src: img_candidate },
      { id: 'ค้นหาบุคคล', src: img_license },
    ],
  },
];
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

  const handleMenuClickItem = (id) => {
    // if (id === 'ออกจากระบบ') {
    //   logout();
    // }
  };

  const logout = async () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 20, color: '#fff' }}>
          CCTV Live Streaming
        </ListItem>
       
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, src }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton onClick={() => handleMenuClickItem(childId)} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <img
                    src={src}
                    alt={childId}
                    style={{
                      width: '12%',
                      height: '12%',
                      marginRight: '1rem', 
                      color:"white",
                      padding:"2px",
                      marginBottom:"2px"
                    }}
                  />
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
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
            // bgcolor: "#101F33",
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