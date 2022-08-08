const username = localStorage.getItem("FuelMeUser");

if(!username){
    window.location.assign("./login.html");
}
console.log("hi");
console.log(username);

fetch(`http://localhost:3000/api/users/${username}`)
    .then(res => res.json())
    .then(json => {
        console.log(json);
    })