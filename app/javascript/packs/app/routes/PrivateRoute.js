import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import Layouts           from '../layouts/Layouts'
import UserAccessToken   from '../models/UserAccessToken'

const PrivateRoute = ({ component: Component, layout: LayoutName, ...rest }) => {
  LayoutName = LayoutName || 'AppLayout'
  let Layout = Layouts[LayoutName]

  return <Route {...rest} render={ (props) => {

    let loggedIn = UserAccessToken.getInstance().isUserSignedIn()
    if(loggedIn)
      return (
        <Layout>
          <Component {...props}/>
        </Layout>
      )
    else
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  }}
  />
}

export default PrivateRoute
