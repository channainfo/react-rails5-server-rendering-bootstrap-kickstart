import Http from './Http'
import Store from './Store'
import ApiConfig from '../config/ApiConfig'

export default class UserAccessToken {

  static instance = null

  static getInstance(){
    if(UserAccessToken.instance)
      return UserAccessToken.instance
    UserAccessToken.instance = new UserAccessToken()
    return UserAccessToken.instance
  }

  setUserToken(token) {
    var self = this
    this.userOauthToken = token
    Store.setObject("user_token", self.userOauthToken );
  }

  getUserToken(){
    let token = this.userOauthToken || Store.getObject("user_token")
    return token
  }

  isUserSignedIn(){
    return this.getUserToken() != null ? true : false
  }

  signOutUser() {
    Store.clear('user_token')
    this.userOauthToken = null
  }

  getRequestHeader(){
    return {
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.getUserToken().access_token,
      bookmebus: ApiConfig.VERSION
    }
  }

  signInUser(userParams, success=null, failed=null){
    let self = this

    let data = {  grant_type: 'password',
                  client_id: ApiConfig.CLIENT_ID,
                  client_secret: ApiConfig.CLIENT_SECRET }

    if(userParams.username !== undefined){
      data.username = userParams.username
      data.password = userParams.password
    }

    else if (userParams.fb_access_token !== undefined )
      data.fb_access_token = userParams.fb_access_token

    var options = {
      url: '/oauth/token',
      method: 'POST',
      data: data,
      success: (jsonResponse) => {
        self.setUserToken(jsonResponse)

        if(success)
          success(jsonResponse);

      },
      failed: (error) => {
        if(failed)
          failed(error)
      }
    }

    Http.request(options)
  }
}
