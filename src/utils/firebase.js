import { initializeApp } from "firebase/app"
import { getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage"

//import 'firebase/firestore'


const firebaseConfig = {
    apiKey: process.env.FIRESTORE_API_KEY,
    authDomain: 'notas-conte.firebaseapp.com',
    projectId: 'notas-conte',
    storageBucket: 'notas-conte.appspot.com',
    messagingSenderId: process.env.FIRESTORE_MESSAGING_SENDER_ID,
    appId: process.env.FIRESTORE_APP_ID
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)

