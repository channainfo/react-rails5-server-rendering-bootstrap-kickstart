import React from 'react'
import {Redirect} from 'react-router-dom'

import UserAccessToken from '../../models/UserAccessToken'

export default class LoggedOutComp extends React.Component {
  render() {
    UserAccessToken.getInstance().signOutUser()
    return(
      <Redirect to='/login' />
    )
  }
}
