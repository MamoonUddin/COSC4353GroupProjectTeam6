const form = document.getElementById("form");
form.addEventListener("submit", event => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    let passElement = document.getElementById("password");
    const hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(passElement.value);
    
    const hashedPass = hashObj.getHash("HEX")
    passElement = null;

    fetch("http://localhost:3000/api/users/loginAttempt", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            username: username,
            hashedPass: hashedPass
        })
    })
    .then(res => res.json())
    .then(json => {
        if(json.validLogin){
            localStorage.setItem("FuelMeUser", username);
            window.location.replace("./profile.html");
        }
        else{
            alert("Failed to Log In");
        }
    })
    
});
