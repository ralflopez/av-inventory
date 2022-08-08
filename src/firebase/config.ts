// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgDZKFKEK_2enWM73DtYrJKI5Epm4z-io",
  authDomain: "av-inv-8eb2a.firebaseapp.com",
  projectId: "av-inv-8eb2a",
  storageBucket: "av-inv-8eb2a.appspot.com",
  messagingSenderId: "553089809026",
  appId: "1:553089809026:web:1bdc1918716c42a201d29b",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Enable persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
    console.error("Persistence: Failed Precondition")
  } else if (err.code === "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
    console.error("Persistence: Unimplemented")
  }
})
