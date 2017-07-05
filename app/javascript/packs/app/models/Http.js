import 'whatwg-fetch'
import ApiConfig from '../config/ApiConfig'

export default class Http {
  static request(options) {
    var headers = options['headers'] || {}
    var data = options['data'] || {}
    var url  = ApiConfig.HOST + options['url']

    headers['Content-Type'] =  'application/json'

    var requestOptions = {
      method: options['method'],
      headers: headers,
    }

    if(options['method'] === undefined || options['method'].toLowerCase() === 'get')
      url = url.indexOf("?") === -1 ?  (url + "?" + this.queryString(data)) : "&" + this.queryString(data)

    else
      requestOptions['body'] = JSON.stringify(data)

    fetch(url, requestOptions).then( (response) => {
      return response.json();
    }).then( (result) => {
      if(options['success'] !== undefined && options['success'])
        options['success'](result);
    }).catch ( (error) => {
      console.log('Request failed', error);
      if(options['failed'] !== undefined && options['failed'])
        options['failed'](error)
    });
  }

  static queryString(data) {
    var query = Object.keys(data)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&');
    return query
  }

}
