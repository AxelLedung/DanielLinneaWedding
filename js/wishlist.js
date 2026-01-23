/*const API_URL = "https://script.google.com/macros/s/AKfycbzg5SMvh2MB1eRlhTacuv_EjBnFkBTBjCYX33L37A-ogHWmyfjvgwmwJ40IkZhjvjPR/exec";

// Ladda alla gåvor
async function loadGifts() {
    const res = await fetch(API_URL);
    const gifts = await res.json(); 
    
    const tbody = document.querySelector("#gift-table tbody");
    tbody.innerHTML = "";

    gifts.forEach(gift => {
        const tr = document.createElement("tr");

        const tdWish = document.createElement("td");
        tdWish.textContent = gift.wish;
        tr.appendChild(tdWish);

        const tdInput = document.createElement("td");
        const input = document.createElement("input");
        input.value = gift.boughtBy;
        input.placeholder = "Ditt namn";
        input.addEventListener("change", () => updateGift(gift.id, input.value));
        tdInput.appendChild(input);

        tr.appendChild(tdInput);
        tbody.appendChild(tr);
    });
}

// Skicka uppdatering till Google Sheet
async function updateGift(id, boughtBy) {
    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ id, boughtBy }),
        headers: { "Content-Type": "application/json" }
    });
}
loadGifts();


*/
const API_URL = "https://script.google.com/macros/s/AKfycbz5goPR7o0Rmx42C8JPICJyqJClqJptkTIozsRIMVKDwOIOr-bEz3I5vvE_0_qrT4SNyg/exec";

let gifts = []; // sparar data från Google Sheet

// Ladda alla gåvor
async function loadGifts() {
    const res = await fetch(API_URL);
    gifts = await res.json(); 
    
    const tbody = document.querySelector("#gift-table tbody");
    tbody.innerHTML = "";

    gifts.forEach(gift => {
        const tr = document.createElement("tr");

        const tdWish = document.createElement("td");
        tdWish.textContent = gift.wish;
        tr.appendChild(tdWish);

        const tdInput = document.createElement("td");
        const input = document.createElement("input");
        input.value = gift.boughtBy;
        input.placeholder = "Ditt namn";
        input.dataset.id = gift.id; // spara ID på input
        tdInput.appendChild(input);

        tr.appendChild(tdInput);
        tbody.appendChild(tr);
    });
}

// Skicka alla uppdateringar till Google Sheet
async function submitGifts() {
    alert("Skickar uppdateringar...");
    const tbody = document.querySelector("#gift-table tbody");
    const rows = tbody.querySelectorAll("tr");

    for (let tr of rows) {
        const input = tr.querySelector("input");
        const id = input.dataset.id;
        const boughtBy = input.value.trim();

        await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({ id, boughtBy }),
            headers: { "Content-Type": "application/json" }
        });
    }

    alert("Alla uppdateringar har skickats!");
}

// Event listener för Submit-knappen
document.getElementById("submit-gifts").addEventListener("click", submitGifts);

document.addEventListener("DOMContentLoaded", loadGifts);