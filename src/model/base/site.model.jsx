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
    getAddeersById = (data) =>
    this.authFetch({
      url: "site/getAddeersById",
      method: "POST",
      body: JSON.stringify(data),
    })
    insertSiteAddress = (data) =>
    this.authFetch({
      url: "site/insertSiteAddress",
      method: "POST",
      body: JSON.stringify(data),
    })
    updateSiteAddressById = (data) =>
    this.authFetch({
      url: "site/updateSiteAddressById",
      method: "POST",
      body: JSON.stringify(data),
    })
    getSiteCheckBy = (data) =>
    this.authFetch({
      url: "site/getSiteCheckBy",
      method: "POST",
      body: JSON.stringify(data),
    })
}
