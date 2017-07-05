import FirebaseDelegate from './FirebaseDelegate'
import Humanize         from '../lib/Humanize'
export default class RequestTripDelegate extends FirebaseDelegate {
  static instanceMethods() {
    return {
      fromHour: function(){
        var from = this.object().hours.split("-")[0]

        return Humanize.hour(parseFloat(from))
      },

      toHour: function(){
        var to = this.object().hours.split("-")[1]
        return Humanize.hour(parseFloat(to))
      }
    }
  }
}
