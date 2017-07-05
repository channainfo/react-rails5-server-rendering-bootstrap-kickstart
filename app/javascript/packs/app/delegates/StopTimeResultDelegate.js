import ApiDelegate from './ApiDelegate'
import Humanize from '../lib/Humanize'

// {
//   "operator": {
//     "id": 1,
//     "name": "Thero Express",
//     "name_khmer": null,
//     "website": "www.theroexpress.com",
//     "address": "#59Eoz, St. Paster (51), Sangkat Phsar Thmei 3, Khan Doun Penh, Phnom Penh, Kingdom of Cambodia.",
//     "notice": "Passengers have to attend to bus terminal 20 minutes before departure time.",
//     "slug": "thero",
//     "logo": {
//       "thumb": "http://localhost:3000/uploads/operator/logo/1/thumb_green-eagle-express.png",
//       "medium": "http://localhost:3000/uploads/operator/logo/1/medium_green-eagle-express.png"
//     }
//   },
//   "vehicle_type": {
//     "id": 4,
//     "name": "Bus5",
//     "amenities": [
//       "wifi",
//       "water",
//       "napkin",
//       "charger"
//     ]
//   },
//   "stop_times": [
//     {
//       "id": 11,
//       "stop_id": 1,
//       "departure_time": 23400,
//       "arrival_time": 42600,
//       "stop": {
//         "id": 1,
//         "code": "PHN",
//         "name": "Phnom Penh Station",
//         "lat": 11.5747,
//         "lon": 104.918,
//         "description": "",
//         "timezone": "Phnom Penh",
//         "url": ""
//       }
//     },
//     {
//       "id": 12,
//       "stop_id": 2,
//       "departure_time": null,
//       "arrival_time": null,
//       "stop": {
//         "id": 2,
//         "code": "PORSAT",
//         "name": "Stop Pursat",
//         "lat": 12.4903,
//         "lon": 103.89,
//         "description": "",
//         "timezone": "Phnom Penh",
//         "url": ""
//       }
//     }
//   ],
//   "service_available": false,
//   "has_discount": false,
//   "readable_discount": null,
//   "currency_type": "USD",
//   "local_price": 8,
//   "original_local_price": 8,
//   "non_local_price": 8,
//   "original_non_local_price": 8,
//   "head_sign": "PHN-Pursat",
//   "short_name": "PHN-Pursat",
//   "trip_id": 4,
//   "on_date": "2017-06-27",
//   "is_bus5": true,
//   "seats_remaining": 1,
//   "service_calendar": {
//     "id": 1,
//     "name": "Every Friday",
//     "service_type": 1,
//     "not_available_reason": "Service only operated only on Friday"
//   },
//   "price": {
//     "local": {
//       "price": 8,
//       "currency_type": "usd",
//       "price_rule_by_nationality": null
//     },
//     "non_local": {
//       "price": 8,
//       "currency_type": "usd",
//       "price_rule_by_nationality": null
//     }
//   },
//   "auto_assigned_seat": false,
//   "id": "4"
// }
export default class StopTimeResultDelegate extends ApiDelegate {
  static instanceMethods() {
    return {
      origin: function(){
        return this.object().stop_times[0]
      },

      destination: function(){
        return this.object().stop_times[this.object().stop_times.length -1 ]
      },

      departureTime: function() {
        return Humanize.hourFromSeconds(this.origin().departure_time)
      },

      arrivalTime: function(){
        return Humanize.hourFromSeconds(this.object().stop_times[this.object().stop_times.length -2].arrival_time)
      },

      price: function(){
        if(this.object().local_price === this.object().non_local_price)
          return `${this.object().local_price}`
        else
          return `${this.object().local_price} - ${this.object().non_local_price}`
      },

      serviceAvailable: function(){
        return this.object().service_available
      },

      notAvailableReason: function(){
        return this.object().service_calendar.not_available_reason
      },

      //7|12
      matchedDeparture: function(splitHour) {
        let [fromHour, toHour] = splitHour.split("-")
        let departSeconds = this.origin().departure_time
        let result = parseFloat(fromHour) * 3600 <= departSeconds && departSeconds <= parseFloat(toHour) * 3600
        return result
      },

      matchedSeat: function(numberOfPaxs){
        return this.object().seats_remaining >= numberOfPaxs
      },

      matched: function(request) {
        if(!this.matchedDeparture(request.object().hours)){
          this.errorMatched = `Departure does not match.`
          return false;
        }
        if(!this.matchedSeat(request.object().number_of_paxs)) {
          this.errorMatched = `Remaining seat is not enough (${this.object().seats_remaining} for ${request.object().number_of_paxs})`
          return false
        }
        return true
      },

      findResponse: function(responses){
        let operatorId = `operator-${this.object().operator.id}`
        let tripId     = `trip-${this.object().trip_id}`
        console.log(`operator: ${operatorId}, trip: ${tripId}`);
        if(responses && responses[operatorId] !== undefined && responses[operatorId][tripId] !== undefined)
          return responses[operatorId][tripId]
        else
          return null
      },

      findReject: function(responses){
        let operatorId = `operator-${this.object().operator.id}`
        let rejectKey = 'trip-' //reject has no key. reject take over all other
        if(responses && responses[operatorId] !== undefined && responses[operatorId][rejectKey] !== undefined)
          return responses[operatorId][rejectKey]
        return null
      },

      responseStatus: function(responses) {
        if(!this.object().is_bus5) {
          return 'auto'
        }

        var response = this.findResponse(responses)
        var rejected = this.findReject(responses)

        var result = null

        if(response === null && rejected === null)
          return 'waiting'

        else if(response && rejected)
          result = response['created_at'] > rejected['created_at'] ? response : rejected

        else
          result = response || rejected

        return result.status

      }

    }
  }
}
