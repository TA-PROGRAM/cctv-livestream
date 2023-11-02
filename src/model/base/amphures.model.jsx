import { BaseFetch } from "../main-model"
export default class AmphuresModel extends BaseFetch {
    getAmphuresBy = (data) =>
    this.authFetch({
      url: "amphures/getAmphuresBy",
      method: "POST",
      body: JSON.stringify(data),
    })
    getAmphuresById = (data) =>
    this.authFetch({
      url: "amphures/getAmphuresById",
      method: "POST",
      body: JSON.stringify(data),
    })
    getAmphuresByProvinceId = (data) =>
    this.authFetch({
      url: "amphures/getAmphuresByProvinceId",
      method: "POST",
      body: JSON.stringify(data),
    })
    updateAmphuresById = (data) =>
    this.authFetch({
      url: "amphures/updateAmphuresById",
      method: "POST",
      body: JSON.stringify(data),
    })
    insertAmphures = (data) =>
    this.authFetch({
      url: "amphures/insertAmphures",
      method: "POST",
      body: JSON.stringify(data),
    })
    deleteAmphuresById = (data) =>
    this.authFetch({
      url: "amphures/deleteAmphuresById",
      method: "POST",
      body: JSON.stringify(data),
    })
}
