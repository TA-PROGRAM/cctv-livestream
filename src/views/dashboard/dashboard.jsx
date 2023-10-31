import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, CardContent, Paper, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Loading } from "../../component/customComponent"
import GLOBAL from '../../GLOBAL'
import { Map, GoogleApiWrapper } from "google-maps-react";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _fetchData();
  }, []);

  const _fetchData = (params = { pagination: loading }) => {
    setLoading(true);
    setLoading(false);
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const mapStyles = {
    width: "20%",
    height: "20%",
  };

  const { center, google } = props;

  return (
    <>
      <Loading show={loading} />
      <Box>
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <CustomPaper>
              <CardContent style={{ display: "flex" }}>
                <Typography sx={{ fontSize: 16, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                  จำนวน site โครงการทั้งหมด
                </Typography>
                <Typography sx={{ fontSize: 13 }} color="text.secondary" gutterBottom>
                  {formattedDate}AM
                </Typography>
              </CardContent>
            </CustomPaper>
          </Grid>
          <Grid item sm={4}>
            <CustomPaper>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  จำนวนกล้องทั้งหมด
                </Typography>
                <Typography variant="h5" component="div">
                  630 กล้อง
                </Typography>
              </CardContent>
            </CustomPaper>
          </Grid>
          <Grid item sm={4}>
            <CustomPaper>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  จำนวนกล่อง online จำนวนกล้อง offline
                </Typography>
                <Typography variant="h5" component="div">
                  601 29
                </Typography>
              </CardContent>
            </CustomPaper>
          </Grid>
          <Grid container item sm={4}>
            <Grid item sm={12}>
              <CustomPaper>
                <div style={{ position: "relative", width: "100%", height: "20rem" }}>
                  <Map
                    style={{ position: "absolute", top: "0", left: "0", bottom: "0", right: "0", width: "100%", height: "100%" }}
                    google={props.google}
                    zoom={14}
                    initialCenter={center}
                    center={center}
                  >
                  </Map>
                </div>
              </CustomPaper>
            </Grid>
            <Grid item mt={2} sm={12}>
              <CustomPaper>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 480 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontSize: "12px", backgroundColor: "#83abe6", }}>Dessert </TableCell>
                        <TableCell sx={{ fontSize: "12px", backgroundColor: "#83abe6", }} align="right">Calories</TableCell>
                        <TableCell sx={{ fontSize: "12px", backgroundColor: "#83abe6", }} align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell sx={{ fontSize: "12px", backgroundColor: "#83abe6", }} align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell sx={{ fontSize: "12px", backgroundColor: "#83abe6", }} align="right">Protein&nbsp;(g)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontSize: "12px", backgroundColor: "#bcd7ff", }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px", backgroundColor: "#bcd7ff", }} align="right">{row.calories}</TableCell>
                          <TableCell sx={{ fontSize: "12px", backgroundColor: "#bcd7ff", }} align="right">{row.fat}</TableCell>
                          <TableCell sx={{ fontSize: "12px", backgroundColor: "#bcd7ff", }} align="right">{row.carbs}</TableCell>
                          <TableCell sx={{ fontSize: "12px", backgroundColor: "#bcd7ff", }} align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CustomPaper>
            </Grid>
          </Grid>

          <Grid item sm={8}>
            <CustomPaper>
            <iframe width="100%" height="565rem" src="https://www.youtube.com/embed/PTphL9qR0-E" title="YouTube video player" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>


            </CustomPaper>
          </Grid>
        </Grid>
      </Box >
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: GLOBAL.API.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
})(Dashboard);
