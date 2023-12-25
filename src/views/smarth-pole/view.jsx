
import React from "react"
import { Grid } from "@mui/material"
import pole from '../../assets/image/pole.png'
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import Cardmui from '@mui/material/Card';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { ConstructionOutlined } from "@mui/icons-material";
import { SmartPoleModel } from '../../model'

import { Loading } from "../../component/customComponent";

const smart_pole_model = new SmartPoleModel();

class ViewComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            site: {},
            loading: true,
            selectsite: false,
            currenttemp: null,
            currtenthumid: null,
            data_from_fetch: [],

        }

    }

    componentDidMount() {
        this._fecthdata();

    }

    _fecthdata = async () => {
        const datadevice = await smart_pole_model.getDeviceBy();
        
        this.setState({ data_fetch_all_site: datadevice }, async () => {
            let data = [];
            let datachart = [];
            const datafetch = this.state.data_fetch_all_site
            for(let i=0;i<datafetch.length;i++){
                const data_by_id = await smart_pole_model.getDeviceById({id:datafetch[i].id});
                data.push(data_by_id)
                const data_fetch_by_id_for_chart = await smart_pole_model.getHistoryByLenght({ id: datafetch[i].id, length: 10 });
                datachart.push(data_fetch_by_id_for_chart)
            }
            
            this.setState({ data_fetch_by_id: data, data_fetch_by_id_for_chart: datachart }, this.setState({ loading: false }))
        })
            // datadevice.forEach(async (item) => {
            //     console.log('item', item)
            //     const data_fetch_by_id = await smart_pole_model.getDeviceById({ id: item.id });
            //     console.log(data_fetch_by_id)
            //     data.push('asdasd')
            //     const data_fetch_by_id_for_chart = smart_pole_model.getHistoryByLenght({ id: item.id, length: 10 });
            //     datachart.push(data_fetch_by_id_for_chart)
            // })

  
    }


    onDropdownChange = (e) => {
        const data = this.state.data_fetch_all_site;
        this.setState({ nameselctsite: e.value.device_name, selectsite: true })
        for (let i = 0; i < data.length; i++) {
            if (e.value.id == data[i].id) {
                this.setState({ dataSelectsite: data[i] })
            }
        }
    }

    Online_status = () => {
        let countOnline = 0;
        const loading = this.state.loading
        if (!loading) {
            let data = this.state.data_fetch_all_site
            for (let i = 0; i < data.length; i++) {
                let online = data[i].device_status
                if (online) {
                    countOnline += 1
                }
            }
        }
        return countOnline
    }

    Offline_status = () => {
        let countOffline = 0;
        const loading = this.state.loading
        if (!loading) {
            let data = this.state.data_fetch_all_site
            for (let i = 0; i < data.length; i++) {
                let online = data[i].device_status
                if (!online) {
                    countOffline += 1
                }
            }
        }
        return countOffline
    }


    ChartprimeLine = () => {
        const loading = this.state.loading;
        const dataformfetch = this.state.data_fetch_by_id_for_chart;
        
        const select = this.state.selectsite;
        const selectdata = this.state.dataSelectsite;
        const timestamp = [];
        const data = [];

        if (!loading) {
            dataformfetch[0].map(item => (
                timestamp.push(new Date(item.created_at).toTimeString().split(' ')[0])
            ))
            if (select) {
                const datatemp = [];
                dataformfetch.map(item => {
                    const data_dB_temp = [];
                    item.map(item => (
                        data_dB_temp.push(item.sound_sensor)
                    ))
                    if (item[0].deviceId == selectdata.id) datatemp.push(data_dB_temp)
                })
                data.push({ label: selectdata.device_name, data: datatemp[0], fill: false, tension: 0.4 })
            }
            else {
                dataformfetch.map(item => {
                    const data_dB_temp = [];
                    item.map(item => (
                        data_dB_temp.push(item.sound_sensor)
                    ))
                    data.push({ label: item[0].devices.device_name, data: data_dB_temp, fill: false, tension: 0.4 })
                })

            }
        }
        const dataline = {
            //['12','13','14','15','16']
            labels: timestamp,
            //list obj
            datasets: data,
        };
        const optionsline = {
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {

                    }
                }
            },
            scales: {
                x: {
                    ticks: {

                    },
                    grid: {

                    }
                },
                y: {
                    ticks: {

                    },
                    grid: {

                    }
                }
            },
        };

        return (
            <>
                <Chart type="line" data={dataline} options={optionsline} />
            </>
        )

    }

    ChartprimeLBar = () => {
        const loading = this.state.loading
        const sitename = [];
        const data = [];
        if (!loading) {
            this.state.data_fetch_by_id.map(item => (
                sitename.push(item.device_name),
                data.push(item.device_historys[0].pm2_5)
            ))
        }
        else {
        }
        const dataline = {
            //ชื่อ site
            labels: sitename,
            //Pm 2.5
            datasets: [
                {
                    label: 'PM 2.5',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.4)',
                        'rgba(75, 192, 192, 0.4)',
                        'rgba(54, 162, 235, 0.4)',
                        'rgba(153, 102, 255, 0.4)'

                    ],
                    borderWidth: 1
                }
            ],
        };
        const optionsline = {
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {

                    }
                }
            },
            scales: {
                x: {
                    ticks: {

                    },
                    grid: {

                    }
                },
                y: {
                    ticks: {

                    },
                    grid: {

                    }
                }
            },
        };

        return (
            <>
                {<Chart type="bar" data={dataline} options={optionsline} style={{ height: "100%", width: "100%" }} />}
            </>
        )

    }
    handleItemClick = (index) => {
        this.setState({ selectedItem: index })
    };

    render() {
        const data = this.state.data_fetch_all_site
        const data_by_id = this.state.data_fetch_by_id
        
        return (
            
            <div>
                 <Loading show={this.state.loading}  />
                {/* 1 */}

                <Grid container  columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{paddingBottom:'10px'}}>
                    <Grid item  sm={12} md={7} lg={5} xs={12} >
                        <Card style={{height:"20rem",width:'100%',}}>
                             <div style={{minHeight:"15rem",minWidth:"100%",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                            <img src={pole} style={{height:'8rem'}}></img>
                                <div><p>Smart Pole</p>
                                <p style={{textAlign:"center",fontSize:"2rem",paddingTop:"0px"}}>{this.Online_status()+this.Offline_status()}</p>
                                </div>
                                <div style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly",alignContent:"start",minHeight:"100%",height:"100%",rowGap:"1rem"}}>
                                    <div style={{backgroundColor:"rgb(14 165 233)",borderRadius:"10px",boxShadow:"1px 1px 5px rgba(0, 0, 0, 0.19)",width:"8 rem",height:"3rem",display:"flex",alignItems:"center",justifyContent:"center"}}><p>online : {this.Online_status()}</p>
                                    </div>
                                    <div style={{backgroundColor:"rgb(239 68 68)",borderRadius:"10px",boxShadow:"1px 1px 5px rgba(0, 0, 0, 0.19)",display:"flex",alignItems:"center",justifyContent:"center",width:"8rem",height:"3rem"}}><p>offline : {this.Offline_status()}</p>
                                </div>
                                </div>
                                </div>
                        </Card>
                    </Grid>
                    <Grid item  sm={12} md={5} lg={7} xs={12}>
                        <Cardmui sx={{height:"20rem"}}>
                             {this.ChartprimeLBar()}
                        </Cardmui>
                    </Grid>
                </Grid>  

                 {/* 2 */}
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{paddingBottom:'10px'}}>
                        <Grid item xs={12} sm={12} lg={5} md={4} sx={{height:"20rem"}}>
                        <Card><div style={{height:"20rem"}}><iframe src="https://rtsp.me/embed/a43TbYib/"  height="100%" width="100%"></iframe></div></Card>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={4} md={4} >
                            <Card>
                            <div style={{width:"100%",display:"flex",flexDirection:"column",minheight:"20rem",rowGap:"1rem"}}>
                            <div style={{overflow:"auto",height:"20rem"}}>
                                    {/* { !data? null : Object.keys(data).map((key, index) => (
                                       <SelectSite key={index} namesite={data[index].device_name} online={data[index].device_status} humid={data[index].device_history} onClick={()=>{(this.setState({currenttemp:data[index].device_temp,currtenthumid:data[index].device_historys}),this.handleItemClick(index))}} selected={this.state.selectedItem === index} />
                                        ))} */}

                                    {data_by_id?.length>0 ?  data_by_id?.map((item)=>(
                                        // console.log(item.id)
                                        <SelectSite key={item.id} namesite={item.device_name} online={item.device_status} humid={item.device_historys[0].rain_sensor} onClick={()=>{(this.setState({currenttemp:item.device_temp,currtenthumid:item.device_historys[0].rain_sensor}),this.handleItemClick(item.device_id))}} selected={this.state.selectedItem === item.device_id} />
                                    )):null}

                            </div>
                            </div>
                            </Card>              
                        </Grid>
                        <Grid item xs={12} sm={12} lg={3} md={4}>
                            <Card>
                            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"20rem"}}>
                                <p style={{fontWeight:"bold",fontSize:"1rem"}}>
                                    อุณหภูมิ
                                </p>
                                <p style={{fontWeight:'bold',fontSize:"2rem",marginTop:"0px"}}>
                                    {this.state.currenttemp} C
                                </p>
                                <div style={{border:"solid 1px",width:"95%",marginTop:"0px"}}></div>
                                <p style={{fontWeight:"bold",fontSize:"1rem"}}>
                                    ความชื้น
                                </p>
                                <p style={{fontWeight:"bold",fontSize:"2rem",marginTop:"0px"}}>
                                {this.state.currtenthumid} mm
                                </p>
                            </div>
                            </Card>
                        </Grid>
                    </Grid>

                 {/* 3 */}
                 <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <Grid item xs={12} sm={12} >    
                    <Card>
                        <div style={{position:"relative",top:"-20px",marginBottom:"2rem"}}>
                        <Dropdown value={data} onChange={this.onDropdownChange}  placeholder="Select a site" options={data} optionLabel="device_name" style={{position:"absolute",right:"0px",top:"0px"}} />
                        </div>
                        {this.ChartprimeLine()}
                    </Card>
                    </Grid>
                </Grid>


            </div> 

        )

    }


}

export default ViewComponent

const SelectSite = (props) => {
    const { namesite, online, humid, onClick, selected } = props;

    const style = {
        marginBottom: '10px',
        ':hover': {
            backgroundColor: 'lightgreen',
            cursor: 'pointer',
        },
    }
    const styleSelected = {
        marginBottom: '10px',
        backgroundColor: 'gray'
    }
    return (
        <>
            <Cardmui sx={selected ? styleSelected : style} onClick={onClick} >
                <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "1.5rem", paddingRight: "1.5rem" }} >
                    <p style={{ flexBasis: "60%" }}>{namesite}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "50%" }}>
                        {online ? <><p style={{ color: "rgb(14 165 233)" }}>Online</p><p style={{ color: "rgb(14 165 233)" }}>{humid} mm</p></>
                            : <><p style={{ color: "rgb(239 68 68)" }}>Offline</p><p style={{ color: "rgb(239 68 68)" }}>{humid} mm</p></>
                        }

                    </div>
                </div>
            </Cardmui>
        </>
    )
}


