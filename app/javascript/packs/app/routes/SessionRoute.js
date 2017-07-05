import React from 'react'
import {Redirect, Route} from 'react-router-dom'

import UserAccessToken from '../models/UserAccessToken'
import Me              from '../models/Me'
import Layouts         from '../layouts/Layouts'

const SessionRoute = ({ component: Component, layout: LayoutName, ...rest }) => {
  LayoutName = LayoutName || 'AppLayout'
  let Layout = Layouts[LayoutName]

  return <Route {...rest} render={ (props) => {

    var loggedIn = UserAccessToken.getInstance().isUserSignedIn()
    if(loggedIn){
      return <Redirect to={{ pathname: Me.defaultHome(), state: { from: props.location } }} />
    }
    else
      return (
        <Layout>
          <Component {...props}/>
        </Layout>
      )

  }}
  />
}

export default SessionRoute
