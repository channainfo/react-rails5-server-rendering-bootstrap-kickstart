import Store from './Store'
import Http from './Http'

import ApiConfig from '../config/ApiConfig'

export default class AccessToken {
  static instance = null

  static getInstance(){
    if(AccessToken.instance)
      return AccessToken.instance
    AccessToken.instance = new AccessToken()
    return AccessToken.instance
  }

  refreshAccess(success, failed) {
    Store.clear("app_token")
    this.oauthToken = null;
    this.authorizeApp(success, failed)
  }

  getAppToken(){
    return this.oauthToken || Store.getObject("app_token")
  }

  isSetAppToken(){
    return this.getAppToken() != null ? true : false
  }

  getRequestHeader(){
    return {
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.getAppToken().access_token,
      bookmebus: ApiConfig.VERSION
    }
  }

  authorizeApp(success=null, failed=null){
    let self = this

    let data = {
      grant_type: 'client_credentials',
      client_id: ApiConfig.CLIENT_ID,
      client_secret: ApiConfig.CLIENT_SECRET
    }

    var options = {
      method: 'POST',
      url: '/oauth/token',
      data: data,
      success: (jsonResponse) => {
        self.oauthToken = jsonResponse
        Store.setObject("app_token", self.oauthToken );

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
