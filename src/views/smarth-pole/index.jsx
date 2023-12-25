import React from 'react'
import { Route, Switch } from 'react-router-dom'

const View = React.lazy(() => import('./view'))
const Device = ({ SESSION }) => {
  const { permission_view, permission_edit, permission_add } = SESSION.PERMISSION
  return (
    <Switch>
      {permission_view === 1  || true? <Route path={`/smarth-pole`} render={props => <View {...props} {...SESSION} />} /> : null}
      {permission_view === 1  || true? <Route path={`/`} render={props => <View {...props} {...SESSION} />} /> : null}
    </Switch>
  )
}

export default Device