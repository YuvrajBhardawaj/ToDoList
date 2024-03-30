import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAdpuXKCg5iBJM_tyYvyFD7YVU5tOgD7Xk",
  authDomain: "todolist-19b05.firebaseapp.com",
  projectId: "todolist-19b05",
  storageBucket: "todolist-19b05.appspot.com",
  messagingSenderId: "757404202489",
  appId: "1:757404202489:web:382e0a14cfc27767e8b928"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db=getFirestore(app)
const User=collection(db, 'Users')
export default User