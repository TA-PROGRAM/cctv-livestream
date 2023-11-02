import { BaseFetch } from "../main-model"
export default class CompanyModel extends BaseFetch {
    getCompanyBy = (data) =>
    this.authFetch({
      url: "company/getCompanyBy",
      method: "POST",
      body: JSON.stringify(data),
    })
    getCompanyById = (data) =>
    this.authFetch({
      url: "company/getCompanyById",
      method: "POST",
      body: JSON.stringify(data),
    })
    updateCompanyById = (data) =>
    this.authFetch({
      url: "company/updateCompanyById",
      method: "POST",
      body: JSON.stringify(data),
    })
    insertCompany = (data) =>
    this.authFetch({
      url: "company/insertCompany",
      method: "POST",
      body: JSON.stringify(data),
    })
    deleteCompanyById = (data) =>
    this.authFetch({
      url: "company/deleteCompanyById",
      method: "POST",
      body: JSON.stringify(data),
    })
}
