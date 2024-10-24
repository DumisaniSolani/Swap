import firebase, { initializeApp } from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpo-E3uWtIYddr2wS9CTZ7KFewXBpqVIc",
  authDomain: "swap-a586e.firebaseapp.com",
  projectId: "swap-a586e",
  storageBucket: "swap-a586e.appspot.com",
  messagingSenderId: "1029322432209",
  appId: "1:1029322432209:web:01ea3c79d6fbd6fed82ff0",
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

export { firebase };
