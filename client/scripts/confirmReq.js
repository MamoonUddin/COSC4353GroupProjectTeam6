const form = document.getElementById("form");

const populateForm = (
    formDataJSON
) => {
    const gallons = document.getElementById("gallons");
    const ppg = document.getElementById("pricePerGallon");
    const price = document.getElementById("price");
    const state = document.getElementById("state");
    gallons.value = formDataJSON.gallons || gallons.value;
    ppg.value = formDataJSON.ppg || ppg.value;
    state.value = formDataJSON.state || state.value;

    price.value = (formDataJSON.gallons && formDataJSON.ppg)? (formDataJSON.gallons * formDataJSON.ppg) : price.value;
}
populateForm({
    gallons: localStorage.getItem("gallons"),
    ppg: localStorage.getItem("ppg"),
    state: localStorage.getItem("state")
});


form.addEventListener("submit", event => {
    event.preventDefault();
    // POST request to submit transaction data
    // fetch("http://localhost:3000/api/users")
})
