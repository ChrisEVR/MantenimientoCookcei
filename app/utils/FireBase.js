import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBvM_xLd9ifWW8uqVFm8Bm8FptJyRdfaWs",
    authDomain: "cookcei-12945.firebaseapp.com",
    databaseURL: "https://cookcei-12945.firebaseio.com",
    projectId: "cookcei-12945",
    storageBucket: "cookcei-12945.appspot.com",
    messagingSenderId: "90606720793",
    appId: "1:90606720793:web:695be2e6e46e8ea9235788"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig);