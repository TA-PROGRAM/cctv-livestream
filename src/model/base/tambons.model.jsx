import { BaseFetch } from "../main-model"
export default class TambonsModel extends BaseFetch {
    getTambonsBy = (data) =>
    this.authFetch({
      url: "tambons/getTambonsBy",
      method: "POST",
      body: JSON.stringify(data),
    })
    getTambonsById = (data) =>
    this.authFetch({
      url: "tambons/getTambonsById",
      method: "POST",
      body: JSON.stringify(data),
    })
    getTambonsByIdAmphures = (data) =>
    this.authFetch({
      url: "tambons/getTambonsByIdAmphures",
      method: "POST",
      body: JSON.stringify(data),
    })
    updateTambonsById = (data) =>
    this.authFetch({
      url: "tambons/updateTambonsById",
      method: "POST",
      body: JSON.stringify(data),
    })
    insertTambons = (data) =>
    this.authFetch({
      url: "tambons/insertTambons",
      method: "POST",
      body: JSON.stringify(data),
    })
    deleteTambonsById = (data) =>
    this.authFetch({
      url: "tambons/deleteTambonsById",
      method: "POST",
      body: JSON.stringify(data),
    })
}
