import React from "react"
import { Button, Dropdown, Dialog, Toast, InputText, InputTextarea } from "primereact"
import {
  SiteModel,
  ProvicesModel,
  AmphuresModel,
  TambonsModel,
} from "../../model"
import { Row, Col } from "../../component/customComponent"
import Swal from "sweetalert2"
import { Link } from "react-router-dom";
import './swal.css';

let user_local = localStorage.getItem("session-user");
const { username } = JSON.parse(user_local);

const site_model = new SiteModel()
const provinces_model = new ProvicesModel();
const amphures_model = new AmphuresModel();
const tambons_model = new TambonsModel();
class UpdateModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      site_name: '',
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

  onProvinces = (e) => {
    const selectProvince = e;
    this.setState({}, async () => {
      let amphures = await amphures_model.getAmphuresByProvinceId({
        provinces_id: selectProvince,
      });
      let provinces = await provinces_model.getProvincesBy();
      this.setState({
        provinces: provinces.data,
        provinces_table_uuid: selectProvince,
        amphures: amphures.data,
        selectProvince,
      });
    });
  };
  onAmphures = (e) => {
    const selectAmphures = e;
    this.setState({}, async () => {
      let tambons = await tambons_model.getTambonsByIdAmphures({
        amphures_id: selectAmphures,
      });
      this.setState({
        amphures_table_uuid: selectAmphures,
        tambons: tambons.data,
      });
    });
  };
  onTambons = (e) => {
    const selectTambons = e;
    this.setState({}, async () => {
      let zip_code_data = await tambons_model.getTambonsById({
        id: selectTambons,
      });

      this.setState({
        tambons_table_uuid: selectTambons,
        zip_code: zip_code_data.data[0].zip_code,
      });
    });
  };

  _handleClose = () => this.props.onClose()

  _onSubmit = (e) => {
    e.preventDefault();
    const siteObject = {
      site_name: this.state.site_name,
      address_table_uuid: this.state.address_table_uuid,
      provinces_table_uuid: this.state.provinces_table_uuid,
      amphures_table_uuid: this.state.amphures_table_uuid,
      tambons_table_uuid: this.state.tambons_table_uuid,
      zip_code: this.state.zip_code,
      create_by: username,
    };
    console.log('siteObject :>> ', siteObject);
    if (this._checkSubmit()) {
      Swal.fire({
        title: "คุณแน่ใจหรือไม่ ?",
        text: "ยืนยันเพิ่มรายการนี้",
        icon: "warning",
        showCancelButton: true,
        customClass: {
          container: 'swal2-container',
        },
      }).then(({ value }) => {
        value && this.setState({ loading: false }, async () => {
          const res = await site_model.insertSiteAddress(siteObject);
          if (res.require) {
            Swal.fire({
              title: "เพิ่มรายการแล้ว !",
              text: "",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
              customClass: {
                container: 'swal2-container',
              },
            }).then((v) => {
              this._handleClose();
              window.location.reload();
            });
          } else {
            this.setState({ loading: false }, () => {
              Swal.fire({
                title: "เกิดข้อผิดพลาด !",
                text: "ไม่สามารถดำเนินการได้ !",
                icon: "error",
                customClass: {
                  container: 'swal2-container',
                },
              });
            });
          }
        });
      });
    }
  };

  _checkSubmit() {
    if (
      this.state.site_name === "" ||
      this.state.site_name === undefined
    ) {
      Swal.fire({
        title: "กรุณาระบุชื่อไซต์งาน",
        icon: "warning",
      });
      return false;
    }
    if (
      this.state.provinces_table_uuid === "" ||
      this.state.provinces_table_uuid === undefined
    ) {
      Swal.fire({
        title: "กรุณาเลือกจังหวัด !!!",
        icon: "warning",
      });
      return false;
    }
    if (
      this.state.amphures_table_uuid === "" ||
      this.state.amphures_table_uuid === undefined
    ) {
      Swal.fire({
        title: "กรุณาเลือกอำเภอ",
        icon: "warning",
      });
      return false;
    }
    if (
      this.state.tambons_table_uuid === "" ||
      this.state.tambons_table_uuid === undefined
    ) {
      Swal.fire({
        title: "กรุณาเลือกตำบล",
        icon: "warning",
      });
      return false;
    }
    else {
      return true;
    }
  }

  render() {
    return (
      <>
        <Toast ref={(el) => (this.toast = el)} />
        <Dialog
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
                onClick={this._onSubmit}
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
              <label htmlFor="username">ชื่อไซต์งาน</label>
              <br />
              <InputText
                id="username"
                className="p-inputtext-sm w-full"
                value={this.state.site_name}
                onChange={(e) => this.setState({ site_name: e.target.value })}
                placeholder="กรุณาระบุชื่อไซต์งาน"
                required
              />
            </Col>
          </Row>
          <hr className="opacity-50" />
          <Row>
            <Col md={6}>
              <label htmlFor="username">จังหวัด</label>
              <br />
              <Dropdown
                value={this.state.provinces_table_uuid}
                style={{ height: "2.5rem" }}
                className={"p-inputtext-sm col-12 p-0"}
                options={this.state.provinces}
                onChange={(e) => {
                  this.onProvinces(e.target.value);
                }}
                optionLabel="name_th"
                optionValue="id"
                placeholder="เลือกจังหวัด"
                required
                filter
              />
            </Col>
            <Col md={6}>
              <label htmlFor="username">อำเภอ</label>
              <br />
              <Dropdown
                style={{ height: "2.5rem" }}
                className={"p-inputtext-sm col-12 p-0"}
                value={this.state.amphures_table_uuid}
                options={this.state.amphures}
                onChange={(e) => {
                  this.onAmphures(e.target.value);
                }}
                optionLabel="name_th"
                optionValue="id"
                placeholder="เลือกอำเภอ"
                required
                filter
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <label htmlFor="username">ตำบล</label>
              <br />
              <Dropdown
                style={{ height: "2.5rem" }}
                className={"p-inputtext-sm col-12 p-0"}
                value={this.state.tambons_table_uuid}
                options={this.state.tambons}
                onChange={(e) => {
                  this.onTambons(e.target.value);
                }}
                optionLabel="name_th"
                optionValue="id"
                placeholder="เลือกตำบล"
                required
                filter
              />
            </Col>
            <Col md={6}>
              <label htmlFor="username">รหัสไปรษณีย์</label>
              <br />
              <InputText
                type="text"
                style={{ height: "2.5rem" }}
                className={"p-inputtext-sm col-12"}
                inputid="locale-user"
                value={this.state.zip_code || ""}
                onChange={(e) =>
                  this.setState({ zip_code: e.target.value })
                }
                disabled
              />
            </Col>
          </Row>
        </Dialog>
      </>
    )
  }
}

export default UpdateModal
