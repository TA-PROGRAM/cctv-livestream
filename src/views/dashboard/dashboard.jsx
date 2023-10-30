import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function TheContent() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <Item>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                จำนวน site โครงการทั้งหมด
              </Typography>
              <Typography variant="h5" component="div">
                84 โครงการ
              </Typography>
            </CardContent>
          </Item>
        </Grid>
        <Grid item sm={4}>
          <Item>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                จำนวนกล้องทั้งหมด
              </Typography>
              <Typography variant="h5" component="div">
                630 กล้อง
              </Typography>
            </CardContent>
          </Item>
        </Grid>
        <Grid item sm={4}>
          <Item>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                จำนวนกล่อง online  จำนวนกล้อง offline
              </Typography>
              <Typography variant="h5" component="div">
                601     29
              </Typography>
            </CardContent>
          </Item>
        </Grid>
        <Grid item sm={5}>
          <Item>xs=6</Item>
        </Grid>
        <Grid item sm={7}>
          <Item>xs</Item>
        </Grid>
      </Grid>
    </Box>


  );
}
