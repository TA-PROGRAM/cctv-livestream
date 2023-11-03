import { BaseFetch } from "../main-model"
export default class SiteModel extends BaseFetch {
    getSiteBy = (data) =>
    this.authFetch({
      url: "site/getSiteBy",
      method: "POST",
      body: JSON.stringify(data),
    })
    getSiteById = (data) =>
    this.authFetch({
      url: "site/getSiteById",
      method: "POST",
      body: JSON.stringify(data),
    })
    updateSiteById = (data) =>
    this.authFetch({
      url: "site/updateSiteById",
      method: "POST",
      body: JSON.stringify(data),
    })
    insertSite = (data) =>
    this.authFetch({
      url: "site/insertSite",
      method: "POST",
      body: JSON.stringify(data),
    })
    deleteSiteById = (data) =>
    this.authFetch({
      url: "site/deleteSiteById",
      method: "POST",
      body: JSON.stringify(data),
    })
}
