const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  doc,
  setDoc,
  getFirestore,
  updateDoc,
  arrayUnion,
  collection,
  deleteDoc,
  getDocs,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyD44U4byzNxfmlLVO3qNIZPCjHwNGhhRFQ",
  authDomain: "tontine-de756.firebaseapp.com",
  projectId: "tontine-de756",
  storageBucket: "tontine-de756.appspot.com",
  messagingSenderId: "670880072879",
  appId: "1:670880072879:web:116cad2eeb743b63ee805a",
};
try {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  var cartTontine = document.querySelector(".cardTontine");
  var nb_tontine = document.querySelector(".nb_tontine");
  var count = 0;

  const querySnapshot = await getDocs(collection(db, "membres"));
  querySnapshot.forEach((doc) => {
    count += 1;
    });
    var countTitre = document.createElement('span')
    countTitre.textContent = count
    nb_tontine.appendChild(countTitre)
    cartTontine.appendChild(nb_tontine)




} catch (error) {
  console.error("Erreur lors de la mise à jour du document:", error);
  // document.getElementById('resultMessage').textContent = 'Erreur lors de la mise à jour';
}
