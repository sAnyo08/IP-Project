// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

// Firebase configuration object containing your project's credentials
const firebaseConfig = {
    apiKey: "AIzaSyClk69N05esYdgvv-MJufSKT2KG_UFB4bc",
    authDomain: "dbms-42760.firebaseapp.com",
    databaseURL: "https://dbms-42760-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dbms-42760",
    storageBucket: "dbms-42760.appspot.com",
    messagingSenderId: "453104023779",
    appId: "1:453104023779:web:fa3411a345e11704a4edd6"
};

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

// Add an event listener to run the code when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the container element where team cards will be displayed
    const teamsContainer = document.getElementById('teamsContainer');
    if (!teamsContainer) {
        console.error('Element with ID "teamsContainer" not found.');
        return;
    }

    // Reference to the 'teams' node in the Firebase Realtime Database
    const teamsRef = ref(database, 'teams');

    // Fetch data from the 'teams' node and handle the response
    onValue(teamsRef, (snapshot) => {
        // Clear any previous data in the container
        teamsContainer.innerHTML = '';

        // Iterate through each child node in the snapshot
        snapshot.forEach((childSnapshot) => {
            // Get the data for the current child node
            const childData = childSnapshot.val();

            // Create a new div element for the team card
            const teamCard = document.createElement('div');
            teamCard.className = 'team-card';

            // Create an image element and set its source
            const img = document.createElement('img');
            img.src = childData.teamImage || 'https://via.placeholder.com/150';  // Use fallback image if no image URL is provided
            img.alt = childData.teamName
            teamCard.appendChild(img);

            // Create a div element for the team position and set its text content
            const textpositionElem = document.createElement('div');
            textpositionElem.className = 'team-name';
            textpositionElem.textContent = ` ${childData.teamposition}`;
            teamCard.appendChild(textpositionElem);

            // Create a div element for the team points and set its text content
            const teampointsElem = document.createElement('div');
            teampointsElem.className = 'text';
            teampointsElem.textContent = `Points: ${childData.teampoints}`;
            teamCard.appendChild(teampointsElem);

            // Append the team card to the container
            teamsContainer.appendChild(teamCard);
        });
    }, (error) => {
        // Handle any errors that occur while fetching data
        console.error('Error fetching data:', error.message);
    });
});
