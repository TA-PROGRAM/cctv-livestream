import React from "react"
import { Button, Dropdown, Dialog, Toast, InputText } from "primereact"
import { DeviceModel, SiteModel } from "../../model"
import { Row, Col, Loading } from "../../component/customComponent"
import Swal from "sweetalert2"
const site_model = new SiteModel()
const device_model = new DeviceModel()
class InsertModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      check_ins: 0,
      loading: false,
      header: "เพิ่มอุปกรณ์",
    }
  }

  componentDidUpdate(props_old) {
    if (!props_old.show && this.props.show) {
      this._fetchData()
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = () =>
    this.setState({ loading: true }, async () => {
      let site = await site_model.getSiteBy({})
      let device_update = await device_model.getDeviceById({ device_table_uuid: this.props.id })
      let {
        device_table_uuid,
        device_name,
        site_table_uuid,
        latitude,
        longitude,
        is_active,
        link
      } = device_update.data[0] || {}
      this.setState({
        device_table_uuid,
        device_name,
        site_table_uuid,
        latitude,
        longitude,
        is_active,
        link,
        check_ins: device_update.data.length > 0 ? 1 : 0,
        header: device_update.data.length > 0 ? 'แก้ไขอุปกรณ์' : 'เพิ่มอุปกรณ์',
        site: site.data,
        loading: false,
      })
    })

  checkSubmit = () => {
    if (this.state.device_name == "" || this.state.device_name === undefined) {
      this.toast.show({ severity: "warn", summary: "โปรดกรอกข้อมูลให้ครบถ้วน", detail: "กรุณากรอกข้อมูลอุปกรณ์", life: 3000 })
      return false
    }
    if (this.state.site_table_uuid == "" || this.state.site_table_uuid === undefined) {
      this.toast.show({ severity: "warn", summary: "โปรดกรอกข้อมูลให้ครบถ้วน", detail: "กรุณาเลือกข้อมูลไซต์งาน", life: 3000 })
      return false
    }
    if (this.state.longitude == "" || this.state.longitude === undefined) {
      this.toast.show({ severity: "warn", summary: "โปรดกรอกข้อมูลให้ครบถ้วน", detail: "กรุณากรอกข้อมูลลองจิจูด", life: 3000 })
      return false
    }
    if (this.state.latitude == "" || this.state.longitude === undefined) {
      this.toast.show({ severity: "warn", summary: "โปรดกรอกข้อมูลให้ครบถ้วน", detail: "กรุณากรอกข้อมูลละติจูด", life: 3000 })
      return false
    } else {
      return true
    }
  }

  _handleClose = () => this.props.onClose()

  handleSubmit = (e) => {
    e.preventDefault()
    let value_to_use = {
      device_table_uuid: this.state.device_table_uuid,
      device_name: this.state.device_name,
      site_table_uuid: this.state.site_table_uuid,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      is_active: this.state.is_active,
      user_id: this.props.user,
      link: this.state.link,
    }
    this.checkSubmit() &&
      this.setState({ loading: true }, async () => {
        let res
        this.state.check_ins === 0 ? (res = await device_model.insertDevice(value_to_use)) : (res = await device_model.updateDeviceById(value_to_use))

        if (res.require) {
          this.setState({ loading: false }, () => {
            this.toast.show({ severity: "success", summary: "บันทึกข้อมูลสำเร็จ", detail: "บันทึกข้อมูลสำเร็จ", life: 3000 })
            this._handleClose()
          })
        } else {
          this.setState({ loading: false }, () => {
            this.toast.show({ severity: "warn", summary: "เกิดข้อผิดพลาด", detail: "กรุณาตรวจสอบก่อนบันทึกข้อมูล", life: 3000 })
          })
        }
      })
  }

  render() {
    let { site } = this.state
    return (
      <>
        <Loading show={this.state.loading} />
        <Toast ref={(el) => (this.toast = el)} />
        <Dialog
          className="z-auto"
          header={this.state.header}
          visible={this.props.show}
          style={{ width: "85vh", height: "48vh" }}
          onHide={() => this._handleClose()}
          draggable={false}
          footer={() => (
            <>
              <Button severity="primary" className={"m-1"} label="บันทึก" onClick={(e) => this.handleSubmit(e)} />
              <Button severity="secondary" className={"m-1"} label="ยกเลิก" onClick={() => this._handleClose()} />
            </>
          )}
        >
          <Row>
            <Col md={12}>
              <label htmlFor="device_name">ชื่ออุปกรณ์</label>
              <br />
              <InputText
                className="p-inputtext-sm w-full"
                value={this.state.device_name || ''}
                onChange={(e) => this.setState({ device_name: e.target.value })}
                placeholder="กรุณาระบุชื่ออุปกรณ์"
              />
            </Col>
          </Row>
          <hr className="opacity-50" />
          <Row>
            <Col md={6}>
              <label htmlFor="site_name">ไซต์งาน</label>
              <br />
              <Dropdown
                id="site_table_uuid"
                value={this.state.site_table_uuid}
                style={{ height: "2.5rem" }}
                className={"p-inputtext-sm col-12 p-0"}
                options={site}
                onChange={(e) => {
                  this.setState({ site_table_uuid: e.target.value })
                }}
                optionLabel="site_name"
                optionValue="site_table_uuid"
                placeholder="เลือกไซด์งาน"
                filter
              />
            </Col>
            <Col md={6}>
              <label htmlFor="latitude">ละติจูด</label>
              <br />
              <InputText
                id="latitude"
                style={{ height: "2.5rem" }}
                className={"p-inputtext-sm w-full"}
                value={this.state.latitude || ''}
                onChange={(e) => this.setState({ latitude: e.target.value })}
                placeholder="กรุณาระบุละติจูด"
                //showClear
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <label htmlFor="longitude">ลองติจูด</label>
              <br />
              <InputText
                id="longitude"
                style={{ height: "2.5rem" }}
                className={"p-inputtext-sm w-full"}
                value={this.state.longitude || ''}
                onChange={(e) => this.setState({ longitude: e.target.value })}
                placeholder="กรุณาระบุลองติจูด"
              />
            </Col>
            <Col md={6}>
              <label htmlFor="link">ลิงค์กล้อง</label>
              <br />
              <InputText
                id="link"
                style={{ height: "2.5rem" }}
                className={"p-inputtext-sm w-full"}
                value={this.state.link || ''}
                onChange={(e) => this.setState({ link: e.target.value })}
                placeholder="กรุณาระบุลองติจูด"
              />
            </Col>
          </Row>
        </Dialog>
      </>
    )
  }
}

export default InsertModal
