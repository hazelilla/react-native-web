// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA6i3Fx2hwCFDkJ--vtHzihYKzLf80YXA",
  authDomain: "react-native-web-84e7a.firebaseapp.com",
  projectId: "react-native-web-84e7a",
  storageBucket: "react-native-web-84e7a.appspot.com",
  messagingSenderId: "908355128762",
  appId: "1:908355128762:web:5a14fd54b2d051f12ce183",
  measurementId: "G-8X209Q2WZV"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const analytics = firebase.analytics();
  
  export { analytics };
