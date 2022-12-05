import app from "firebase/compat/app"
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA25zSOzKg7FlEkrLrXRojs0JboWhUbh3U",
  authDomain: "chatapp-fd543.firebaseapp.com",
  databaseURL: "https://chatapp-fd543-default-rtdb.firebaseio.com",
  projectId: "chatapp-fd543",
  storageBucket: "chatapp-fd543.appspot.com",
  messagingSenderId: "13059076243",
  appId: "1:13059076243:web:f31457922b55e352f4dd66",
  measurementId: "G-48BYLPDJHQ"
};
// Initialize Firebase
const initfirebase = app.initializeApp(firebaseConfig);
export default initfirebase;
