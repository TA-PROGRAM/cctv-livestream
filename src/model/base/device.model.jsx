import { BaseFetch } from "../main-model"
export default class DeviceModel extends BaseFetch {
    getDeviceBy = (data) =>
    this.authFetch({
      url: "device/getDeviceBy",
      method: "POST",
      body: JSON.stringify(data),
    })
    getDeviceById = (data) =>
    this.authFetch({
      url: "device/getDeviceById",
      method: "POST",
      body: JSON.stringify(data),
    })
    updateDeviceById = (data) =>
    this.authFetch({
      url: "device/updateDeviceById",
      method: "POST",
      body: JSON.stringify(data),
    })
    insertDevice = (data) =>
    this.authFetch({
      url: "device/insertDevice",
      method: "POST",
      body: JSON.stringify(data),
    })
    deleteDeviceById = (data) =>
    this.authFetch({
      url: "device/deleteDeviceById",
      method: "POST",
      body: JSON.stringify(data),
    })
}
