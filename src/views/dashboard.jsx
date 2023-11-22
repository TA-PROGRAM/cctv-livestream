import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, CardContent, Paper, Grid, Typography, TableContainer, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Loading } from "../component/customComponent";
import GLOBAL from '../GLOBAL';
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Location from '../assets/image/location.png';
import cctv from '../assets/image/cctv.png';
import cctv_online from '../assets/image/cctv_on.png';
import cctv_offline from '../assets/image/cctv_off.png';
import { StyledNum, StyledMap, StyledBox, StyledText, StyledMapDash } from "./styled.component";
import { DeviceModel, SiteModel } from '../model';
const device_model = new DeviceModel();
const site_model = new SiteModel();

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = (props) => {
  // const markerPosition = { lat: 14.9788739, lng: 102.0846441 };
  const [loading, setLoading] = useState(true);
  const center = { lat: 14.9788739, lng: 102.0846441 };
  const [deviceData, setDeviceData] = useState([]);
  const [siteData, setSiteData] = useState([]);
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const defaultCenter = { lat: 14.9788739, lng: 102.0846441 };
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  useEffect(() => {
    _fetchData();
  }, []);

  const _fetchData = async () => {
    let device = await device_model.getDeviceBy();
    let site = await site_model.getSiteBy();
    setDeviceData(device.data);
    setSiteData(site.data);
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

  function convertToThaiTimezone(dateString) {
    const createDate = new Date(dateString);
    const thaiDateString = createDate.toLocaleString("en-US", {
      timeZone: "Asia/Bangkok",
    });
    return thaiDateString;
  }

  const filteredDeviceData = selectedSite
    ? deviceData.filter((device) => device.site_table_uuid === selectedSite)
    : deviceData;

  const handleRowClick = (params) => {
    const selectedDeviceId = params.id;
    const selectedDevice = filteredDeviceData.find(
      (device) => device.device_table_uuid === selectedDeviceId
    );
    if (selectedDevice) {
      setMarkerPosition({
        lat: selectedDevice.latitude,
        lng: selectedDevice.longitude,
      });
    }
    setSelectedDevice(selectedDevice);
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
                  <StyledText>
                    จำนวน site โครงการทั้งหมด
                  </StyledText>
                  <Typography sx={{ fontSize: 13, marginTop: "0.2rem" }} color="text.secondary" >
                    {formattedDate}AM
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "2rem" }}>
                  <StyledBox>
                    <StyledNum >
                      {siteData.length}
                    </StyledNum>
                    <StyledText>
                      โครงการ
                    </StyledText>
                  </StyledBox>
                  <Typography>
                    <img src={Location} style={{ width: "23%", height: "100%" }} />
                  </Typography>
                </div>
              </CardContent>
            </CustomPaper>
          </Grid>
          <Grid item sm={4}>
            <CustomPaper>
              <CardContent>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <StyledText>
                    จำนวนกล้องทั้งหมด
                  </StyledText>
                  <Typography sx={{ fontSize: 13, marginTop: "0.2rem" }} color="text.secondary" >
                    {formattedDate}AM
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "2rem" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <StyledNum>
                      {deviceData.length}
                    </StyledNum>
                    <StyledText>
                      กล้อง
                    </StyledText>
                  </div>
                  <Typography>
                    <img src={cctv} style={{ width: "20%", height: "100%" }} />
                  </Typography>
                </div>
              </CardContent>
            </CustomPaper>
          </Grid>
          <Grid item sm={4}>
            <CustomPaper>
              <CardContent>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <StyledText>
                    จำนวนกล้อง online
                  </StyledText>
                  <StyledText>
                    จำนวนกล้อง offline
                  </StyledText>
                </div>
                <div style={{ display: "flex", minWidth: "100%" }}>
                  <StyledBox>
                    <img src={cctv_online} style={{ width: "31%", height: "100%" }} />
                    <StyledNum >
                      {deviceData.filter(item => item.is_active === 1).length}
                    </StyledNum>
                  </StyledBox>
                  <StyledBox>
                    <img src={cctv_offline} style={{ width: "31%", height: "100%" }} />
                    <StyledNum>
                      {deviceData.filter(item => item.is_active === 2).length}
                    </StyledNum>
                  </StyledBox>
                </div>
              </CardContent>
            </CustomPaper>
          </Grid>
          <Grid container sx={{ mt: 1 }}>
            <Grid item sm={4} sx={{ width: "100%", padding: 2 }}>
              <CustomPaper>
                <Grid item sm={12}>
                  <CustomPaper sx={{ mr: 2 }}>
                    <StyledMapDash>
                      <Map
                        google={props.google}
                        zoom={14}
                        initialCenter={defaultCenter}
                        center={markerPosition}
                      >
                        {filteredDeviceData.map((device) => (
                          <Marker
                            key={device.device_table_uuid}
                            position={{
                              lat: device.latitude,
                              lng: device.longitude,
                            }}
                            icon={{
                              url: device.is_active  === 1 ? cctv_online : cctv_offline,
                              scaledSize: new window.google.maps.Size(40, 40),
                            }}
                            title={device.device_name}
                          />
                        ))}
                      </Map>
                    </StyledMapDash>
                  </CustomPaper>
                </Grid>
                <Grid item mt={2} sm={12} sx={{ mr: 2 }}>
                  <div style={{ display: "flex" }}>
                    <label style={{ marginTop: "1rem", fontWeight: "bold" }}>
                      ข้อมูลกล้องที่
                    </label>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small-label">Site</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={selectedSite}
                        label="Site"
                        onChange={(e) => {
                          setSelectedSite(e.target.value);
                          setSelectedDevice(null);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {siteData.map((site) => (
                          <MenuItem key={site.site_table_uuid} value={site.site_table_uuid}>
                            {site.site_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <TableContainer component={Paper}>
                    <DataGrid
                      disableRowSelectionOnClick
                      sx={{ width: "100%" }}
                      rows={filteredDeviceData}
                      columns={[
                        {
                          field: "device_name",
                          headerName: "ชื่ออุปกรณ์",
                          headerAlign: "center",
                          align: "center",
                          minWidth: "auto",
                          flex: 1,
                        },
                        {
                          field: "is_active",
                          headerName: "สถานะกล้อง",
                          headerAlign: "center",
                          align: "center",
                          sortable: false,
                          minWidth: 100,
                          flex: 1,
                          renderCell: (params) => (
                            <span style={{ color: params.row.is_active === 1 ? "green" : "red" }}>
                              {params.row.is_active === 1 ? "ใช้งาน" : "ไม่ใช้งาน"}
                            </span>
                          ),
                        },
                        {
                          field: "create_date",
                          headerName: "Datetime",
                          headerAlign: "center",
                          align: "center",
                          sortable: false,
                          minWidth: 200,
                          flex: 1,
                          valueGetter: (params) => convertToThaiTimezone(params.value),
                        }
                      ]}
                      getRowId={(row) => row.device_table_uuid}
                      pageSize={10}
                      onSelectionModelChange={(selectionModel) => {
                        const selectedDeviceId = selectionModel[0];
                        const selectedDevice = filteredDeviceData.find((device) => device.device_table_uuid === selectedDeviceId);
                        setSelectedDevice(selectedDevice);
                      }}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 10 },
                        },
                      }}
                      pageSizeOptions={[10, 20, 30, 50, 100]}
                      onRowClick={handleRowClick}
                    />
                  </TableContainer>
                </Grid>
              </CustomPaper>
            </Grid>
            <Grid item sm={8} sx={{ width: "100%" }}>
              <CustomPaper>
                {selectedDevice ? (
                  <iframe
                    width="900"
                    height="550"
                    src={`${selectedDevice.link}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <Typography variant="h6" color="error">
                    กรุณาเลือก Site
                  </Typography>
                )}
              </CustomPaper>
            </Grid>
          </Grid>
        </Grid>
      </Box >
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: GLOBAL.API.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
})(Dashboard);
