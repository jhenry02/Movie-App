// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5Y_GENhmaxETfgSBk7EJqF-62hI7dxRA",
    authDomain: "fullstackproject-55906.firebaseapp.com",
    projectId: "fullstackproject-55906",
    storageBucket: "fullstackproject-55906.appspot.com",
    messagingSenderId: "69319146641",
    appId: "1:69319146641:web:7d8f1f14a20b3d49d25330",
    measurementId: "G-KRFV4STY0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
