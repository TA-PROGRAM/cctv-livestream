import { BaseFetch } from "../main-model"
export default class AddressModel extends BaseFetch {
    getAddressBy = (data) =>
    this.authFetch({
      url: "address/getAddressBy",
      method: "POST",
      body: JSON.stringify(data),
    })
    getAddressById = (data) =>
    this.authFetch({
      url: "address/getAddressById",
      method: "POST",
      body: JSON.stringify(data),
    })
    updateAddressById = (data) =>
    this.authFetch({
      url: "address/updateAddressById",
      method: "POST",
      body: JSON.stringify(data),
    })
    insertAddress = (data) =>
    this.authFetch({
      url: "address/insertAddress",
      method: "POST",
      body: JSON.stringify(data),
    })
    deleteAddressById = (data) =>
    this.authFetch({
      url: "address/deleteAddressById",
      method: "POST",
      body: JSON.stringify(data),
    })
}
