import React from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { Card, Button, InputText, DataTable, Column, Menu, Dialog, Toast } from "primereact"
import { Breadcrumbs, Typography } from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Loading } from "../../component/customComponent"
import { DeviceModel } from "../../model"
//เพิ่มจุดนี้
import InsertModal from "./insert.modal"

const device_model = new DeviceModel()

class ViewComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      device_table_uuid: "",
    }
  }

  async componentDidMount() {
    this._fetchData()
  }
  _fetchData = () =>
    this.setState({ loading: true }, async () => {
      let device = await device_model.getDeviceBy()
      this.setState({
        device: device.data,
        loading: false,
      })
    })

  _onDelete = (code) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่ ?",
      text: "ยืนยันลบรายการนี้",
      icon: "warning",
      showCancelButton: true,
    }).then(({ value }) => {
      value &&
        this.setState({ loading: false }, async () => {
          const res = await device_model.deleteDeviceById({
            device_table_uuid: code,
          })
          if (res.require) {
            this.toast.show(
              {
                severity: "info",
                summary: "ลบข้อมูล",
                detail: "ลบข้อมูลสำเร็จ",
                life: 3000,
              },
              this._fetchData()
            )
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
                })
              }
            )
          }
        })
    })
  }
  statusBodyTemplate(rowData) {
    let statusText
    let statusStyle

    if (rowData.is_active === 1) {
      statusText = "ใช้งาน"
      statusStyle = { color: "green" }
    } else if (rowData.is_active === 2) {
      statusText = "ไม่ได้ใช้งาน"
      statusStyle = { color: "red" }
    }

    return (
      <span className="status-cell" style={statusStyle}>
        {statusText}
      </span>
    )
  }
  onRowSelect = (event) => {
    this.props.history.push(`/device/detail/${event.data.device_table_uuid}`)
    this.setState({
      selectedProduct: event.data,
    })
  }

  render() {
    const { permission_delete, permission_edit, permission_view, permission_add } = this.props.PERMISSION

    const header = (
      <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
        <span className="p-input-icon-right">
          <i className="pi pi-search" />
          <InputText
            className={"border-round-3xl"}
            type="search"
            onInput={(e) => this.setState({ global_filter: e.target.value })}
            placeholder="Search..."
          />
        </span>
        {permission_add === 1 || true ? (
          <span>
            <Link style={{ textDecoration: "none" }} to="/device/insert">
              <Button
                icon="pi pi-plus"
                type="submit"
                style={{ display: "flex", marginLeft: "auto" }}
                className={"border-round-md h-2rem"}
                onClick={() => this.setState({ show_ins: true, device_table_uuid: "" })}
                label="เพิ่มอุปกรณ์"
                severity="primary"
                rounded
                size="small"
              />
            </Link>
          </span>
        ) : null}
      </div>
    )
    let items = []
    if (permission_view === 1 || true) {
      items.push({
        label: "รายละเอียด",
        icon: "pi pi-plus",
        command: () => {
          this.props.history.push(`/device/detail/${this.state.device_table_uuid}`)
        },
      })
    }
    if (permission_edit === 1 || true) {
      items.push({
        label: "แก้ไข",
        icon: "pi pi-user-edit",
        command: () => {
          this.setState({ device_table_uuid: this.state.device_table_uuid, show_ins: true })
        },
      })
    }
    if (permission_delete === 1 || true) {
      items.push({
        label: "ลบ",
        icon: "pi pi-times",
        command: () => {
          this._onDelete(this.state.device_table_uuid)
        },
      })
    }

    return (
      <>
        <Loading show={this.state.loading} />
        <Toast ref={(el) => (this.toast = el)} />
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.6)" }} to="/">
            หน้าหลัก
          </Link>
          <Typography component="div" style={{ fontWeight: "bold" }}>
            จัดการอุปกรณ์
          </Typography>
        </Breadcrumbs>

        <Card title="จัดการอุปกรณ์ / manage device" subTitle={<hr className="opacity-50" />} className={"shadow-3"}>
          <DataTable
            value={this.state?.device}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={10}
            selectionMode="single"
            selection={this.state.selectedProduct}
            onSelectionChange={(e) => this.setState({ selectedProduct: e.value })}
            onRowSelect={this.onRowSelect}
            rowsPerPageOptions={[10, 20, 30, 50]}
            header={header}
            globalFilter={this.state.global_filter}
            size="small"
            className={"text-center"}
          >
            <Column field="" header="ลำดับ" body={(row, idx) => idx.rowIndex + 1}></Column>
            <Column field="device_name" sortable header="ชื่ออุปกรณ์"></Column>
            <Column field="site_name" sortable header="ชื่อไซต์"></Column>
            <Column field="is_active" body={this.statusBodyTemplate} sortable header="สถานะ"></Column>
            <Column
              field=""
              header="การจัดการ"
              body={(rowData) => (
                <div>
                  <Menu model={items} popup ref={(el) => (this.menu = el)} id="popup_menu" />
                  <Button
                    label=""
                    icon="pi pi-ellipsis-h"
                    className="p-button-sm p-button-outlined p-button-secondary"
                    style={{ height: "0.5rem", weight: "0.5rem" }}
                    onClick={(event) => {
                      this.menu.toggle(event)
                      this.setState({ device_table_uuid: rowData.device_table_uuid })
                    }}
                    aria-controls="popup_menu"
                    aria-haspopup
                  />
                </div>
              )}
            />
          </DataTable>
        </Card>
        <InsertModal
          id={this.state.device_table_uuid}
          user={this.props.USER.username}
          show={this.state.show_ins}
          onClose={() => this.setState({ show_ins: false }, () => this._fetchData())}
        />
      </>
    )
  }
}

export default ViewComponent
