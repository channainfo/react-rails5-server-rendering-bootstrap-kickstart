export default class DateUtil {
  static defaultChannelDate(){
    var date = new Date()
    var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    var month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    var defaultOnDate = `${date.getFullYear()}-${month}-${day}`
    return defaultOnDate
  }

  static defaultSearchDate(){
    var date = new Date()
    var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    var month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    var defaultOnDate = `${day}/${month}/${date.getFullYear()}`
    return defaultOnDate
  }
}
