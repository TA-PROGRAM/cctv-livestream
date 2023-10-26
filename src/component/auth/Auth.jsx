import React, { Component } from "react"
import Swal from "sweetalert2"
import jwt_decode from "jwt-decode"
import { AuthProvider } from "../../role-access/authContext"
import Authoring from "./Authoring"
import { UserModel } from "../../model"
import { token } from "../../config/access-token"

const user_model = new UserModel()

class Auth extends Component {
  state = {
    authcertifying: true,
    authenticated: false,
    permissions: [],
    user: {},
  }
  componentDidMount() {
    this._initiateAuthentication()
  }

  _checkLogin = async ({ username, password }) => {
    const res_login = await user_model.checkLogin({ username, password })
    if (res_login.require === false) {
      this.setState({ authcertifying: false }, () => {
        Swal.fire({
          title: "ไม่สามารถล็อคอินได้ !",
          text: "คำขอเกิดข้อผิดพลาด",
          icon: "error",
        })
      })
    } else if (res_login.data.length === 0) {
      this.setState({ authcertifying: false }, () => {
        Swal.fire({
          title: "ไม่สามารถล็อคอินได้ !",
          text: "โปรดตรวจสอบชื่อผู้ใช้และรหัสผ่านของคุณ",
          icon: "warning",
        })
      })
    } else {
      try {
        localStorage.setItem("x-access-token", res_login.x_access_token)
        localStorage.setItem("session-user", JSON.stringify(res_login.data[0]))
        localStorage.setItem("p", password)
        localStorage.setItem("school_table_uuid", res_login.school_table_uuid)
        token["x-access-token"] = res_login.x_access_token
        const { permissions } = jwt_decode(res_login.permissions_token)

        this.setState({
          authcertifying: false,
          authenticated: true,
          permissions: permissions || [],
          user: res_login.data[0],
        })
      } catch (e) {
        this.setState(
          {
            authcertifying: false,
          },
          () => {
            console.log("_checkLogin ", e)
          }
        )
      }
    }
  }
  _initiateAuthentication = () => {
    try {
      const serialized = localStorage.getItem("session-user")
      const password = localStorage.getItem("p")
      if (serialized) {
        const { username } = JSON.parse(serialized)
        this._checkLogin({ username, password })
      } else {
        this.setState({ authcertifying: false })
      }
    } catch (e) {
      this.setState(
        {
          authcertifying: false,
        },
        () => {
          localStorage.clear()

          console.log("_initiateAuthentication ", e)
        }
      )
    }
  }
  _handleLogin = (data) =>
    !this.state.authcertifying &&
    this.setState({ authcertifying: true }, () => {
      this._checkLogin(data)})
  _handleLogout = () => {
    try {
      localStorage.clear()
      window.location.reload()
    } catch (e) {
      console.log("_handleLogout ", e)
    }
  }

  render() {
    return (
      <AuthProvider
        value={{
          ...this.state,
          _handleLogin: this._handleLogin,
          _handleLogout: this._handleLogout,
          _initiateAuthentication: this._initiateAuthentication,
        }}
      >
        {this.state.authcertifying ? <Authoring /> : this.props.children}
      </AuthProvider>
    )
  }
}

export default Auth
