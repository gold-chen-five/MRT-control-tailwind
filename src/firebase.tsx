import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDPcwSj4re9wgneKogX3vUEBV-0mnlW6nQ",
    authDomain: "mrt-control.firebaseapp.com",
    projectId: "mrt-control",
    storageBucket: "mrt-control.appspot.com",
    messagingSenderId: "250409494721",
    appId: "1:250409494721:web:f6d5064fc9f9ebf2f20c40",
    measurementId: "G-ZZPXVN784Q"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db}
