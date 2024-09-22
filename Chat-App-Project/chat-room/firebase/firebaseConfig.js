// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
// // import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// // import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import { getFirestore } from 'firebase/firestore'

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyClPgTOvacNny0h0eomNsroCpfhRKWEL5U",
//   authDomain: "chatapp-52980.firebaseapp.com",
//   projectId: "chatapp-52980",
//   storageBucket: "chatapp-52980.appspot.com",
//   messagingSenderId: "855782353383",
//   appId: "1:855782353383:web:c3aa43387af6563c863542"
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const database = getFirestore();


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClPgTOvacNny0h0eomNsroCpfhRKWEL5U",
  authDomain: "chatapp-52980.firebaseapp.com",
  projectId: "chatapp-52980",
  storageBucket: "chatapp-52980.appspot.com",
  messagingSenderId: "855782353383",
  appId: "1:855782353383:web:c3aa43387af6563c863542"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
export const database = getFirestore(app);
