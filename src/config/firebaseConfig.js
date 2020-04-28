import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyC9GdYnLCNQiT4EPG8u1dTq43EM9iPZ5qo",
    authDomain: "vue-online-store-9d433.firebaseapp.com",
    databaseURL: "https://vue-online-store-9d433.firebaseio.com",
    projectId: "vue-online-store-9d433",
    storageBucket: "vue-online-store-9d433.appspot.com",
    messagingSenderId: "54063086074",
    appId: "1:54063086074:web:17a81fea46f752b1668c43",
    measurementId: "G-91QS7B9MYR"
};

const firebaseDB = firebase.initializeApp(config);

// export const ref = firebaseDB.database().ref();
export const firebaseAuth = firebaseDB.auth();
export const db = firebaseDB.firestore();
