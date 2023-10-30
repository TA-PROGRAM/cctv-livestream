import React, { createContext, useEffect, useState } from "react"
import ThePaperbase from "./paperbase"
import TheNavigator from './navigator'

import { AuthConsumer } from "../role-access/authContext"
const Login = React.lazy(() => import("../views/pages/Login"))
export const DataContext = createContext()
const TheLayout = () => {
  const [data, setData] = useState(0)
  const setDataFromChild = (newData) => {
    setData(newData)
  }
  return (
    // <div>
    // </div>
    <AuthConsumer>
      {({ authenticated, user, permissions }) =>
        authenticated ? (
          <div>
            {/* <TheNavigator PERMISSIONS={permissions} USER={user} /> */}
            <TheNavigator/>
            <ThePaperbase />

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