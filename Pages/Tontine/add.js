import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
 
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

      // Initialize Cloud Firestore and get a reference to the service
      const db = getFirestore(app);



const submitTontine = document.getElementById("submit");

submitTontine.addEventListener("click", addTontine)


async function addTontine(event){
  event.preventDefault()
  // alert("ca marche")
  try {
    const nom_tontine = document.getElementById("nom_tontine").value
  const nb_participants = document.getElementById("nb_participants").value
  const somme_an = document.getElementById("somme_an").value;
  const somme_mois = document.getElementById("somme_mois").value;

 
    // Replace 'your-collection-name' with the name of your Firestore collection
    const docRef = await addDoc(collection(db, 'tontine'), {
      // Replace the following with the data you want to store
      nom_tontine: nom_tontine,
      nombre_maximum_membres: parseInt(nb_participants),
      somme_an: parseInt(somme_an),
      somme_mois: parseInt(somme_mois)
    });
    setTimeout(() => {
      
      window.location.href = "./tontine.html"

    }, 1000);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}