import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
import {
  getAuth,
  signOut ,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD44U4byzNxfmlLVO3qNIZPCjHwNGhhRFQ",
  authDomain: "tontine-de756.firebaseapp.com",
  projectId: "tontine-de756",
  storageBucket: "tontine-de756.appspot.com",
  messagingSenderId: "670880072879",
  appId: "1:670880072879:web:116cad2eeb743b63ee805a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);




var logout = document.getElementById('logout')
logout.addEventListener('click', () =>{
    const auth = getAuth();
    signOut(auth).then(() => {
    window.location.href= '/index.html'
    }).catch((error) => {
      console.log('erreur')
    });
})