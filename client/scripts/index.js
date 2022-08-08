// Styling
window.addEventListener('scroll', (e) => {
    const navbar = document.querySelector('.navbar.sticky');
    if (window.pageYOffset > 0) {
        navbar.classList.add("shadow");
    } else {
        navbar.classList.remove("shadow");
    }
});

// Button Redirect
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    window.location.assign("./login.html");
});