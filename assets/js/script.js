const API_KEY = "rUM6_GZTMrmpTAO13bmWJyPfw0M";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

async function postForm(e) {
    const form = new FormData(document.getElementById("checksform"));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body : form,
    });
    
    const data = await response.json();

    if (response.ok ) {
        displayErros(data);
    }else {
        throw new Error(data.error)
    }
}

function displayErros(data) {

    let heading = `JSHint Results for `

}

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`

    const response = await fetch (queryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data);
    }else{
        throw new Error(data.Error)
    }
}   

function displayStatus(data){
    let heading = "API Key Statys";
    let results = `<div> Your key is valid until </div>`;
    results += `<div class = "key-status"> ${data.expiry}</div>`


    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}