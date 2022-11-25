
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAd9YxJ6HmYUYQKOZlJkf7WE4TOnmqb6Zk",
  authDomain: "upload-pics-250cf.firebaseapp.com",
  projectId: "upload-pics-250cf",
  storageBucket: "upload-pics-250cf.appspot.com",
  messagingSenderId: "818278732648",
  appId: "1:818278732648:web:8a75d8967858d171edbcdd"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage=getStorage(app);