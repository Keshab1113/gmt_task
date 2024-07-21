import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEYFB,
    authDomain: "gmttask-db80f.firebaseapp.com",
    projectId: "gmttask-db80f",
    storageBucket: "gmttask-db80f.appspot.com",
    messagingSenderId: "146034304098",
    appId: "1:146034304098:web:3ff0a531820bedf0ce9d3b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
