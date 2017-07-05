import UserAccessTokenHttp from './UserAccessTokenHttp'
import Store               from './Store'

export default class Location {
  // {:origin_id, :destination_id, :on_date } = options
  static data = null

  static getCache(){
    return this.data || Store.getObject("locations")
  }

  static setCache(locations) {
    this.data = locations
    Store.setObject("locations", locations)
  }

  static request(success, failed ){
    var options = {
      url: '/api/v1/locations',
      method: 'GET',
      data: {},

      success: (jsonResponse) => {
        var result = jsonResponse['data']
        this.setCache(result)
        if(success)
          success(jsonResponse['data'])
      },

      failed: (error) => {
        if(failed)
          failed(error)
      }
    }

    UserAccessTokenHttp.request(options)
  }
}
