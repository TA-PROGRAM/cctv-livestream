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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
                <label style={{ fontWeight: "bold", fontSize: " 25px", marginLeft: "1rem" }}>face regongnition</label>
                <Grid container spacing={2}>
                    <Grid item sm={8} sx={{ padding: 2 }} >
                        <CustomPaper sx={{ display: "flex", justifyContent: "space-between" }}>
                            <CardContent>
                                <div style={{ marginRight: "1จrem", fontWeight: "bold", fontSize: "18px", color: "black" }}>รูปบุคคล</div>
                                <Stack spacing={2}>
                                    <Button
                                        variant="contained"
                                        style={{ width: "10rem", marginTop: "0.5rem" }}
                                    >
                                        อัพโหลดรูปภาพ
                                    </Button>
                                </Stack>
                            </CardContent>
                            <CardContent>
                                <div style={{ marginRight: "12rem", fontWeight: "bold", fontSize: "18px", color: "black" }}>วัน/เวลา เริ่มต้น</div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        sx={{ width: '20rem', marginTop:'0.5rem' }}
                                        label="วัน/เวลา เริ่มต้น"
                                        slotProps={{ textField: { size: 'small' } }}
                                    />
                                </LocalizationProvider>
                            </CardContent>
                            <CardContent>
                                <div style={{ marginRight: "12rem", fontWeight: "bold", fontSize: "18px", color: "black" }}>วัน/เวลา สิ้นสุด</div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        sx={{ width: '20rem', marginTop:'0.5rem' }}
                                        label="วัน/เวลา สิ้นสุด"
                                        slotProps={{ textField: { size: 'small' } }}
                                    />
                                </LocalizationProvider>
                                <Stack spacing={2}>
                                    <Button
                                        variant="contained"
                                        style={{ width: "8rem", marginTop: "0.5rem", marginLeft: "12rem" }}
                                    >
                                        ค้นหา
                                    </Button>
                                </Stack>
                            </CardContent>
                        </CustomPaper>
                        <CustomPaper sx={{ mt: 2 }}>
                            <CardContent>
                                <TableContainer component={Paper}>
                                    <DataGrid
                                        disableRowSelectionOnClick
                                        sx={{ width: "100%" }}
                                        rows={filteredDeviceData}
                                        columns={[
                                            {
                                                field: "device_name",
                                                headerName: "รูปบุคคลที่เจอ",
                                                headerAlign: "center",
                                                align: "center",
                                                minWidth: "auto",
                                                flex: 1,
                                            },
                                            {
                                                field: "is_active",
                                                headerName: "เปอร์เซ็นต์การเปรียบเทียบ",
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
                            </CardContent>
                        </CustomPaper>
                    </Grid>
                    <Grid item sx={{ padding: 2 }} sm={4}>
                        <CustomPaper>
                            <CardContent>
                                <div style={{ marginRight: "15rem", fontWeight: "bold", fontSize: "18px", color: "black", marginBottom: "2rem" }}>รูปภาพบุคคลที่เจอ</div>
                                <img src='https://mydeargift.com/image/drawing/Style-J/2.webp' alt='' style={{ width: "50%" }} />
                            </CardContent>
                            <hr />
                            <CardContent>
                                <div style={{ marginRight: "15rem", fontWeight: "bold", fontSize: "18px", color: "black", marginBottom: "2rem" }}>รูปภาพที่อัพโหลด</div>
                                <img src='https://mydeargift.com/image/drawing/Style-J/2.webp' alt='' style={{ width: "50%" }} />
                            </CardContent>
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
