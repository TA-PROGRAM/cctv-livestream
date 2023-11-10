import React from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { Card, Button, InputText, DataTable, Column, Menu } from "primereact"
import { Breadcrumbs, Typography } from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Loading } from "../../component/customComponent"
import { SiteModel } from "../../model"
import InsertModal from "./insert.modal"
// import {UpdateModal} from "./update.modal"
const site_model = new SiteModel()

class ViewComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show_ins: false,
      show_update: false,
      show_detail: false,
      loading: true,
      value1 : '10'
    }
  }
  async componentDidMount() {
    this._fetchData()
  }
  _fetchData = () =>
    this.setState({ loading: true }, async () => {
      let site = await site_model.getSiteBy()
      this.setState({
        site:site.data,
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
          const res = await year_class_model.deleteSiteById({
            site_table_uuid: code,
          })
          if (res.require) {
            Swal.fire({
              title: "ลบรายการแล้ว !",
              text: "",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            }).then((v) => {
              this._fetchData()
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
              <Button
                icon="pi pi-plus"
                type="submit"
                style={{ display: "flex", marginLeft: "auto" }}
                className={"border-round-md h-2rem"}
                onClick = {()=> this.setState({show_ins:true})}
                label="เพิ่มไซต์งาน"
                severity="primary"
                rounded
                size="small"
              />
          </span>
        ) : null}
      </div>
    )
    let items = []
    if (permission_view == "1" || true) {
      items.push({
        label: "รายละเอียด",
        icon: "pi pi-plus",
        command: () => {
          this.props.history.push(`/year-class/detail/${this.state.idSet}`)
        },
      })
    }
    if (permission_edit == "1" || true) {
      items.push({
        label: "แก้ไข",
        icon: "pi pi-user-edit",
        command: () => {
          this.props.history.push(`/update.modal/update/${this.state.idSet}`)
        },
      })
    }
    if (permission_delete == "1" || true) {
      items.push({
        label: "ลบ",
        icon: "pi pi-times",
        command: () => {
          this._onDelete(this.state.idSet)
        },
      })
    }

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
        <Card title="จัดการไซต์งาน / Manage Site " subTitle={<hr className="opacity-50" />} className={"shadow-3 "}>
          <DataTable
            value={this.state?.site}
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
                      this.setState({ idSet: rowData.site_table_uuid })
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

          show={this.state.show_ins}
          onClose ={()=> this.setState({show_ins:false})}
        />
      </>
    )
  }
}

export default ViewComponent
