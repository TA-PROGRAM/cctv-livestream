import { BaseFetch } from "../main-model"
export default class RoleModel extends BaseFetch {
  getRoleBy = (data) =>
    this.authFetch({
      url: "role/getRoleBy",
      method: "POST",
      body: JSON.stringify(data),
    })
  getRoleById = (data) =>
    this.authFetch({
      url: "role/getRoleById",
      method: "POST",
      body: JSON.stringify(data),
    })
    updateRoleById = (data) =>
    this.authFetch({
      url: "role/updateRoleById",
      method: "POST",
      body: JSON.stringify(data),
    })
    insertRole = (data) =>
    this.authFetch({
      url: "role/insertRole",
      method: "POST",
      body: JSON.stringify(data),
    })
    deleteRoleById = (data) =>
    this.authFetch({
      url: "role/deleteRoleById",
      method: "POST",
      body: JSON.stringify(data),
    })
}
