import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBQLrTzPdCEEwltsuEp_qtF3E3SzJrYZ1U",
  authDomain: "newapp-c4334.firebaseapp.com",
  databaseURL: "https://newapp-c4334.firebaseio.com",
  projectId: "newapp-c4334",
  storageBucket: "newapp-c4334.appspot.com",
  messagingSenderId: "177664591914",
  appId: "1:177664591914:web:92e58a0b43de0344331b53",
};
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

export default db;
