import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBHFT7c-cL-ota7yTBfCYjCF9gtoMQ5Wew",
    authDomain: "reporting-main.firebaseapp.com",
    projectId: "reporting-main",
    storageBucket: "reporting-main.appspot.com",
    messagingSenderId: "1051456400117",
    appId: "1:1051456400117:web:8b96e3744070a63e7573bc",
    measurementId: "G-WREYHWZ1YQ"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export const storage = firebase.storage()

export default firebase