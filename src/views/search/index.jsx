import React from 'react'
import { Route, Switch } from 'react-router-dom'

const ViewCar = React.lazy(() => import('./search-car'))
const ViewPersonnel = React.lazy(() => import('./search-personnel'))
const Device = ({ SESSION }) => {
  const { permission_view, permission_edit, permission_add } = SESSION.PERMISSION
  return (
    <Switch>
      {permission_view === 1  || true? <Route path={`/search/search-personnel`} render={props => <ViewPersonnel {...props} {...SESSION} />} /> : null}
      {permission_view === 1  || true? <Route path={`/search/search-car`} render={props => <ViewCar {...props} {...SESSION} />} /> : null}
      {permission_view === 1  || true? <Route path={`/`} render={props => <ViewCar {...props} {...SESSION} />} /> : null}
    </Switch>
  )
}

export default Device