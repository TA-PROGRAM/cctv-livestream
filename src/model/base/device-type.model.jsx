import { BaseFetch } from "../main-model"
export default class DeviceTypeModel extends BaseFetch {
    getDeviceTypeBy = (data) =>
    this.authFetch({
      url: "device-type/getDeviceTypeBy",
      method: "POST",
      body: JSON.stringify(data),
    })
    getDeviceTypeById = (data) =>
    this.authFetch({
      url: "device-type/getDeviceTypeById",
      method: "POST",
      body: JSON.stringify(data),
    })
    updateDeviceTypeById = (data) =>
    this.authFetch({
      url: "device-type/updateDeviceTypeById",
      method: "POST",
      body: JSON.stringify(data),
    })
    insertDeviceType = (data) =>
    this.authFetch({
      url: "device-type/insertDeviceType",
      method: "POST",
      body: JSON.stringify(data),
    })
    deleteDeviceTypeById = (data) =>
    this.authFetch({
      url: "device-type/deleteDeviceTypeById",
      method: "POST",
      body: JSON.stringify(data),
    })
}
