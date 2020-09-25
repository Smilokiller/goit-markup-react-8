import firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyCdD3x3iRHl4gyWIEae1bcODulmV-CURoU",
  authDomain: "reacthw7.firebaseapp.com",
  databaseURL: "https://reacthw7.firebaseio.com",
  projectId: "reacthw7",
  storageBucket: "reacthw7.appspot.com",
  messagingSenderId: "8842518955",
  appId: "1:8842518955:web:0c55ad8a595d94d88b72ee",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
