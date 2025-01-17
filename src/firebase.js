import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBDHP8kUBU3mk8riVpwtgVINTHFAbn5_kM",
    authDomain: "event-coordination-platform.firebaseapp.com",
    projectId: "event-coordination-platform",
    storageBucket: "event-coordination-platform.firebasestorage.app",
    messagingSenderId: "205285868616",
    appId: "1:205285868616:web:3531b41e63982f83d2047d",
    measurementId: "G-PDDXFKTCQY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const db = getFirestore(app);