import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, CardContent, Paper, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Loading } from "../../component/customComponent";
import GLOBAL from '../../GLOBAL';
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Location from '../../assets/image/location.png';
import cctv from '../../assets/image/cctv.png';
import cctv_online from '../../assets/image/cctv_on.png';
import cctv_offline from '../../assets/image/cctv_off.png';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('F.1', 'online', '02/09/2023 09:30'),
  createData('F.2', 'online', '02/09/2023 09:30'),
  createData('F.3', 'online', '02/09/2023 09:30'),
  createData('F.4', 'online', '02/09/2023 09:30'),
  createData('F.5', 'online', '02/09/2023 09:30'),
];

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = (props) => {
  const markerPosition = { lat: 14.9788739, lng: 102.0846441 };
  const [loading, setLoading] = useState(true);
  const center = { lat: 14.9788739, lng: 102.0846441 };

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
    width: "100%",
    height: "20rem",
  };
  return (
    <>
      <Loading show={loading} />
      <Box>
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <CustomPaper>
              <CardContent >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: 16, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                    จำนวน site โครงการทั้งหมด
                  </Typography>
                  <Typography sx={{ fontSize: 13, marginTop: "0.2rem" }} color="text.secondary" gutterBottom>
                    {formattedDate}AM
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "2rem" }}>
                  <Typography sx={{ fontSize: 30, fontWeight: "bold", display: "flex" }} color="text.secondary" gutterBottom>
                    <Typography sx={{ fontSize: "30px" , fontWeight: "bold"}}>84</Typography> <Typography sx={{ mt: 2, ml: 1, fontWeight: "bold" }}>โครงการ</Typography>
                  </Typography>
                  <Typography>
                    <img src={Location} style={{ width: "23%", height: "80%", marginLeft: "5rem" }} />
                  </Typography>
                </div>
              </CardContent>
            </CustomPaper>
          </Grid>
          <Grid item sm={4}>
            <CustomPaper>
              <CardContent >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: 16, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                    จำนวนกล้องทั้งหมด
                  </Typography>
                  <Typography sx={{ fontSize: 13, marginTop: "0.2rem" }} color="text.secondary" gutterBottom>
                    {formattedDate}AM
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "2rem" }}>
                  <Typography sx={{ fontSize: 30, fontWeight: "bold", display: "flex" }} color="text.secondary" gutterBottom>
                    <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>630</Typography> <Typography sx={{ mt: 2, ml: 1, fontWeight: "bold" }}>กล้อง</Typography>
                  </Typography>
                  <Typography>
                    <img src={cctv} style={{ width: "23%", height: "80%", marginLeft: "5rem" }} />
                  </Typography>
                </div>
              </CardContent>
            </CustomPaper>
          </Grid>
          <Grid item sm={4}>
            <CustomPaper>
              <CardContent >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: 16, fontWeight: "bold",ml:6 }} color="text.secondary" gutterBottom>
                    จำนวนกล้อง online
                  </Typography>
                  <Typography sx={{ fontSize: 16, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                    จำนวนกล้อง offline
                  </Typography>
                </div>
                <div style={{ display: "flex", }}>
                  <Typography sx={{ fontSize: 30, fontWeight: "bold", display: "flex" }} color="text.secondary" gutterBottom>
                    <img src={cctv_online} style={{ width: "15%", height: "100%"}} />
                    <Typography sx={{ fontSize: "30px",fontWeight: "bold",ml:3 }}>
                      601
                    </Typography>
                    <img src={cctv_offline} style={{ width: "15%", height: "80", marginLeft: "6rem" }} />
                    <Typography sx={{ fontSize: "30px",fontWeight: "bold", ml:4 }}>
                      29
                    </Typography>
                  </Typography>
                </div>
              </CardContent>
            </CustomPaper>
          </Grid>
          <Grid container item sm={4}>
            <Grid item sm={12}>
              <CustomPaper>
                <div style={{ position: "relative", width: "100%", height: "20rem" }}>
                  <Map
                    google={props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={center}
                    center={center}
                  >
                    <Marker position={{ lat: markerPosition.lat, lng: markerPosition.lng }} />
                  </Map>
                </div>
              </CustomPaper>
            </Grid>
            <Grid item mt={2} sm={12}>
              <CustomPaper>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontSize: "12px", backgroundColor: "#83abe6", }} align="center">ชื่อกล้อง</TableCell>
                        <TableCell sx={{ fontSize: "12px", backgroundColor: "#83abe6", }} align="center">สถานะกล้อง</TableCell>
                        <TableCell sx={{ fontSize: "12px", backgroundColor: "#83abe6", }} align="center">Datetime</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontSize: "12px", backgroundColor: "#bcd7ff", }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {row.name}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "12px", backgroundColor: "#bcd7ff", }}>{row.calories}</TableCell>
                          <TableCell align="center" sx={{ fontSize: "12px", backgroundColor: "#bcd7ff", }}>{row.fat}</TableCell>
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
              <iframe width="100%" height="560rem" src="https://www.youtube.com/embed/1M_gPicQpnk?si=T_qJ5CuYjtftqRKg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
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
