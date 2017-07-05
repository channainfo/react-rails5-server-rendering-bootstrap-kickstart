import Realtime from '../Realtime'

export default class RealtimeSummary extends Realtime {
  static channel(date) {
    return `bus5/summary_trip/${date}/`
  }
}
