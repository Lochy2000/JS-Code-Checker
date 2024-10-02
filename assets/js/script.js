const API_KEY = "rUM6_GZTMrmpTAO13bmWJyPfw0M";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

function processOption(form){
    
    let optArray = [];

    for (let entry of form.entries()) {
        if  (entry[0] === "options"){
            optArray.push(entry[1]);
        }
    }
    form.delete("options");

    form.append("options", optArray.join());
    return form;
}

async function postForm(e) {
    const form = processOption(new FormData(document.getElementById("checksform")));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body : form,
    });
    
    const data = await response.json();

    if (response.ok ) {
        displayErrors(data);
    }else {
        displayExceptions(data)
        throw new Error(data.error)
    }
}

function displayErrors(data) {
    let heading = `JSHint Results for ${data.file}`;
    let results;

    if (data.total_errors === 0) {
        results = `<div class="no_errors">No Errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.column}</span></div>`;
            results += `<div class="error">${error.error}</div>`; 
        }
    }

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show(); 
}



async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`

    const response = await fetch (queryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data);
    }else{
        displayExceptions(data)
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

function displayExceptions(data) {  
    let heading = `An Exception Occured`;

    let results = `<div> The API returned status code ${data.status_code}</div>`;
    results +=`<div> Error numer: <strong>${data.error_no}</strong> </div>`;
    results += `<div> Error Text: <strong> ${data.error}</strong></div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();

}