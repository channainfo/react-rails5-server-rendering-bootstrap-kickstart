import UserAccessTokenHttp from '../UserAccessTokenHttp'

export default class ResponseTrip {
  // {:origin_id, :destination_id, :on_date } = options
  static REJECTED = 'rejected'
  static ACCEPTED = 'accepted'

  static request(options, success, failed ){
    let httpOptions = {
      url: '/api/v2/passenger_responses',
      method: 'POST',
      data: options,
      success: function(jsonResponse){
        if(success)
          success(jsonResponse)
      },
      failed: function(error) {
        if(failed)
          failed(error)
      }
    }
    UserAccessTokenHttp.request(httpOptions)
  }

  static offer(id, success, failed) {
    let httpOptions = {
      url: `/api/v2/operator_responses/${id}`,
      method: 'GET',
      success: function(jsonResponse){
        if(success)
          success(jsonResponse)
      },
      failed: function(error) {
        if(failed)
          failed(error)
      }
    }
    UserAccessTokenHttp.request(httpOptions)
  }

}
