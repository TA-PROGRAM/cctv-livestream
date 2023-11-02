import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import "./style"
import Auth from "./component/auth/Auth"
const TheLayout = React.lazy(() => import("./container/layout"))

class App extends Component {
  render() {
    return (
      <Auth>
        <BrowserRouter>
          <React.Suspense>
            <Switch>
              <Route
                exact
                path="/401"
                name="Page 401"
                render={(props) => <Page401 {...props} />}
              />
              <Route
                path="/"
                name="หน้าแรก"
                render={(props) => <TheLayout {...props} />}
              />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </Auth>
    )
  }
}

export default App
