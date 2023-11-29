import React from "react"
import { Link } from "react-router-dom"
import { Card, Button, Badge } from "primereact"
import { Breadcrumbs, Typography } from "@mui/material"
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Loading, Row, Col } from "../../component/customComponent"
import { DeviceModel } from "../../model"
import GLOBAL from "../../GLOBAL"
import { StyledMap } from "../styled.component"
import cctv_online from '../../assets/image/cctv_on.png';
import cctv_offline from '../../assets/image/cctv_off.png';

//เพิ่มจุดนี้
const device_model = new DeviceModel()

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      title: "",
      latitude: "", 
      longitude: "", 
      is_active: "",
    }
  }

  async componentDidMount() {
    this._fetchData()
  }
  _fetchData = () =>
    this.setState({ loading: true }, async () => {
      let { code } = this.props.match.params
      let device = await device_model.getDeviceById({ device_table_uuid: code })
      let { device_name, site_name, latitude, longitude, is_active } = device.data[0] || {}
      this.setState({
        device_name,
        site_name,
        latitude,
        longitude,
        title: device_name,
        device: device.data,
        loading: false,
        is_active,
      })
    })
  render() {
    return (
      <>
        <Loading show={this.state.loading} />
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.6)" }} to="/">
            หน้าหลัก
          </Link>
          <Typography component="div" style={{ fontWeight: "bold" }}>
            จัดการอุปกรณ์
          </Typography>
        </Breadcrumbs>

        <Card title={this.state.title} className={"shadow-3"}>
          <Row>
            <Col sm={12} md={6}>
              <i className="pi pi-circle-fill " style={{ fontSize: "0.7rem" }} />
              <label className="ml-1">รายละเอียดอุปกรณ์</label>
              <hr className="opacity-50" />
              <Row>
                <Col sm={6} md={3}>
                  ชื่ออุปกรณ์ :
                </Col>
                <Col sm={6} md={3}>
                  {this.state.device_name}
                </Col>
                <Col sm={6} md={3}>
                  ชื่อไซด์ :
                </Col>
                <Col sm={6} md={3}>
                  {this.state.site_name}
                </Col>
              </Row>
              <Row>
                <Col sm={6} md={3}>
                  ละติจูดที่ :
                </Col>
                <Col sm={6} md={3}>
                  {this.state.latitude}
                </Col>
                <Col sm={6} md={3}>
                  ลองจิจูดที่ :
                </Col>
                <Col sm={6} md={3}>
                  {this.state.longitude}
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <i className="pi pi-circle-fill " style={{ fontSize: "0.7rem" }} />
              <label className="ml-1">สถานที่อุปกรณ์</label>
              <hr className="opacity-50" />
              <Row>
                <Col sm={12} md={12}>
                  <StyledMap>
                    <Map
                      google={this.props.google}
                      zoom={14}
                      initialCenter={{ lat: 14.9788739, lng: 102.0846441 }}
                      center={{ lat: this.state.latitude, lng: this.state.longitude, }}
                    >
                      <Marker
                        position={{
                          lat: this.state.latitude,
                          lng: this.state.longitude,
                        }}
                        icon={{
                          url: this.state.is_active  === 1 ? cctv_online : cctv_offline,
                          scaledSize: new window.google.maps.Size(40, 40),
                        }}
                      />
                    </Map>
                  </StyledMap>
                </Col>
              </Row>
            </Col>
          </Row>

          <div
            style={{
              display: "flex",
              marginTop: "0.5rem",
              justifyContent: "end",
            }}
          >
            <Button
              severity="secondary"
              className="p-button-sm p-button-outlined p-button-secondary"
              label="ย้อนกลับ"
              onClick={() => window.history.back()}
            />
          </div>
        </Card>
      </>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: GLOBAL.API.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
})(Detail)
