import { BaseFetch } from "../main-model"
export default class ProvincesModel extends BaseFetch {
    getProvincesBy = (data) =>
    this.authFetch({
      url: "provinces/getProvincesBy",
      method: "POST",
      body: JSON.stringify(data),
    })
    getProvincesById = (data) =>
    this.authFetch({
      url: "provinces/getProvincesById",
      method: "POST",
      body: JSON.stringify(data),
    })
    updateProvincesById = (data) =>
    this.authFetch({
      url: "provinces/updateProvincesById",
      method: "POST",
      body: JSON.stringify(data),
    })
    insertProvinces = (data) =>
    this.authFetch({
      url: "provinces/insertProvinces",
      method: "POST",
      body: JSON.stringify(data),
    })
    deleteProvincesById = (data) =>
    this.authFetch({
      url: "provinces/deleteProvincesById",
      method: "POST",
      body: JSON.stringify(data),
    })
}
