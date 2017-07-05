export default class ApiDelegate {
  static instanceMethods(){
    return {
    }
  }

  static builtIn(){
    return {
      e: function(key){
        return this.attributes[key]
      },

      object: function(){
        var attrs = this.attributes
        attrs['id'] = this.id
        return attrs
      }
    }
  }

  static create(customObject){
    var defaultObj = Object.assign(this.builtIn(), customObject)
    return Object.setPrototypeOf(this.instanceMethods(), defaultObj)
  }
}
