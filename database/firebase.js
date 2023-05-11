import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseconfig = {
    apiKey: "AIzaSyDNGGbxb0g261QZJhgODcZzdp5JSOgwf7k",
    authDomain: "hseapp-71377.firebaseapp.com",
    projectId: "hseapp-71377",
    storageBucket: "hseapp-71377.appspot.com",
    messagingSenderId: "105410173137",
    appId: "1:105410173137:web:ff46bb27fd43cb1f34cdf0",
    measurementId: "G-XPM0C5HJ5H"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseconfig);
}

export default firebase;