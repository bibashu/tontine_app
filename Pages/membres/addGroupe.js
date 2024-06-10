// import { documentId } from "firebase/firestore";
// import { documentId } from "firebase/firestore";
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
  var tableBody = document.querySelector(".table-tontine");
  // console.log(tableBody);
  var detailMembres = document.querySelector('.detailMembres')
  // console.log(detailMembres)
  var memberId = sessionStorage.getItem('memberId');


  const docRef = doc(db, "membres", memberId);
  const docSnapshot = await getDoc(docRef);

  var rowDetail = document.createElement('ul')
  const data = docSnapshot.data()
  rowDetail.innerHTML = `
      <ul>
                    <li>Nom: ${data.nom}</li>
                    <li>Prenom: ${data.prenom}</li>
                    <li>Numero: ${data.telephone}</li>
                   
                    <li>Tontine Participé: ${data.email}</li>
                  </ul> 
  `
  detailMembres.appendChild(rowDetail)

  const querySnapshot = await getDocs(collection(db, "tontine"));
  querySnapshot.forEach((doc) => {
 
    var row = document.createElement("tr");

    var nomCell = document.createElement("td");
    nomCell.textContent = doc.data().nom_tontine;
    row.appendChild(nomCell);
    // console.log(nomCell)

    var NombreCell = document.createElement("td");
    NombreCell.textContent = doc.data().nombre_maximum_membres;
    row.appendChild(NombreCell);
    // console.log(NombreCell)

    var MontantCell = document.createElement("td");
    MontantCell.textContent = doc.data().somme_an ;
    row.appendChild(MontantCell);
    // console.log(MontantCell);
    
    var MoisCell = document.createElement("td");
if(doc.data().estOuvert){
    MoisCell.textContent =  "Ouvert";
    row.appendChild(MoisCell);
}else{
    MoisCell.textContent =  "Fermé";
    row.appendChild(MoisCell);

}

    var boutonGroup = document.createElement("td");
    boutonGroup.classList.add("btnGroup");

    var bouton1 = document.createElement("button");
    bouton1.textContent = "Participer";
    boutonGroup.appendChild(bouton1);
    bouton1.classList.add("bouton1");

    bouton1.addEventListener('click', () =>{
      var memberId = sessionStorage.getItem('memberId');
      // console.log(memberId)
        ajouterIDtontine(doc.id, memberId )
        // console.log(doc.id)
    })

    
    
    row.appendChild(boutonGroup);

    row.appendChild(boutonGroup);

    tableBody.appendChild(row);
  });

  // console.log(documentId);
  // Update



  // bouton modifier
 

  // supprimer
  

  // Now you can use 'db' to access Firestore
  console.log("Firestore initialized successfully!");
} catch (error) {
  console.error("Error initializing Firestore:", error);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function ajouterIDtontine(documentId, memberId) {
// console.log(memberId)
console.log(documentId)
const memberRef = doc(db, "membres", memberId);

try {
    // Mise à jour du document membre avec l'ID de la tontine
    await updateDoc(memberRef, {
        tontineId:documentId
    });
   alert("membre ajouté dans le groupe avec success")
    // document.getElementById('resultMessage').textContent = 'Mise à jour réussie';
} catch (error) {
    console.error('Erreur lors de la mise à jour du document:', error);
    // document.getElementById('resultMessage').textContent = 'Erreur lors de la mise à jour';
}

    
}

