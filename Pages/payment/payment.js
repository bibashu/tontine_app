// import { documentId } from "firebase/firestore";
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

  const querySnapshot = await getDocs(collection(db, "payments"));
  querySnapshot.forEach((doc) => {
    // aficher détaile

    var row = document.createElement("tr");

    var nomCell = document.createElement("td");
    nomCell.textContent = doc.data().nom;
    row.appendChild(nomCell);
    // console.log(nomCell)

    var NombreCell = document.createElement("td");
    NombreCell.textContent = doc.data().montant;
    row.appendChild(NombreCell);
    // console.log(NombreCell)

    var MontantCell = document.createElement("td");
    MontantCell.textContent = doc.data().duree;
    row.appendChild(MontantCell);
    var datepay = document.createElement("td");
    datepay.textContent = doc.data().date;
    row.appendChild(datepay);
    // console.log(MontantCell);

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
        window.location.href = "payment.html";
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
    // Je suppose que "Mofifier" était une faute de frappe et que c'est "Modifier"
    var dropList_M = document.querySelector(".dropList_M");
    var select_M = document.querySelector("#dropdownSelect_M");
    console.log(select_M);

    const querySnapshot2 = await getDocs(collection(db, "membres"));
    querySnapshot2.forEach((doc) => {
      var memberlist = document.createElement("option");
      memberlist.textContent = doc.data().nom;
      select_M.appendChild(memberlist);

      dropList_M.appendChild(select_M);
    });
    // Charger ledropdown duréé
    var dropList2_M = document.querySelector(".dropList2_M");
    var select2_M = document.querySelector("#dropdownSelectDuree_M");

    const querySnapshot1 = await getDocs(collection(db, "tontine"));
    querySnapshot1.forEach((doc) => {
      var tontine = document.createElement("option");
      tontine.textContent = doc.data().nom_tontine + " - " + doc.data().duree;

      select2_M.appendChild(tontine);
      dropList2_M.appendChild(select2_M);
    });

    try {
      const docRef = doc(db, "payments", documentId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data(); // Récupérer les données du document
        // const nom = document.getElementById("dropdownSelect");
        const montant = document.getElementById("M_montant");
        // const duree = document.querySelector(".duree");
        const date = document.getElementById("M_date_payment");

        // Remplir les champs du formulaire avec les données du document
        // nom.value = data.nom || "";
        montant.value = data.montant || "";
        // duree.value = data.duree || "";
        date.value = data.date || "";
        // passwordInput.value = data.password || "";

        console.log("Données chargées dans le formulaire:", data);
      } else {
        console.log("Aucun document trouvé avec l'ID:", documentId);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    }

    // Ajouter un écouteur d'événements sur le bouton "modifier"
    const modifierButton = document.getElementById("modifier");
    modifierButton.addEventListener("click", modifierMembre);

    // Fonction pour gérer le clic sur le bouton "modifier"
    function modifierMembre(event) {
      event.preventDefault();
      modifierTon(documentId); // Appeler votre fonction modifierTon avec l'ID du document

      // setTimeout(() => {
      //   $("#Modifier").modal("hide"); // Masquer la modal après la modification
      //   window.location.href = "payment.html"; // Rediriger vers la page tontine.html
      // }, 1000); // Attendre 1 seconde avant de masquer la modal et de rediriger
    }
  }

  // bouton modifier
  async function modifierTon(documentId) {
    const nom = document.getElementById("dropdownSelect").value;
    // console.log(nom)
    const montant = document.getElementById("M_montant").value;
    const duree = document.querySelector(".duree").value;
    const date = document.getElementById("M_date_payment").value;

    const tontineRef = doc(db, "payments", documentId);
    try {
      await updateDoc(tontineRef, {
        nom: nom,
        montant: parseInt(montant),
        duree: duree,
        date: date,
        });
      console.log(nom)
      console.log("Document mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du document :", error);
    }
  }

  // supprimer
  async function supprimer(documentId) {
    var choix = window.confirm("Voulez-wous supprimer ce document");
    if (choix === true) {
      await deleteDoc(doc(db, "payments", documentId));
    }
  }

  // Now you can use 'db' to access Firestore
  console.log("Firestore initialized successfully!");
} catch (error) {
  console.error("Error initializing Firestore:", error);
}
