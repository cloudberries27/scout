import * as firebase from 'firebase';

// scout's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDPwe1ORI1Orf3A3dNY9NPzZEDmbMc1Va4",
    authDomain: "scout-32fb7.firebaseapp.com",
    databaseURL: "https://scout-32fb7.firebaseio.com",
    projectId: "scout-32fb7",
    storageBucket: "scout-32fb7.appspot.com",
    messagingSenderId: "1049255843674",
    appId: "1:1049255843674:web:5538988d4fd902c74e0563",
    measurementId: "G-92FDWSF58L"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.database();
  const storage = firebase.storage();

export {auth, db, storage, firebase}
