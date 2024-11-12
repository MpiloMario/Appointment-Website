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

const userRecords = collection(db, "user");

async function addData(data) {
    try {
        const docRef = await addDoc(userRecords, data);
        alert("Document written with ID: " + docRef.id);
    } catch (error) {
        alert("Error adding document: " + error);
    }
}

async function getUsers() {
    try {
        const querySnapshot = await getDocs(userRecords);
        let returnArray = [];
        querySnapshot.forEach((doc) => {
            returnArray.push(doc.data());
        });
        return returnArray;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}

const registerBtn = document.getElementById("registerBtn");
registerBtn.addEventListener("click", ()=>{
    document.getElementById("currentUserOption").textContent = "Register";

    const userInputDiv = document.getElementById('userInput');

    while (userInputDiv.firstChild) {
        userInputDiv.removeChild(userInputDiv.firstChild);
    }

    let namePar = document.createElement("p");
    namePar.textContent = "Name:";
    userInputDiv.appendChild(namePar);

    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.id = "nameReg";
    nameInput.placeholder = "Enter your name."
    userInputDiv.appendChild(nameInput);

    let surnamePar = document.createElement("p");
    surnamePar.textContent = "Surname:";
    userInputDiv.appendChild(surnamePar);

    let surnameInput = document.createElement("input");
    surnameInput.type = "text";
    surnameInput.name = "surname";
    surnameInput.id = "surnameReg";
    surnameInput.placeholder = "Enter your surname."
    userInputDiv.appendChild(surnameInput);

    let emailPar = document.createElement("p");
    emailPar.textContent = "Email:";
    userInputDiv.appendChild(emailPar);

    let emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.id = "emailReg";
    emailInput.placeholder = "Enter your email."
    userInputDiv.appendChild(emailInput);

    let roomPar = document.createElement("p");
    roomPar.textContent = "Room number:";
    userInputDiv.appendChild(roomPar);

    let roomInput = document.createElement("input");
    roomInput.type = "number";
    roomInput.name = "room";
    roomInput.id = "roomReg";
    roomInput.placeholder = "Enter your room number."
    userInputDiv.appendChild(roomInput);

    
    let passwordPar = document.createElement("p");
    passwordPar.textContent = "Password:";
    userInputDiv.appendChild(passwordPar);

    let passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.id = "passwordReg";
    passwordInput.placeholder = "Enter your password."
    userInputDiv.appendChild(passwordInput);

    userInputDiv.appendChild(document.createElement("br"))

    let register = document.createElement("input");
    register.type = "button";
    register.value = "Register";
    register.id = "register"
    userInputDiv.appendChild(register);

    let submit = document.getElementById("register");
    submit.addEventListener("click", () => {
        console.log("Button clicked");

        let name = document.getElementById("nameReg").value;
        let surname = document.getElementById("surnameReg").value;
        let email = document.getElementById("emailReg").value;
        let room = document.getElementById("roomReg").value;
        let password = document.getElementById("passwordReg").value;

        let data = {
            name: name,
            surname: surname,
            email: email,
            room: room,
            password: password
        };

        console.log(data);
        if(!data.surname || !data.name || !data.email || !data.room || !data.password){
        alert("Fill in the schedule form");
        }else{
        addData(data);
        setTimeout(()=>{ window.location.reload(); }, 2000);
        }
        
    })

})

//login

const login = document.getElementById("loginBtn");
login.addEventListener("click", async ()=>{
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email){
        try {
            let usersData = await getUsers();
            let found = false;
            
            usersData.forEach(user => {
                if(user.email == email){
                    found = true;
                }
            })


            if(found){
                let currentUser = usersData.find(user => user.email == email);
                if(password == currentUser.password){
                    window.sessionStorage.setItem("name", currentUser.name);
                    window.sessionStorage.setItem("surname", currentUser.surname);
                    window.sessionStorage.setItem("room", currentUser.room);
                    
                    setTimeout(()=>window.location.href = "https://mpilomario.github.io/Appointment-Website/Schedule.html", 2000);
                    
                }else{
                    alert("Wrong password. Try again!");
                    document.getElementById("password").value = "";
                }
            }else{
                alert("Account not found, register");
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
            }
        } catch (error) {
            console.error(error);
        }
    }else{
        alert("Email please")
    }
})



const CryptoJS = window.CryptoJS;

function generateRandomKey() {
    return CryptoJS.lib.WordArray.random(32); // 256-bit key (32 bytes)
}

function encryptMessage(message) {
    const key = generateRandomKey();  // Generate a random key
    const encrypted = CryptoJS.AES.encrypt(message, key).toString();
    return { encryptedMessage: encrypted, key: key.toString(CryptoJS.enc.Base64) };
}

function decryptMessage(encryptedMessage, key) {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, CryptoJS.enc.Base64.parse(key));
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
}

const message = 'Hello, World!';

const { encryptedMessage, key } = encryptMessage(message);
console.log('Encrypted:', encryptedMessage);
console.log('Randomly Generated Key (Base64):', key);

const decryptedMessage = decryptMessage(encryptedMessage, key);
console.log('Decrypted:', decryptedMessage);
