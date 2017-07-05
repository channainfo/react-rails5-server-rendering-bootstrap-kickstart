import * as firebase from 'firebase'

export default class Realtime {
  static channelRef = null
  static channelName = null

  static read(callback) {

    console.log("Channel name: ", this.channelName);

    this.channelRef = firebase.database().ref(this.channelName) //.orderByChild("created_at").limitToLast(10);

    this.channelRef.on('value', (snapshot) => {
      var value = snapshot.val() || {};
      callback(value);
    });
  }

  static readOptions(options){
    this.channelName = this.channel(options)
    return this
  }

  static channel(options) {
    throw new Error('Your must define your channel')
  }
}
