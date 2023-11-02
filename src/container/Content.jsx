import React, { Suspense } from "react"
import { useHistory } from "react-router-dom"
import { Route, Switch } from "react-router-dom"
import routes from "../routes"
import Page401 from '../views/pages/page401/page401';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = (props) => {
  const history = useHistory()
  const { PERMISSIONS, USER } = props
  const _generatePermission = (data) =>
    PERMISSIONS.find((item) => item.menu_name == data.key) || {
      permission_view: false,
      permission_add: false,
      permission_edit: false,
      permission_approve: false,
      permission_cancel: false,
      permission_delete: false,
    }
  return (
    <Suspense fallback={loading}>
      <Switch>
        {routes.map((route, idx) => {
          let PERMISSION = _generatePermission({ key: route.key })
          if (!PERMISSION.permission_view && false) {
            // Redirect to the unauthorized page
            return (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={() => {
                  history.push("/") 
                  return null 
                }}
              />
            )
          }
          return (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => (
                  <route.component {...props} SESSION={{ USER, PERMISSION }} />
                )}
              />
            )
          )
        })}
        <Route component={Page401} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(TheContent)
