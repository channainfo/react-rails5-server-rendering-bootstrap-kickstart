import React from 'react'
import UserAccessToken from '../../models/UserAccessToken'

import LoginComp from './LoginComp'

class HomeComp extends React.Component {

  signOut() {
    UserAccessToken.getInstance().signOutUser()
  }

  render() {
    if(UserAccessToken.getInstance().isUserSignedIn()){
      return(
        <div>
          <p>
            You already signed in.
          </p>
          <button onClick={()=> {this.signOut()}} > SignOut </button>
        </div>
      )
    }
    else{
      return(
        <LoginComp />
      )
    }
  }
}

export default HomeComp;
