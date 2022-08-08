const form = document.getElementById("form");


form.addEventListener("submit", event => {
    event.preventDefault();

    const email = document.getElementById("email");
    const psw = document.getElementById("psw");
    const repeat = document.getElementById("psw-repeat");

    if(psw.value != repeat.value){
        alert("Passwords don't match");
        return;
    }

    // POST request to update password

});