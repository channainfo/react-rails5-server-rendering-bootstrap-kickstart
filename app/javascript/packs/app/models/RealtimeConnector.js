import FirebaseCustomToken from './FirebaseCustomToken'
import ApiConfig from '../config/ApiConfig'

import * as firebase from 'firebase'

export default class RealtimeConnector {
  static connect() {
    if (firebase.apps.length > 0)
      return false

    var config = {
      apiKey: ApiConfig.FIREBASE_API_KEY,
      authDomain: ApiConfig.FIREBASE_AUTH_DOMAIN,
      databaseURL: ApiConfig.FIREBASE_DATABASE_URL,
      projectId: ApiConfig.FIREBASE_PROJECT_ID,
      storageBucket: ApiConfig.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: ApiConfig.FIREBASE_MESSAGE_SENDER_ID
    };

    firebase.initializeApp(config)

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("Authenticated to Firebase with uid: ", user.uid);
      } else {
        console.log("Failed to authenticate to Firebase");
      }
    });
  }

  static init(success=null, failed=null) {
    var self = this
    this.connect();

    FirebaseCustomToken.request( (token) => {
      self.signIn(token)
    }, (error) => {

    })
  }

  static signIn(token, errorCallback=null) {
    // console.log("Signin with token: ", token);
    firebase.auth().signInWithCustomToken(token).catch( (error) => {
      console.log("auth error", error);
      if(errorCallback)
        errorCallback(error)
    });
  }
}
