// import { documentId } from "firebase/firestore";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  doc,
  setDoc,
  getFirestore,
  updateDoc,
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
    MontantCell.textContent = doc.data().somme_an + " FCFA";
    row.appendChild(MontantCell);
    // console.log(MontantCell);

    var MoisCell = document.createElement("td");
    MoisCell.textContent = doc.data().somme_mois + " " + "  FCFA";
    row.appendChild(MoisCell);

    var boutonGroup = document.createElement("td");
    boutonGroup.classList.add("btnGroup");

    var bouton1 = document.createElement("button");
    bouton1.textContent = "Modifier";
    boutonGroup.appendChild(bouton1);
    bouton1.classList.add("bouton1");

    // Boution modifier

    bouton1.addEventListener("click", () => {
      modifier(doc.id);
    });

    var bouton2 = document.createElement("button");
    boutonGroup.appendChild(bouton2);
    bouton2.classList.add("bouton2");
    bouton2.textContent = "Supprimer";
    bouton2.addEventListener("click", () => {
      supprimer(doc.id);
      setTimeout(() => {
        window.location.href = "tontine.html";
      }, 1000);
    });

    row.appendChild(boutonGroup);

    row.appendChild(boutonGroup);

    tableBody.appendChild(row);
  });

  // console.log(documentId);
  // Update

  async function modifier(documentId) {
    const modal2 = document.querySelector(".modal2");
    $("#Mofifier").modal("show");
    try {
      const docRef = doc(db, "tontine", documentId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const nom_tontine = document.getElementById("M_nom_tontine");
        const nb_participants = document.getElementById("M_nb_participants");
        const somme_an = document.getElementById("M_somme_an");
        const somme_mois = document.getElementById("M_somme_mois");
        console.log(somme_mois);
        nom_tontine.value = data.nom_tontine || " ";

        nb_participants.value = data.nombre_maximum_membres || "";
        somme_an.value = data.somme_an || "";
        somme_mois.value = data.somme_mois || "";

        console.log("Données chargées dans le formulaire:", data);
      } else {
        console.log("Aucun document trouvé avec l'ID:", documentId);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    }
    const modifierTontine = document.getElementById("modifier");
    modifierTontine.addEventListener("click", modifierTontineFunction);
    function modifierTontineFunction(event) {
      event.preventDefault();
      modifierTon(documentId);

      setTimeout(() => {
        $("#Mofifier").modal("hide");
        window.location.href = "tontine.html";
      }, 1000);
    }
  }

  // bouton modifier
  async function modifierTon(documentId) {
    const nom_tontine = document.getElementById("M_nom_tontine").value;
    const nb_participants = document.getElementById("M_nb_participants").value;
    const somme_an = document.getElementById("M_somme_an").value;
    const somme_mois = document.getElementById("M_somme_mois").value;

    const tontineRef = doc(db, "tontine", documentId);
    try {
      await updateDoc(tontineRef, {
        nom_tontine: nom_tontine,
        nombre_maximum_membres: parseInt(nb_participants),
        somme_an: parseInt(somme_an),
        somme_mois: parseInt(somme_mois),
      });
      console.log("Document mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du document :", error);
    }
  }

  // supprimer
  async function supprimer(documentId) {
    var choix = window.confirm("Voulez-wous supprimer ce document");
    if (choix === true) {
      await deleteDoc(doc(db, "tontine", documentId));
    }
  }

  // Now you can use 'db' to access Firestore
  console.log("Firestore initialized successfully!");
} catch (error) {
  console.error("Error initializing Firestore:", error);
}
