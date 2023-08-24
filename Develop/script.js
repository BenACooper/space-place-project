//* Review docs : https://github.com/nasa/apod-api#docs for help

// * This will listen for a submit button click to search APOD using given date
const btnInput = document.getElementById("submit-button");
btnInput.addEventListener("click", getAPOD);

const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("click", toggleMode);

function toggleMode() {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
}

function getAPOD() {
    // TODO: Need to generate API key from nasa website
    // TODO: Create a modal with calendar to select year/date: needs to be string
    //* Format of date needs to be "A string in YYYY-MM-DD -docs"
    var dateInput = document.getElementById('date');
    var dateValue = dateInput.value;



    var APIKey = "KWP7hL5CquZLoMNheN4c7PgY4gcRxdp3w9cddb2S";
    var spaceQuery = "https://api.nasa.gov/planetary/apod?api_key=" + APIKey + "&date=" +dateValue;

    var titleEl = document.querySelector("#apod-title");
    var descriptionEl = document.querySelector("#description");
    const imageEl = document.getElementById("image");

    fetch(spaceQuery)
    .then((response) => response.json())
    .then((data) => {

        titleEl.textContent = data.title;
        descriptionEl.textContent = data.explanation;
        imageEl.src = data.hdurl;

    })
} 

//https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf
//API key RUp9mWS16zvh33le8ZSYs6OVOzQ0F1KrdbgeEa4z
//https://images-api.nasa.gov/search?q={q}