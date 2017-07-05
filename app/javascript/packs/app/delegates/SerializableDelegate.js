export default class SerializableDelegate {
  static instanceMethods(){
    return {
    }
  }

  static builtIn(){
    return {
      object: function(){
        return this
      }
    }
  }

  static create(customObject){
    var defaultObj = Object.assign(this.builtIn(), customObject)
    return Object.setPrototypeOf(this.instanceMethods(), defaultObj)
  }
}
