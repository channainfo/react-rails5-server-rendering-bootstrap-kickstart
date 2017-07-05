import Http from './Http'
import AccessToken from './AccessToken'

export default class AccessTokenHttp {
  static request(options){
    let accessToken = AccessToken.getInstance()
    let headers = accessToken.getRequestHeader()

    options['headers'] = options['headers'] || {}

    for(var headerName in headers)
      options['headers'][headerName] = headers[headerName]

    console.log("headers", options);
    Http.request(options)
  }
}
