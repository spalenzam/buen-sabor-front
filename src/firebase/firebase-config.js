import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAp4kkb5tbLOujppIZdKmHwJaePEUyUfSM",
    authDomain: "buen-sabor-43091.firebaseapp.com",
    databaseURL: "https://buen-sabor-43091.firebaseio.com",
    projectId: "buen-sabor-43091",
    storageBucket: "buen-sabor-43091.appspot.com",
    messagingSenderId: "979900558320",
    appId: "1:979900558320:web:7d52b7af856286582acb35"
  };

firebase.initializeApp(firebaseConfig);

//Esto para hacer autenticación con google
const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}
