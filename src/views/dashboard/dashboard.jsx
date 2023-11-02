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
import { StyledNum, StyledMap } from "./styled.component";

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
              <CardContent>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: 16, fontWeight: "bold" }} color="text.secondary" >
                    จำนวน site โครงการทั้งหมด
                  </Typography>
                  <Typography sx={{ fontSize: 13, marginTop: "0.2rem" }} color="text.secondary" >
                    {formattedDate}AM
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "2rem" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <StyledNum sx={{ fontSize: 30, fontWeight: "bold" }} color="text.secondary" >
                      84
                    </StyledNum>
                    <Typography sx={{ mt: 2, ml: 1, fontWeight: "bold" }} color="text.secondary" >
                      โครงการ
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", marginLeft: "5rem" }}>
                    <img src={Location} style={{ width: "23%", height: "100%" }} />
                  </Box>
                </div>
              </CardContent>
            </CustomPaper>
          </Grid>
          <Grid item sm={4}>
            <CustomPaper>
              <CardContent>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: 16, fontWeight: "bold" }} color="text.secondary" >
                    จำนวนกล้องทั้งหมด
                  </Typography>
                  <Typography sx={{ fontSize: 13, marginTop: "0.2rem" }} color="text.secondary" >
                    {formattedDate}AM
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "2rem" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <StyledNum sx={{ fontSize: 30, fontWeight: "bold" }} color="text.secondary" >
                      630
                    </StyledNum>
                    <Typography sx={{ mt: 2, ml: 1, fontWeight: "bold" }} color="text.secondary">
                      กล้อง
                    </Typography>
                  </div>
                  <Box sx={{ display: "flex", alignItems: "center", marginLeft: "5rem" }}>
                    <img src={cctv} style={{ width: "23%", height: "100%" }} />
                  </Box>
                </div>
              </CardContent>
            </CustomPaper>
          </Grid>
          <Grid item sm={4}>
            <CustomPaper>
              <CardContent>
                <div style={{ display: "flex", justifyContent: "space-between", minWidth: "100%" }}>
                  <Typography sx={{ fontSize: 16, fontWeight: "bold", ml: 6 }} color="text.secondary" >
                    จำนวนกล้อง online
                  </Typography>
                  <Typography sx={{ fontSize: 16, fontWeight: "bold" }} color="text.secondary">
                    จำนวนกล้อง offline
                  </Typography>
                </div>
                <div style={{ display: "flex", minWidth: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={cctv_online} style={{ width: "37%", height: "100%" }} />
                    <StyledNum >
                      601
                    </StyledNum>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", marginLeft: "6rem" }}>
                    <img src={cctv_offline} style={{ width: "37%", height: "100%" }} />
                    <StyledNum>
                      29
                    </StyledNum>
                  </Box>
                </div>
              </CardContent>
            </CustomPaper>
          </Grid>
          <Grid container item sm={4}>
            <Grid item sm={12}>
              <CustomPaper>
                <StyledMap>
                  {props.google ? (
                    <Map
                      google={props.google}
                      zoom={14}
                      initialCenter={center}
                      center={center}
                    >
                      <Marker position={{ lat: markerPosition.lat, lng: markerPosition.lng }} />
                    </Map>
                  ) : (
                    <Typography>Loading map...</Typography>
                  )}
                </StyledMap>
              </CustomPaper>
            </Grid>
            <Grid item mt={2} sm={12}>
              <CustomPaper>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: "100%" }} size="small" aria-label="a dense table">
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
