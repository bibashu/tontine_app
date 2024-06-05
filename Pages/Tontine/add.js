import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// import { firebase } from "https://www.gstatic.com/firebasejs/10.9.0/firebase.js"; 
import{ getFirestore, firebase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

console.log(db)

const submitTontine = document.getElementById("submit");

submitTontine.addEventListener("click", (event) => {
  event.preventDefault();
  const nom_tontine = document.getElementById("nom_tontine")
  const nb_participants = document.getElementById("nb_participants").valu
  const somme_an = document.getElementById("somme_an").value;
  const somme_mois = document.getElementById("somme_mois").value;
  console.log(nom_tontine)
  // Add a new document with a generated id.
db.collection("tontine").add({
  nom_tontine: nom_tontine,
  nombre_maximum_membres: nb_participants,
  somme_an: somme_an,
  somme_mois: somme_mois

})
.then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
  console.error("Error adding document: ", error);
});
    

});


