import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs
 
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
// creation d'un dropdown
var dropList = document.querySelector(".dropList")
var select = document.querySelector("#dropdownSelect")



// console.log(dropList)
const querySnapshot = await getDocs(collection(db, "membres"));
querySnapshot.forEach((doc) => {
   var memberlist = document.createElement("option")
    memberlist.textContent= doc.data().nom
   select.appendChild(memberlist)
   
   dropList.appendChild(select)
})

var dropList2 = document.querySelector(".dropList2")
var select2 = document.querySelector("#dropdownSelectDuree")

const querySnapshot1 = await getDocs(collection(db, "tontine"));
querySnapshot1.forEach((doc) => {
 var tontine = document.createElement('option')
 tontine.textContent= doc.data().nom_tontine +  ' - ' + doc.data().duree 

 select2.appendChild(tontine)
 dropList2.appendChild(select2)


})



const submitTontine = document.getElementById("submitTontine");

submitTontine.addEventListener("click", addpayment)


async function addpayment(event){
  event.preventDefault()
  // alert("ca marche")
  try {
    const nom = document.querySelector(".nom").value;
    const montant = document.getElementById("montant").value;
    const duree = document.querySelector(".duree").value;
    const date = document.getElementById("date_payment").value;

    // Replace 'payments' with the name of your Firestore collection
    const docRef = await setDoc(doc(collection(db, "payments")), {
      nom: nom,
      montant: parseInt(montant),
      duree: duree,
      date: date,
      
    });


    setTimeout(() => {
      console.log("ajout réussi");
      window.location.href = "./payment.html";
    }, 1000);
  }  catch (e) {
    console.error("Error adding document: ", e);
  }
}
