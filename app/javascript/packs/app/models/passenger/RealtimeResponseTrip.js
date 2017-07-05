import Realtime from '../Realtime'
import Me from '../Me'

export default class RealtimeResponseTrip extends Realtime {

  static channel(options) {
    var [day, month, year]  = options['on_date'].split("/")
    let onDate = `${year}-${month}-${day}`
    let originId = options['origin_id']
    let destinationId = options['destination_id']
    let requestTripId = options['request_trip_id']
    let routeId =`${originId}_${destinationId}`
    console.log("Me: ", Me.getCache());
    let userId = Me.getCache().id
    return `bus5/response_trip/${onDate}/${routeId}/user-${userId}/request_id-${requestTripId}`
  }
}
