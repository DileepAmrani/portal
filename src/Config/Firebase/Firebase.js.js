import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyATTD32P6G9MDLmwznz2MfZlSrOl2GZ2iw",
    authDomain: "mofit-portal.firebaseapp.com",
    databaseURL: "https://mofit-portal.firebaseio.com",
    projectId: "mofit-portal",
    storageBucket: "mofit-portal.appspot.com",
    messagingSenderId: "26201228871",
    appId: "1:26201228871:web:b003e06bba8d78c20d5362",
    measurementId: "G-3M1JEGM4Y0"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export {
    firebaseApp
};