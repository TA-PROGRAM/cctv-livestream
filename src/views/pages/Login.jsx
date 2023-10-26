import { Link } from "react-router-dom"
import { AuthConsumer } from "../../role-access/authContext"
import icon_ta from "../../assets/image/abg.png"
import bg_login from "../../assets/image/zzzz.png" 
import React, { useState } from "react"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Password } from "primereact/password"
import styled from "styled-components"
const Login = () => {
  const [state, setState] = React.useState({
    username: "",
    password: "",
  })

  return (
    <AuthConsumer>     {({ _handleLogin }) => (

        <div className=" flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden" style={{ backgroundImage: `url(${bg_login})`, width: "auto", height: "auto" }}>
          <div className="flex flex-column align-items-center justify-content-center">
            <div
              style={{
                borderRadius: "10%",

              }}
            >

              <div
                className="w-full surface-card py-8 px-5 sm:px-8"
                style={{ borderRadius: "53px", opacity: "0.94" }}
              >
                <form onSubmit={(e) => { e.preventDefault(); _handleLogin(state) }}>
                  <div className="text-center mb-5">
                    <img src={icon_ta} alt="icon_ta" width="200" height="200" className="mb-3" />
                    <div className="text-900 text-2xl font-medium mb-3">
                      ระบบบริหารจัดการข้อมูลสารสนเทศขนาดใหญ่
                    </div>
                    <span className="text-400 font-medium">
                    </span>
                  </div>
                  <div>
                    <label
                      htmlFor="email1"
                      className="block text-900 text-xl font-medium mb-2"
                    >
                      ชื่อผู้ใช้งาน
                    </label>
                    <InputText
                      type="text"
                      placeholder="username"
                      className="w-full md:w-30rem mb-5"
                      style={{ padding: "1rem" }}
                      value={state.username}
                      onChange={(e) => setState({ ...state, username: e.target.value })}

                    />

                    <label
                      htmlFor="password1"
                      className="block text-900 font-medium text-xl mb-2"
                    >
                      รหัสผ่าน
                    </label>
                    <Password
                      className="w-full mb-5"
                      inputClassName="w-full p-3 md:w-30rem"
                      placeholder="password"
                      feedback={false}
                      value={state.password}
                      onChange={(e) =>
                        setState({ ...state, password: e.target.value })
                      }
                      toggleMask
                    ></Password>

                    <div className="flex align-items-center justify-content-between mb-5 gap-5">
                    </div>
                    <LayoutButton>
                      <div className="col-4">
                        <Button
                          type="submit"
                          label="เข้าสู่ระบบ"
                          icon="pi pi-user"
                          color="primary"
                        />
                      </div>
                      <div className="col-5">
                        <Link
                          key={"detail"}
                          to={`/register`}
                          title="ดูรายละเอียด"
                          style={{ textAlign: "center" }}
                        >
                          <Button
                            icon="pi pi-key"
                            color="primary"
                            label="ลืมรหัสผ่าน"
                          />
                        </Link>
                      </div>
                    </LayoutButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthConsumer>
  )
}
export default Login

export const LayoutButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-left: 1rem;
`

export const Button1 = styled.button`
  color: red !important;
`
