import React from 'react';
import { AppBar, Avatar, Grid, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import avatar from '../assets/image/ThaiAkitech.png'
const TheHeader = (props) => {
    const { onDrawerToggle } = props;

    return (
        <>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs />
                        <Grid item>
                            <Typography color="inherit" variant="h5" component="h1">
                                อุ้มหลอง
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" sx={{ p: 0.5 }}>
                                <Avatar src={avatar} alt="My Avatar" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default TheHeader;
