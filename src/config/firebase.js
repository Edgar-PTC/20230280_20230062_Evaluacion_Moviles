// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"; 
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0DbazAzJFo8lz5-KGmf1jS4thNaZSWAM",
  authDomain: "evaluacionfirebase-b0dc6.firebaseapp.com",
  projectId: "evaluacionfirebase-b0dc6",
  storageBucket: "evaluacionfirebase-b0dc6.firebasestorage.app",
  messagingSenderId: "821823770610",
  appId: "1:821823770610:web:45d240da1cad5852e2656b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);