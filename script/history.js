import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAx6CFN7bzU6aMFqgMIpux2GkFr5ii2png",
    authDomain: "machine-scheduler-55dd0.firebaseapp.com",
    projectId: "machine-scheduler-55dd0",
    storageBucket: "machine-scheduler-55dd0.firebasestorage.app",
    messagingSenderId: "612198258545",
    appId: "1:612198258545:web:46912412ef85687a4088d0",
    measurementId: "G-ZDH2B13TQ1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async ()=>{
    const recordsCollectionRef = collection(db, "records");
    let childDiv;
    let parentDiv = document.getElementById("history");
    let finalArray = [];
    try{
        const querySnapshot = await getDocs(recordsCollectionRef);
        querySnapshot.forEach(doc => {
            let element = doc.data();
            if(element.name == window.sessionStorage.getItem("name") && element.surname == window.sessionStorage.getItem("surname")){
                finalArray.push(element);
            }
        });

        finalArray.sort((a, b) =>  new Date(b.serviceDate) - new Date(a.serviceDate));


        finalArray.forEach(element => {
            console.log(element);
            childDiv = document.createElement("div");
            childDiv.style.fontSize = '20px';
            childDiv.style.padding = "1vw";
            childDiv.style.marginTop = "5vh";
            childDiv.style.backgroundColor = '#222222';
            childDiv.innerHTML += `<p><b>Date</b>: ${element.serviceDate}</p> <p><b>Floor</b>: ${element.floor}</p> <p><b>Machine</b>: ${element.machine}</p> <p><b>Time</b>: ${element.time}</p>` 
            parentDiv.appendChild(childDiv);
        })
    }catch(error){
        console.error(error);
    }
})



