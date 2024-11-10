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

let scheduledTime = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"]

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


const recordsCollectionRef = collection(db, "records");

document.addEventListener("DOMContentLoaded", ()=>{
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  
  document.getElementById("service_date").setAttribute("min", formattedDate);
  let time = document.getElementById("time");
  scheduledTime.forEach(timeCap => {
    let option = document.createElement("option");
    option.value = timeCap;
    option.textContent = timeCap;
    time.appendChild(option)    
  });
  
})

async function getMachines() {
    try {
        const querySnapshot = await getDocs(recordsCollectionRef);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}

async function addData(data) {
    try {
        const docRef = await addDoc(recordsCollectionRef, data);
        alert("Document written with ID: " + docRef.id);
    } catch (error) {
        alert("Error adding document: " + error);
    }
}

getMachines();

let sendBtn = document.getElementById("sendBtn");
sendBtn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Button clicked");

    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let floor = document.getElementById("floor").value;
    let machine = document.getElementById("machine").value;
    let serviceDate = document.getElementById("service_date").value;
    let time = document.getElementById("time").value;


    let data = {
        name: name,
        surname: surname,
        floor: floor,
        machine: machine,
        serviceDate: serviceDate,
        time: time
    };
    
    if(data.floor){
      data.floor = parseInt(data.floor[0])
    }

    console.log(data);
    if(!data.surname || !data.name || !data.floor || !data.machine || !data.serviceDate){
      alert("Fill in the schedule form");
    }else{
      addData(data);
    }
    
});
