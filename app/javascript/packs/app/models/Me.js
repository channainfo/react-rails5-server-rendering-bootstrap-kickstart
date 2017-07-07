import UserAccessTokenHttp from './UserAccessTokenHttp'
import Store from './Store'

export default class Me {
  // {:origin_id, :destination_id, :on_date } = options
  static data = null

  static getCache(){
    return this.data || Store.getObject("me")
  }

  static defaultHome(){
    return this.isOperatorUser() ? '/bus5/request-summary' : '/bus5/search'
  }

  static isOperatorUser(){
    let me = this.getCache()
    return me.attributes.operator != null
  }

  static setCache(me){
    this.data = me
    Store.setObject("me", this.data)
  }

  static request(success, failed ){
    var options = {
      url: '/api/v2/me',
      method: 'GET',
      data: {},

      success: (jsonResponse) => {
        this.setCache(jsonResponse['data'])
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
