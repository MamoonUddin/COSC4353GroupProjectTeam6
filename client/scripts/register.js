const form = document.getElementById("form");

form.addEventListener("submit", event => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    let psw = document.getElementById("password");
    let pswRepeat = document.getElementById("repeat-password");

    if(psw.value != pswRepeat.value){
        alert("Passwords do not match");
        return;
    }

    const hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(psw.value);

    const hashedPass = hashObj.getHash("HEX")
    console.log(hashedPass);
    psw = null;
    pswRepeat == null;

    fetch("http://localhost:3000/api/users/registerAttempt", {
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
        if(json.registerSuccess){
            localStorage.setItem("FuelMeUser", username);
            window.location.assign("./profile.html");
        }
        else{
            alert("Failed to register user");
        }
    })
});