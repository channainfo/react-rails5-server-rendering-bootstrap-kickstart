import UserAccessTokenHttp from './UserAccessTokenHttp'
import Store from './Store'

export default class FirebaseCustomToken {
  static token = null

  static setCustomToken(token) {
    FirebaseCustomToken.token = token
    Store.set('custom_token', token)
  }

  static getCustomToken() {
    return FirebaseCustomToken.token || Store.get('custom_token')
  }

  static request(success=null, failed=null){
    var options = {
      url: '/api/v2/firebase_custom_tokens',
      method: 'POST',
      success: function(jsonResponse){
        let token = jsonResponse['token']
        FirebaseCustomToken.setCustomToken(token)
        if(success)
          success(token)
      },
      failed: function(error) {
        if(failed)
          failed(error)
      }
    }

    UserAccessTokenHttp.request(options)
  }
}
