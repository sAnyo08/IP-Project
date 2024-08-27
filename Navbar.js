document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.navbar-toggle').addEventListener('click', function() {
        document.querySelector('.navbar').classList.toggle('active');
    });
});