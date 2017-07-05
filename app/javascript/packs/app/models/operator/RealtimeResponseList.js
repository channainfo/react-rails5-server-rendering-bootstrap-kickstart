import Realtime from '../Realtime'
import Me       from '../Me'

export default class RealtimeOperatorResponseList extends Realtime {

  static channel(options) {
    let onDate  = options['onDate']
    let routeId = options['routeId']
    let operatorId = Me.getCache().attributes.operator.id
    let result =  `bus5/response_trip/${onDate}/${routeId}/operator-${operatorId}`
    console.log("channel name: ------------", result)
    return result
  }
}
