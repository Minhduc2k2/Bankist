import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBaA--y2JQPn1Wz9M5Jv4vqMZgl_YA8dkI",
  authDomain: "bankist-b899e.firebaseapp.com",
  projectId: "bankist-b899e",
  storageBucket: "bankist-b899e.appspot.com",
  messagingSenderId: "716905417692",
  appId: "1:716905417692:web:141ac602999dfd318a9d19",
};

//TODO: Initialize Firebase
firebase.initializeApp(firebaseConfig);

//TODO: Initialize Services
const projectFireStore = firebase.firestore();
const projectAuth = firebase.auth();

//TODO: Create Timestamp (Tạo mốc thời gian)
const timestamp = firebase.firestore.Timestamp;

export { projectFireStore, projectAuth, timestamp };
