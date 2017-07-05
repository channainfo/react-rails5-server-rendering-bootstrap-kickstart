export default class Humanize {
  static hourFromSeconds(seconds) {
    var hours = parseInt(seconds/3600, 10)
    var mins  = (seconds%3600)/60
    var dayTime = hours < 12 ? "AM" : "PM"

    hours = (hours>12) ? hours - 12 : hours
    hours = hours < 10 ? `0${hours}` : hours

    mins = mins < 10 ? `0${mins}` : mins

    return `${hours}:${mins} ${dayTime}`

  }

  static hour(hours){
    var mins = (hours - parseInt(hours, 10)) * 60
    mins = mins < 10 ? `0${mins}` : mins

    hours = parseInt(hours, 10)

    let dayTime = hours < 12 ? "AM" : "PM"
    hours = hours > 12 ? ( hours - 12 ) : hours
    hours = hours < 10 ? `0${hours}` : hours
    return `${hours}:${mins} ${dayTime}`
  }
}
