import { getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDJSW_0df4bpe01geqG4nZ-iwoQskITkDk",
  authDomain: "eocambo-retails.firebaseapp.com",
  projectId: "eocambo-retails",
  storageBucket: "eocambo-retails.appspot.com",
  messagingSenderId: "485406201376",
  appId: "1:485406201376:web:a8ac548ba3735b9d5ace45",
  measurementId: "G-JGVPM6YDNM"
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const app = getApp();