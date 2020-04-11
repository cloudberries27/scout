import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';

// scout's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDPwe1ORI1Orf3A3dNY9NPzZEDmbMc1Va4",
    authDomain: "scout-32fb7.firebaseapp.com",
    databaseURL: "https://scout-32fb7.firebaseio.com",
    projectId: "scout-32fb7",
    storageBucket: "scout-32fb7.appspot.com",
    messagingSenderId: "1049255843674",
    appId: "1:1049255843674:web:5538988d4fd902c74e0563",
    measurementId: "G-92FDWSF58L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //var database = firebase.database();
 //  firebase.database().ref('users/' + 'nvaidyamath').set({  //firebase test
 //   username: 'nvaidyamath',
 //   email: 'nikhilcv16@yahoo.com'
 // });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
