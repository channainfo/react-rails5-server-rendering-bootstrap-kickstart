import UserAccessTokenHttp from './UserAccessTokenHttp'
import StopTimeResultDelegate from '../delegates/StopTimeResultDelegate'

export default class TripAvailability {
  // {:origin_id, :destination_id, :on_date } = options
  static request(search_options, success, failed ){

    var options = {
      url: '/api/v2/search_trip_loaders',
      method: 'GET',
      data: search_options,
      success: function(jsonResponse){
        var result = jsonResponse['data'].map((stResult) => (StopTimeResultDelegate.create(stResult) ))
        if(success)
          success(result)
      },
      failed: function(error) {
        if(failed)
          failed(error)
      }
    }
    UserAccessTokenHttp.request(options)
  }
}
