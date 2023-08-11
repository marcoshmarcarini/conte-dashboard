import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

//import 'firebase/firestore'


const firebaseConfig = {
    apiKey: 'AIzaSyDSan1kFfw8mJy0aDXp-Y5riCtV92j7KfQ',
    authDomain: 'notas-conte.firebaseapp.com',
    projectId: 'notas-conte',
    storageBucket: 'notas-conte.appspot.com',
    messagingSenderId: '462776862842',
    appId: '1:462776862842:web:b8120200cce385289353c3'
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
console.log(db)
//const notasCollection = collection(db, 'notas_fiscais')

