import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

//import 'firebase/firestore'


const firebaseConfig = {
    apiKey: process.env.FIRESTORE_API_KEY,
    authDomain: process.env.FIRESTORE_AUTH_DOMAIN,
    projectId: process.env.FIRESTORE_PROJECT_ID,
    storageBucket: process.env.FIRESTORE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIRESTORE_MESSAGING_SENDER_ID,
    appId: process.env.FIRESTORE_APP_ID
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
console.log(db)
//const notasCollection = collection(db, 'notas_fiscais')

