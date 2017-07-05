import Realtime from '../Realtime'

export default class RealtimeRequestTrip extends Realtime {

  static channel(options) {
    let onDate  = options['onDate']
    let routeId = options['routeId']
    return  `bus5/request_trip/${onDate}/${routeId}`
  }
}
