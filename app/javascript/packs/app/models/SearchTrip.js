import UserAccessTokenHttp from './UserAccessTokenHttp'

export default class SearchTrip {
  // {:origin_id, :destination_id, :on_date } = options
  static request(search_options, success, failed ){

    var options = {
      url: '/api/v2/search_trips',
      method: 'GET',
      data: search_options,
      success: function(jsonResponse){
        if(success)
          success(jsonResponse)
      },
      failed: function(error) {
        if(failed)
          failed(error)
      }
    }

    UserAccessTokenHttp.request(options)
  }
}
