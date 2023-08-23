//* Review docs : https://github.com/nasa/apod-api#docs for help

// * This will listen for a submit button click to search APOD using given date
const btnInput = document.getElementById("submit-button");
btnInput.addEventListener("click", getAPOD);

function getAPOD() {
    // TODO: Need to generate API key from nasa website
    // TODO: Create a modal with calendar to select year/date: needs to be string
    //* Format of date needs to be "A string in YYYY-MM-DD -docs"
    
    var APIKey = "KWP7hL5CquZLoMNheN4c7PgY4gcRxdp3w9cddb2S";
    var dateEl = document.getElementById('date').value;
    var spaceQuery = "https://api.nasa.gov/planetary/apod?api_key=" + APIKey + "&date=" + dateEl;

    var description = document.querySelector("#descruption");
    var apodImage = document.querySelector("#image");
    
    fetch(spaceQuery)
    .then((response) => response.json())
    .then((data) => {

        description.textContent = data.explination;
        apodImage.textContent = data.url;
    })
} 



//NASA IMAGES LIBRARY API
//API KEY RUp9mWS16zvh33le8ZSYs6OVOzQ0F1KrdbgeEa4z
//Documentation: https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf
