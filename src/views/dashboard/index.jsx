import React from 'react'
import { Route, Switch } from 'react-router-dom'

const View = React.lazy(() => import('./view'))
const Dashboard = ({ SESSION }) => {
  const { permission_view } = SESSION.PERMISSION
  return (
    <Switch>
      {permission_view === 1  ? <Route path={`/dashboard/view`} render={props => <View {...props} {...SESSION} />} /> : null}
      {permission_view === 1  ? <Route path={`/`} render={props => <View {...props} {...SESSION} />} /> : null}
    </Switch>
  )
}

export default Dashboard