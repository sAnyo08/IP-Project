// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Add a click event listener to the element with class 'navbar-toggle'
    document.querySelector('.navbar-toggle').addEventListener('click', function() {
        // Toggle the 'active' class on the element with class 'navbar'
        document.querySelector('.navbar').classList.toggle('active');
    });
});
