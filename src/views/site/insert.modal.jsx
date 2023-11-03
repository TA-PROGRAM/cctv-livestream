import React from "react"
import { Button, Dropdown, Dialog, Toast, InputText ,InputTextarea } from "primereact"
import { SiteModel } from "../../model"
import { Row, Col } from "../../component/customComponent"
const site_model = new SiteModel()
class InsertModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_teacher: "",
      sec_teacher: "",
      period_room: "",
      staff: [],
      room: [],
    }
  }

  componentDidUpdate(props_old) {
    if (!props_old.show && this.props.show) {
      this._fetchData()
    }
  }

  _fetchData = async () => {
    this.setState({})
  }

  _handleSave = () => {
    if (this.checksave()) {
      this.props.onSave({})
      this._handleClose()
    }
  }
  checksave = () => {
    if (this.state.first_teacher == "") {
      this.toast.show({ severity: "warn", summary: "โปรดกรอกข้อมูลให้ครบถ้วน", detail: "เลือกข้อมูลครูผู้สอน", life: 10000 })
      return false
    } else {
      return true
    }
  }
  handleChange(event) {
    this.setState({
      first_teacher: event.target.value,
    })
  }
  handleChangeSec(event) {
    this.setState({
      sec_teacher: event.target.value,
    })
  }
  handleChangeRoom(event) {
    this.setState({
      period_room: event.target.value,
    })
  }
  _handleClose = () => this.props.onClose()

  checkBuildingRoom = (item) => {
    this.setState({}, async () => {
      let room = await room_model.getRoomBy({
        building_table_uuid: item,
      })
      this.setState({
        room: room.data,
      })
    })
  }

  render() {
    return (
      <>
        <Toast ref={(el) => (this.toast = el)} />
        <Dialog
          className="z-auto"
          header="เพิ่มไซต์งาน"
          visible={this.props.show}
          style={{ width: "85vh", height: "85vh" }}
          onHide={() => this._handleClose()}
          draggable={false}
          footer={() => (
            <>
              <Button type="button" color="success" onClick={this._handleSave}>
                ยืนยัน
              </Button>
              <Button type="button" onClick={this._handleClose} color="danger">
                ยกเลิก
              </Button>
            </>
          )}
        >
          <Row>
            <Col md={6}>
              <label htmlFor="username">ชื่อไซต์งาน</label>
              <br />
              <InputText
                id="username"
                className="p-inputtext-sm w-15rem"
                value={this.state.site_name}
                onChange={(e) => this.setState({ site_name: e.target.value })}
                placeholder="กรุณาระบุชื่อไซต์งาน"
              />
            </Col>
            
          </Row>

          <hr className="opacity-50" />
          <Row>
            <Col md={6}>
            <label htmlFor="username">จังหวัด</label>
              <br />
              <Dropdown
                value={this.state.period_room}
                onChange={(e) => this.handleChangeRoom(e)}
                options={this.state.room}
                optionLabel={(item) => `${item.room_code} ${item.room_name}  `}
                optionValue="room_code"
                placeholder="ห้องที่สอน"
                className=" p-inputtext-sm col-12 p-0"
                style={{ height: "2.5rem" }}
                filter
                showClear
              />
            </Col>
            <Col md={6}>
            <label htmlFor="username">อำเภอ</label>
              <br />
              <Dropdown
                value={this.state.period_room}
                onChange={(e) => this.handleChangeRoom(e)}
                options={this.state.room}
                optionLabel={(item) => `${item.room_code} ${item.room_name}  `}
                optionValue="room_code"
                placeholder="ห้องที่สอน"
                className=" p-inputtext-sm col-12 p-0"
                style={{ height: "2.5rem" }}
                filter
                showClear
              />
            </Col>
          </Row>
          <Row>
          <Col md={6}>
            <label htmlFor="username">ตำบล</label>
              <br />
              <Dropdown
                value={this.state.period_room}
                onChange={(e) => this.handleChangeRoom(e)}
                options={this.state.room}
                optionLabel={(item) => `${item.room_code} ${item.room_name}  `}
                optionValue="room_code"
                placeholder="ห้องที่สอน"
                className=" p-inputtext-sm col-12 p-0"
                style={{ height: "2.5rem" }}
                filter
                showClear
              />
            </Col>
            <Col md={6}>
              <label htmlFor="username">รหัสไปรษณีย์</label>
              <br />
              <InputText
                id="username"
                className="p-inputtext-sm w-18rem"
                value={this.state.site_name}
                onChange={(e) => this.setState({ site_name: e.target.value })}
                placeholder="กรุณาระบุชื่อไซต์งาน"
                disabled
              />
            </Col>
          </Row>
          <Row>
          <Col md={6}>
              <label htmlFor="username">ละติจูด</label>
              <br />
              <InputText
                id="username"
                className="p-inputtext-sm w-18rem"
                value={this.state.site_name}
                onChange={(e) => this.setState({ site_name: e.target.value })}
                placeholder="กรุณาระบุชื่อไซต์งาน"
              />
            </Col>
            <Col md={1}>
            <label htmlFor="username">ลองจิจูด</label>
            </Col>
            <Col md={5}>
              <InputText
                id="username"
                className="p-inputtext-sm w-18rem"
                value={this.state.site_name}
                onChange={(e) => this.setState({ site_name: e.target.value })}
                placeholder="กรุณาระบุชื่อไซต์งาน"
              />
            </Col>
          </Row>
          <Row>
            <Col md = {3}>
            <InputTextarea
                id="username"
                className="p-inputtext-sm w-18rem"
                value={this.state.site_name}
                onChange={(e) => this.setState({ site_name: e.target.value })}
                placeholder="กรุณาระบุชื่อไซต์งาน"
              />
            </Col>
          </Row>
        </Dialog>
      </>
    )
  }
}

export default InsertModal
