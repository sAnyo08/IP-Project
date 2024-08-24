import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, set, ref, push, onValue} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"; 


const firebaseConfig = {
    apiKey: "AIzaSyAUXlhuxGnInSC-DztcNc8ip5a-Nb0gh9k",
    authDomain: "blog-data-94176.firebaseapp.com",
    databaseURL: "https://blog-data-94176-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "blog-data-94176",
    storageBucket: "blog-data-94176.appspot.com",
    messagingSenderId: "718807428099",
    appId: "1:718807428099:web:700777d8758150dbbc3236"
  };
 
// Initialize Firebase  
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log("DataBase working",db);




// Fetch players from Firebase and display them
const blogRef = ref(db, 'Blogss');
onValue(blogRef, (snapshot) => {
  const data = snapshot.val();
  const blogContainer = document.getElementById('blog-container');
//   blogContainer.innerHTML = ''; // Clear the container

// let blogCards = [];
console.log("display below");
  for (let id in data) {
    const blog = data[id];
    const blogCard = document.createElement('div');
    blogCard.className = 'blog-card';
console.log("card displayed");

    const blogImage = document.createElement('img');
    // blogCard.className= 'img';
    blogImage.src = blog.Blog_image; // Assuming the image URL is stored in the 'image' field
    blogCard.appendChild(blogImage);
console.log("image displayed");

    const blogName = document.createElement('h2');
    blogName.innerText = blog.Blog_title;
    blogCard.appendChild(blogName);
console.log("Title displayed");

    const blogdescription = document.createElement('p');
    blogdescription.innerText = blog.Blog_description;
    blogCard.appendChild(blogdescription);
console.log("description displayed");

    const userName = document.createElement('h5');
    userName.innerText = "By: "+blog.User_name;
    blogCard.appendChild(userName);
console.log("name displayed");

//     const button = document.createElement('button');
//     button.innerText = 'Click Me';
//     button.onclick = () => alert(`Player: ${blog.name}, Team: ${blog.description}`);
//     blogCard.appendChild(button);
// console.log("button displayed");

    blogContainer.appendChild(blogCard);
    // blogCards.push(blogCard);
  }
  // blogCards = shuffleArray(blogCards);
  // // Append shuffled cards to the container
  // blogCards.forEach(card => blogContainer.appendChild(card));
});

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// blogCards = shuffleArray(blogCards);

// -------------------------------------------------------------------------------------------
// Handle form submission to add a new player
const form = document.getElementById('blog-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const UserName = document.getElementById('User-name').value;
  const Title = document.getElementById('User-Title').value;
  const Description = document.getElementById('Blog-description').value;
  const BlogImage = document.getElementById('Blog-image').value;
  

  const newBlogRef = push(blogRef);
  set(newBlogRef, {
    User_name: UserName,
    Blog_title: Title,
    Blog_description: Description,
    Blog_image: BlogImage
  });
  console.log("data pushed");
  form.reset(); // Clear the form after submission
});

// -------------------------------------------------------------------------------------------------------------------
// Get the button and message elements
const submitButton = document.getElementById('button');
const submissionMessage = document.getElementById('submission-message');

// Add event listener to the button
submitButton.addEventListener('click', () => {
  // Display the message
  submissionMessage.style.display = 'block';

  // Optionally hide the message after a few seconds
  setTimeout(() => {
    submissionMessage.style.display = 'none';
  }, 2000); // Hide after 3 seconds
});

// ---------------------------------------------------------------------

