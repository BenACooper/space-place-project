//* Review docs : https://github.com/nasa/apod-api#docs for help

// * This will listen for a submit button click to search APOD using given date
const btnInput = document.getElementById("submit-button");
btnInput.addEventListener("click", getAPOD);

function getAPOD() {
    // TODO: Need to generate API key from nasa website
    // TODO: Create a modal with calendar to select year/date: needs to be string
    //* Format of date needs to be "A string in YYYY-MM-DD -docs"
    var dateInput = document.getElementById('date');
    var dateValue = dateInput.value;



    var APIKey = "KWP7hL5CquZLoMNheN4c7PgY4gcRxdp3w9cddb2S";
    var spaceQuery = "https://api.nasa.gov/planetary/apod?api_key=" + APIKey + "&date=" +dateValue;

    var description = document.querySelector("#description");
    const imageElement = document.getElementById('image');

    fetch(spaceQuery)
    .then((response) => response.json())
    .then((data) => {

        description.textContent = data.explanation;
        imageElement.src = data.hdurl;

    })
} 



