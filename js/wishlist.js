const API_URL = "https://script.google.com/macros/s/AKfycbzadHRU0xtaJe4iC2I3KxNeNkhMD17UQhQubavfIbX7zLIZ0OP52xZDkZoR5Tvad4tZgw/exec";

//KOLLA DENNA VIDEO
//https://www.youtube.com/watch?v=N3vnUgjQCGU&t=74s
//https://diyavijay.medium.com/struggling-with-cors-in-google-apps-script-heres-the-fix-e3eec09f07dd

let gifts = [];

async function loadGifts() {
    const res = await fetch(API_URL);
    gifts = await res.json();

    const tbody = document.querySelector("#gift-table tbody");

    gifts.shift();
    gifts.forEach(gift => {
        const tr = document.createElement("tr");

        const tdWish = document.createElement("td");
        tdWish.textContent = gift.wish;
        tr.appendChild(tdWish);

        const tdName = document.createElement("td");
        tdName.textContent = gift.boughtBy;
        tr.appendChild(tdName);
        
        tbody.appendChild(tr);
    });
}

/*
async function submitGifts() {
    alert("Skickar uppdateringar...");

    const dataToSend = JSON.stringify({ "id": 1, "boughtBy": "Johan" });

    await fetch(API_URL, {
        method: "POST",
        body: dataToSend,
        redirect: "manual",
        headers: {
        'Content-Type': 'text/plain;charset=utf-8',
        }
    })
        .then((response) => {
            console.log("Success:", response);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    /*
    const body = { id: 1,
                           boughtBy: "Johan" };
    
            fetch(API_URL, {
                method: "POST",                  // same as -d in curl
                headers: {
                    "Content-Type": "application/json" // tell server it's JSON
                },
                body: JSON.stringify(body)       // same as -d '{"key":"value"}'
                })
                .then(response => response.json()) // parse JSON response
                .then(result => {
                    console.log("Success:", result);
                })
                .catch(error => {
                    console.error("Error:", error);
            });
            /*
        const tbody = document.querySelector("#gift-table tbody");
        const rows = tbody.querySelectorAll("tr");
    
        for (let tr of rows) {
            const input = tr.querySelector("input");
            const id = input.dataset.id;
            const boughtBy = input.value.trim();
            const body = { id: 1,
                           boughtBy: "Johan" };
    
            fetch(API_URL, {
                method: "POST",                  // same as -d in curl
                headers: {
                    "Content-Type": "application/json" // tell server it's JSON
                },
                body: JSON.stringify(body)       // same as -d '{"key":"value"}'
                })
                .then(response => response.json()) // parse JSON response
                .then(result => {
                    console.log("Success:", result);
                })
                .catch(error => {
                    console.error("Error:", error);
            });
        }
    */
   /*
    alert("Alla uppdateringar har skickats!");

}

// Event listener för Submit-knappen
document.getElementById("submit-gifts").addEventListener("click", submitGifts);
*/
document.addEventListener("DOMContentLoaded", loadGifts);
