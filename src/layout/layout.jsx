import React, { createContext, useEffect, useState } from "react"
// import {
//   TheContent,
//   AppSidebar,
//   // AppTopbar,
// } from "./index"

import { AuthConsumer } from "../role-access/authContext"
const Login = React.lazy(() => import("../views/pages/Login"))
export const DataContext = createContext()
const TheLayout = () => {
  const [data, setData] = useState(0)
  const setDataFromChild = (newData) => {
    setData(newData)
  }
  return (
    <AuthConsumer>
      {({ authenticated, user, permissions }) =>
        authenticated ? (
          <div>
            <AppSidebar PERMISSIONS={permissions} USER={user}  />
            {/* <TheFooter /> */}
          </div>
        ) : (
          <Login />
        )
      }
    </AuthConsumer>
  )
}

export default TheLayout