import Http from './Http'
import UserAccessToken from './UserAccessToken'

export default class AccessTokenHttp {
  static request(options){

    let userAccessToken = UserAccessToken.getInstance()
    let headers = userAccessToken.getRequestHeader()

    options['headers'] = options['headers'] || {}

    for(var headerName in headers) {
      options['headers'][headerName] = headers[headerName]
    }

    Http.request(options)
  }
}
