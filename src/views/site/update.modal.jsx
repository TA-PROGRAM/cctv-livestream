import React from "react"
import {
  Button,
  Row,
  Col,
} from "reactstrap"
import { Dropdown, Dialog ,Toast} from "primereact"
import Swal from "sweetalert2"
import { UpdateModel, RoomModel, BuildingModel } from "../../../models"
const staff_model = new UpdateModel()
const room_model = new RoomModel()
const building_model = new BuildingModel()
class UpdateModal extends React.Component {
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
    let staff = await staff_model.getUpdateBy()
    let building = await building_model.getBuildingBy()
    console.log(building);
    this.setState({
      file_note: "",
      staff: staff.data,
      building: building.data,
      first_teacher: "",
      sec_teacher: "",
      period_room: "",
    })
  }

  _handleSave = () => {
    if(this.checksave()){
    this.props.onSave({
      first_teacher: this.state.first_teacher,
      sec_teacher: this.state.sec_teacher,
      period_room: this.state.period_room,
    })
    this._handleClose()
  }
  }
  checksave = () => {
    if(this.state.first_teacher == ''){
      this.toast.show({severity:'warn', summary: 'โปรดกรอกข้อมูลให้ครบถ้วน', detail:'เลือกข้อมูลครูผู้สอน', life: 3000});
      return false
    }
    else{
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
      });
      this.setState({
        room: room.data,
      });
    });
  };

  render() {
    return (
      <>
        <Toast ref={(el) => this.toast = el} />
        <Dialog
          className="absolute"
          header="เลือกผู้สอน"
          visible={this.props.show}
          style={{ width: "50vw" }}
          onHide={() => this._handleClose()}
          draggable={false}
          footer={() => (
            <>
              <Button
                type="button"
                color="success"
                onClick={this._handleSave}
              >
                ยืนยัน
              </Button>
              <Button
                type="button"
                onClick={this._handleClose}
                color="danger"
              >
                ยกเลิก
              </Button>
            </>
          )}
        >
          <Row>
            <Col md={12}>
              <Row>
                <Col md={3}>
                  <Dropdown
                    value={this.state.first_teacher}
                    onChange={(e) => this.handleChange(e)}
                    options={this.state.staff}
                    optionLabel={(item) => `${item.first_name} ${item.last_name}`}
                    optionValue="staff_table_uuid"
                    placeholder="อาจารย์คนที่ 1"
                    className="p-inputtext-sm col-12 p-0"
                    style={{ height: "2.5rem" }}
                    filter
                    showClear 
                  />
                </Col>
                <Col md={3}>
                  <Dropdown
                    value={this.state.sec_teacher}
                    onChange={(e) => this.handleChangeSec(e)}
                    options={this.state.staff}
                    optionLabel={(item) => `${item.first_name} ${item.last_name}`}
                    optionValue="staff_table_uuid"
                    placeholder="อาจารย์คนที่ 2"
                    className="p-inputtext-sm col-12 p-0"
                    style={{ height: "2.5rem" }}
                    filter
                    showClear 
                  />
                </Col>
                <Col md={3}>
                  <Dropdown
                    style={{ height: "2.5rem" }}
                    className={"p-inputtext-sm col-12 p-0"}
                    value={this.state.building_table_uuid}
                    options={this.state.building}
                    onChange={(e) => {
                      this.checkBuildingRoom(e.target.value);
                      this.setState({
                        building_table_uuid: e.target.value,
                      });
                    }}
                    optionLabel="building_name"
                    optionValue="building_table_uuid"
                    //showClear
                    filter
                    placeholder="เลือกอาคารสอน"
                    required
                    showClear 

                  />
                </Col>
                <Col md={3}>
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
            </Col>
          </Row>
        </Dialog>
      </>


    )
  }
}

export default UpdateModal
