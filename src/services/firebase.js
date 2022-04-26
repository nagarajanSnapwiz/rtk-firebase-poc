import { initializeApp } from "firebase/app";
import { getDatabase, ref, orderByChild, startAt } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAp06vnhA46wo_H0DCjki0vtl_k8eBtqEA",
  authDomain: "demoproject-8759f.firebaseapp.com",
  databaseURL: "https://demoproject-8759f-default-rtdb.firebaseio.com",
  projectId: "demoproject-8759f",
  storageBucket: "demoproject-8759f.appspot.com",
  messagingSenderId: "653717266305",
  appId: "1:653717266305:web:118bd07ce91953f11b1280"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
