import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseconfig = {
    apiKey: "AIzaSyBoUZcp9aGyDtTaMlifwHOCoBcZZt_Xuuo",
    authDomain: "hseapp-3dd89.firebaseapp.com",
    projectId: "hseapp-3dd89",
    storageBucket: "hseapp-3dd89.appspot.com",
    messagingSenderId: "112372769432",
    appId: "1:112372769432:web:425d69d11041a7b86ee6ed",
    measurementId: "G-T86NNW8ECF"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseconfig);
}

export default firebase;