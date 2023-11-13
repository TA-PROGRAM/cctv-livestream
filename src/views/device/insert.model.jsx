import React from "react"
import { Button, Dropdown, Dialog, Toast, InputText, InputTextarea } from "primereact"
import {
  SiteModel,
  ProvicesModel,
  AmphuresModel,
  TambonsModel,
} from "../../model"
import { Row, Col } from "../../component/customComponent"
import { Link } from "react-router-dom";

let user_local = localStorage.getItem("session-user");
const { username } = JSON.parse(user_local);

const site_model = new SiteModel()
const provinces_model = new ProvicesModel();
const amphures_model = new AmphuresModel();
const tambons_model = new TambonsModel();
class InsertModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidUpdate(props_old) {
    if (!props_old.show && this.props.show) {
      this._fetchData()
    }
  }

  async componentDidMount() {
    this._fetchData();
  }

  _fetchData = (params = { pagination: this.state.pagination }) =>
    this.setState({ loading: true }, async () => {
      let provinces = await provinces_model.getProvincesBy();
      this.setState({
        provinces: provinces.data,
      });

    });

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

  onProvinceChange = (e) => {
    const selectedProvince = e;
    this.setState({}, async () => {
      let amphures = await amphures_model.getAmphuresByProvinceId({
        province_id: selectedProvince,
      });
      let provinces = await provinces_model.getProvincesBy();
      this.setState({
        provinces: provinces.data,
        province_table_uuid: selectedProvince,
        amphures: amphures.data,
        selectedProvince,
      });
    });
  };
  onDistrictChange = (e) => {
    const selectedDistrict = e;
    this.setState({}, async () => {
      let tambons = await tambons_model.getTambonsByIdAmphures({
        amphure_id: selectedDistrict,
      });
      this.setState({
        amphures_table_uuid: selectedDistrict,
        tambons: tambons.data,
      });
    });
  };
  onSubdistrictChange = (e) => {
    const selectedSubdistrict = e;
    this.setState({}, async () => {
      let zip_code_data = await tambons_model.getTambonsById({
        id: selectedSubdistrict,
      });

      this.setState({
        sub_district_table_uuid: selectedSubdistrict,
        zip_code: zip_code_data.data[0].zip_code,
      });
    });
  };

  _handleClose = () => this.props.onClose()

  _onSubmit = (e) => {
    e.preventDefault();
    const siteObject = {
      site_name: this.state.site_name,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      address_table_uuid: this.state.address_table_uuid,
      create_by: username,
    };
    Swal.fire({
      title: "คุณแน่ใจหรือไม่ ?",
      text: "ยืนยันเพิ่มรายการนี้",
      icon: "warning",
      showCancelButton: true,
    }).then(
      ({ value }) => {
        value &&
          this.setState({ loading: false }, async () => {
            const res = await site_model.insertProvinces(siteObject);
            if (res.require) {
              Swal.fire({
                title: "เพิ่มรายการแล้ว !",
                text: "",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              }).then((v) => {
                this.props.history.goBack();
                this._fetchData();
              })
            } else {
              this.setState(
                {
                  loading: false,
                },
                () => {
                  Swal.fire({
                    title: "เกิดข้อผิดพลาด !",
                    text: "ไม่สามารถดำเนินการได้ !",
                    icon: "error",
                  });
                }
              );
            }
          })
      }
    );
  };

  render() {
    return (
      <>
        <form onSubmit={this._onSubmit}>
          <Toast ref={(el) => (this.toast = el)} />
          <Dialog
            className="z-auto"
            header="เพิ่มไซต์งาน"
            visible={this.props.show}
            style={{ width: "85vh", height: "48vh" }}
            onHide={() => this._handleClose()}
            draggable={false}
            footer={() => (
              <>
                <Button
                  type="submit"
                  severity="primary"
                  className={"m-1"}
                  label="บันทึก"
                />
                <Button
                  type=""
                  severity="secondary"
                  className={"m-1"}
                  label="ยกเลิก"
                  onClick={() => this._handleClose()}
                />
              </>
            )}
          >
            <Row>
              <Col md={12}>
                <label htmlFor="username">ชื่ออุปกรณ์</label>
                <br />
                <InputText
                  id="username"
                  className="p-inputtext-sm w-full"
                  value={this.state.site_name}
                  onChange={(e) => this.setState({ site_name: e.target.value })}
                  placeholder="กรุณาระบุชื่ออุปกรณ์"
                  required
                />
              </Col>
            </Row>
            <hr className="opacity-50" />
            <Row>
              <Col md={6}>
                <label htmlFor="username">ชื่อไซต์งาน</label>
                <br />
                <InputText
                  value={this.state.province_table_uuid}
                  style={{ height: "2.5rem" }}
                  className="p-inputtext-sm w-full"
                  options={this.state.provinces}
                  onChange={(e) => {
                    this.onProvinceChange(e.target.value);
                  }}
                  optionLabel="name_th"
                  optionValue="id"
                  placeholder="กรุณาระบุชื่อไซต์งาน"
                  //showClear
                  required
                  filter
                />
              </Col>
              <Col md={6}>
                <label htmlFor="username">ละติจูด</label>
                <br />
                <InputText
                  style={{ height: "2.5rem" }}
                  className={"p-inputtext-sm w-full"}
                  value={this.state.amphures_table_uuid}
                  options={this.state.amphures}
                  onChange={(e) => {
                    this.onDistrictChange(e.target.value);
                  }}
                  optionLabel="name_th"
                  optionValue="id"
                  placeholder="กรุณาระบุละติจูด"
                  //showClear
                  required
                  filter
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <label htmlFor="username">ลองติจูด</label>
                <br />
                <InputText
                  style={{ height: "2.5rem" }}
                  className={"p-inputtext-sm w-full"}
                  value={this.state.sub_district_table_uuid}
                  options={this.state.tambons}
                  onChange={(e) => {
                    this.onSubdistrictChange(e.target.value);
                  }}
                  optionLabel="name_th"
                  optionValue="id"
                  placeholder="กรุณาระบุลองติจูด"
                  //showClear
                  required
                  filter
                />
              </Col>
            </Row>
          </Dialog>
        </form>
      </>
    )
  }
}

export default InsertModal
