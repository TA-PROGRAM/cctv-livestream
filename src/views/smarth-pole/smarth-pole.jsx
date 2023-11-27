import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, CardContent, Paper, Grid, Button, Stack, TableContainer, Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Loading } from "../../component/customComponent";
import GLOBAL from '../../GLOBAL';
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Location from '../../assets/image/location.png';
import { StyledNum, StyledMap, StyledBox, StyledText } from "../styled.component";
import { DeviceModel, SiteModel } from '../../model';
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
                <label style={{fontWeight:"bold", fontSize:" 25px", marginLeft:"1rem"}}>Smarth Pole</label>
                    <Grid sx={{ width: "100%" ,padding:2}}>
                        <CustomPaper sx={{ display: "flex", justifyContent: "space-between" }}>
                            <CardContent>
                                <div style={{ marginRight: "9rem", fontWeight: "bold", fontSize: "18px", color: "black" }}>หมายเลขป้ายทะเบียน</div>
                                <TextField
                                    id="search-car"
                                    defaultValue="หมายเลขป้ายทะเบียน"
                                    size="small"
                                    style={{ width: "20rem" }}
                                />
                            </CardContent>
                            <CardContent>
                                <div style={{ marginRight: "12rem", fontWeight: "bold", fontSize: "18px", color: "black" }}>วัน/เวลา เริ่มต้น</div>
                                <TextField
                                    id="date-start"
                                    defaultValue="วัน/เวลา เริ่มต้น"
                                    size="small"
                                    style={{ width: "20rem" }}
                                />
                            </CardContent>
                            <CardContent>
                                <div style={{ marginRight: "12rem", fontWeight: "bold", fontSize: "18px", color: "black" }}>วัน/เวลา สิ้นสุด</div>
                                <TextField
                                    id="date-end"
                                    defaultValue="วัน/เวลา สิ้นสุด"
                                    size="small"
                                    style={{ width: "20rem" }}
                                />
                            </CardContent>
                            <CardContent>
                                <Stack spacing={2}>
                                    <Button
                                        variant="contained"
                                        style={{width:"10rem", marginTop:"1.5rem"}}
                                    >
                                        ค้นหา
                                    </Button>
                                </Stack>
                            </CardContent>
                        </CustomPaper>
                    </Grid>
                    <Grid container sx={{ mt: 1 }}>
                        <Grid item sm={8} sx={{ width: "100%", padding: 2 }}>
                            <CustomPaper>
                                <Grid item mt={2} sm={12} sx={{ mr: 2 }}>
                                    <TableContainer component={Paper}>
                                        <DataGrid
                                            disableRowSelectionOnClick
                                            sx={{ width: "100%" }}
                                            rows={filteredDeviceData}
                                            columns={[
                                                {
                                                    field: "device_name",
                                                    headerName: "รูปป้ายทะเบียน",
                                                    headerAlign: "center",
                                                    align: "center",
                                                    minWidth: "auto",
                                                    flex: 1,
                                                },
                                                {
                                                    field: "is_active",
                                                    headerName: "ถนน",
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
                                                    field: "date_start",
                                                    headerName: "วัน/เวลา",
                                                    headerAlign: "center",
                                                    align: "center",
                                                    sortable: false,
                                                    minWidth: 200,
                                                    flex: 1,
                                                    valueGetter: (params) => convertToThaiTimezone(params.value),
                                                },
                                                {
                                                    field: "date_end",
                                                    headerName: "ชื่อกล้อง",
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
                        <Grid item sm={4} sx={{ width: "100%"}}>
                            <CustomPaper sx={{ mr: 2}}>
                                <StyledMap>
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
                                                title={device.device_name}
                                            />
                                        ))}
                                    </Map>
                                </StyledMap>
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
