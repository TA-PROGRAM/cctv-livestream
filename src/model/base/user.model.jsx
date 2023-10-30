import { BaseFetch } from "../main-model";
export default class UserModel extends BaseFetch {
  checkLogin = (data) =>
    this.directFetch({
      url: "user/checkLogin",
      method: "POST",
      body: JSON.stringify(data),
    });
  checkUser = (data) =>
    this.authFetch({
      url: "user/checkUser",
      method: "POST",
      body: JSON.stringify(data),
    });
  getUserBy = (data) =>
    this.authFetch({
      url: "user/getUserBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  getUserById = (data) =>
    this.authFetch({
      url: "user/getUserById",
      method: "POST",
      body: JSON.stringify(data),
    });
  insertUser = (data) =>
    this.authFetch({
      url: "user/insertUser",
      method: "POST",
      body: JSON.stringify(data),
    });
  updateUserById = (data) =>
    this.authFetch({
      url: "user/updateUserById",
      method: "POST",
      body: JSON.stringify(data),
    });
  deleteUserById = (data) =>
    this.authFetch({
      url: "user/deleteUserById",
      method: "POST",
      body: JSON.stringify(data),
    });
}
