// let http = new XMLHttpRequest();

// http.open('get','data.json', true);

// http.send();

// http.onload = function(){
//     if(this.readyState == 4 && this.status == 200){
//         let products= JSON.parse(this.responseText);
//         let output ="";

//         for(let item of products){
//             output = output + `
//             <div class="card">
//             <img class="playerimg"src="${item.image}" alt="${item.name}">
//             <h1>${item.name}</h1>
//             <p class="title">${item.title}</p>
//             <button class="buttons"><a href="${item.link}">${item.button}</a></button>
//             </div>
//             `
//         };
//         document.querySelector(".products").innerHTML= output;
//     }
// }
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyClk69N05esYdgvv-MJufSKT2KG_UFB4bc",
    authDomain: "dbms-42760.firebaseapp.com",
    databaseURL: "https://dbms-42760-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dbms-42760",
    storageBucket: "dbms-42760.appspot.com",
    messagingSenderId: "453104023779",
    appId: "1:453104023779:web:fa3411a345e11704a4edd6"
};

// Initialize Firebase with the provided configuration
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Get a reference to the Firebase Realtime Database

// Reference to the 'players' node in the database
const playersRef = ref(database, 'players');

// Log to console to confirm the script is running
console.log("printed");

// Fetch data from the 'players' node and display it
onValue(playersRef, (snapshot) => {
    const playersList = document.getElementById('products'); // Get the container where player cards will be displayed
    playersList.innerHTML = ''; // Clear the container before adding new data

    // Iterate through each player record in the snapshot
    snapshot.forEach(childSnapshot => {
        const childData = childSnapshot.val(); // Get the data for each player
        
        // Create a div element to hold the player card
        const playerCard = document.createElement('div');
        playerCard.className = 'card'; // Assign a class for styling

        // Create an image element for the player's photo
        const playerImage = document.createElement('img');
        playerImage.className = 'playerimg'; // Assign a class for styling
        playerImage.src = childData.image; // Set the image source
        playerImage.alt = childData.playerName
        // playerImage.alt = childData.playerName; // Optional: Set an alt text for accessibility
        playerCard.appendChild(playerImage); // Add the image to the card

        // Create an element for the player's name
        const playerName = document.createElement('h1');
        playerName.className = 'name'; // Assign a class for styling
        playerName.textContent = childData.playerName; // Set the player's name
        playerCard.appendChild(playerName); // Add the name to the card

        // Create an element for the team name
        const teamName = document.createElement('p');
        teamName.className = 'title'; // Assign a class for styling
        teamName.textContent = childData.teamName; // Set the team name
        playerCard.appendChild(teamName); // Add the team name to the card

        // Append the completed player card to the players list container
        playersList.appendChild(playerCard);
    });
});

        