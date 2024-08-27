// Import Firebase functions for initializing the app and interacting with the database
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, set, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"; 

// Firebase configuration object containing API key and project details
const firebaseConfig = {
    apiKey: "AIzaSyAUXlhuxGnInSC-DztcNc8ip5a-Nb0gh9k",
    authDomain: "blog-data-94176.firebaseapp.com",
    databaseURL: "https://blog-data-94176-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "blog-data-94176",
    storageBucket: "blog-data-94176.appspot.com",
    messagingSenderId: "718807428099",
    appId: "1:718807428099:web:700777d8758150dbbc3236"
};

// Initialize Firebase application with the configuration object
const app = initializeApp(firebaseConfig);
// Get a reference to the Firebase Realtime Database
const db = getDatabase(app);

console.log("DataBase working", db); // Log to confirm database initialization

// ----------------------------------------------------------------------
// Fetch blogs from Firebase and display them in the blog container
const blogRef = ref(db, 'Blogss'); // Reference to the 'Blogss' node in the database
onValue(blogRef, (snapshot) => {
  const data = snapshot.val(); // Get the data from the database snapshot
  const blogContainer = document.getElementById('blog-container'); // Get the blog container element

  console.log("display below");
  for (let id in data) { // Iterate through each blog entry in the data
    const blog = data[id]; // Get the individual blog data

    // Create a new blog card element
    const blogCard = document.createElement('div');
    blogCard.className = 'blog-card';
    console.log("card displayed");

    // Add the blog image to the card
    const blogImage = document.createElement('img');
    blogImage.src = blog.Blog_image; // Use the blog image URL from the data
    blogCard.appendChild(blogImage);
    console.log("image displayed");

    // Add the blog title to the card
    const blogName = document.createElement('h2');
    blogName.innerText = blog.Blog_title;
    blogCard.appendChild(blogName);
    console.log("Title displayed");

    // Add the blog description to the card
    const blogdescription = document.createElement('p');
    blogdescription.innerText = blog.Blog_description;
    blogCard.appendChild(blogdescription);
    console.log("description displayed");

    // Add the user name (author) to the card
    const userName = document.createElement('h5');
    userName.innerText = "By: " + blog.User_name;
    blogCard.appendChild(userName);
    console.log("name displayed");

    // Display the blog date on the card
    const blogDate = document.createElement('p');
    blogDate.innerText = "Date: " + blog.Blog_date;
    blogCard.appendChild(blogDate);

    // Append the blog card to the blog container
    blogContainer.appendChild(blogCard);
  }
});

// -------------------------------------------------------------------------------------------
// Handle form submission to add a new blog entry
const form = document.getElementById('blog-form');
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get the input values from the form
  const UserName = document.getElementById('User-name').value;
  const Title = document.getElementById('User-Title').value;
  const Description = document.getElementById('Blog-description').value;
  const BlogImage = document.getElementById('Blog-image').value;
  const BlogDate = getCurrentDate(); // Get the current date

  // Create a new entry in the database
  const newBlogRef = push(blogRef); // Push a new entry to the 'Blogss' node
  set(newBlogRef, {
    User_name: UserName,
    Blog_title: Title,
    Blog_description: Description,
    Blog_image: BlogImage,
    Blog_date: BlogDate, // Include the current date in the blog data
  });
  console.log("data pushed");

  form.reset(); // Clear the form after submission
});

// -------------------------------------------------------------------------------------------------------------------
// Handle the submission message display
const submitButton = document.getElementById('button'); // Get the submit button element
const submissionMessage = document.getElementById('submission-message'); // Get the submission message element

// Add event listener to the submit button to show a message after submission
submitButton.addEventListener('click', () => {
  submissionMessage.style.display = 'block'; // Show the message

  // Hide the message after 2 seconds
  setTimeout(() => {
    submissionMessage.style.display = 'none';
  }, 2000); // Hide after 2 seconds
});

// ---------------------------------------------------------------------
// Function to get the current date in 'DD-MM-YYYY' format
const getCurrentDate = () => 
  new Date().toLocaleDateString('en-GB').replace(/\//g, '-'); // Replace slashes with dashes
