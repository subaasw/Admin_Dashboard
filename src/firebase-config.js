import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { getFirestore } from "@firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: Firebase_authDomain,
  projectId: Firebase_ProjectId,
  storageBucket: Firebase_storageBucket,
  messagingSenderId: Firebase_messagingSenderId,
  appId: App_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app)

export const db = getFirestore(app)

export const storage = getStorage(app)