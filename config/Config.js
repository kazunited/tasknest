import firebase from 'firebase/compat';
import '@firebase/firestore'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export const firebaseConfig = {
    apiKey: "AIzaSyD7SERLwJE9auaFSK11vWhEDYPPYic1vYY",
    authDomain: "tasknest-2a853.firebaseapp.com",
    projectId: "tasknest-2a853",
    storageBucket: "tasknest-2a853.appspot.com",
    messagingSenderId: "935349351464",
    appId: "1:935349351464:web:968d5e4e625cb11b43b11d"

  }

class Config {
  constructor(callback){
    this.init(callback)
  }

  init(callback){
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);

    }

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        callback(null,user)

      }else {
        firebase
        .auth()
        .signInAnonymously()
        .catch(error => {
          callback(error)
        });
      }
    });
  }
    getLists(callback){
      let ref = firebase
      .firestore()
      .collection('users')
      .doc(this.userId)
      .collection('lists');

      this.unsubscribe=ref.onSnapshot(snapshot => {
        lists = []

        snapshot.forEach(doc=>{
          lists.push({id: doc.id, ...doc.data()})
        })

        callback(lists);
      })
    }

    get userId() {
      return firebase.auth().currentUser.uid

    }

    detach(){
      this.unsubscribe();
    }
  


}

export default Config;


  
