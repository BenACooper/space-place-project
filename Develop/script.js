// * This loads the modal function on window load
window.onload = function() {
    // * These variables used to manipulate modal and modal content
    var modal = document.getElementById('modal');
    var btn = document.getElementById("openModalBtn");
    var span = document.getElementsByClassName("close")[0];

    // * On modal button click, display style block
    btn.onclick = function() {
        modal.style.display = "block";
    }
    // * On span click, hide the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

//* Review docs : https://github.com/nasa/apod-api#docs for help

// * This will listen for a submit button click to search APOD using given date
//! NASA APOD section

const btnInput = document.getElementById("submit-button");
btnInput.addEventListener("click", getAPOD);

const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("click", toggleMode);

function toggleMode() {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
}

function getAPOD() {
    //* This hides the modal after submit button click event
    document.getElementById('modal').style.display = "none";

    // TODO: Need to generate API key from nasa website
    // TODO: Create a modal with calendar to select year/date: needs to be string
    //* Format of date needs to be "A string in YYYY-MM-DD -docs"
    var dateInput = document.getElementById('date');
    var dateValue = dateInput.value;



  var APIKey = "KWP7hL5CquZLoMNheN4c7PgY4gcRxdp3w9cddb2S";
  var spaceQuery =
    "https://api.nasa.gov/planetary/apod?api_key=" +
    APIKey +
    "&date=" +
    dateValue;

    var titleEl = document.querySelector("#apod-title");
    var descriptionEl = document.querySelector("#description");
    const imageEl = document.getElementById("image");

  fetch(spaceQuery)
    .then((response) => response.json())
    .then((data) => {
        titleEl.textContent = data.title;
      descriptionEl.textContent = data.explanation;
      imageEl.src = data.hdurl;

    });
}


//! NASA Image Library section
//NASA IMAGES LIBRARY API
//API KEY RUp9mWS16zvh33le8ZSYs6OVOzQ0F1KrdbgeEa4z
//Documentation: https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf

var imagesLibraryContainer = document.querySelector(".imagesLibraryContainer");

var celestialArr = ["Horsehead Nebula visible", "Tarantula Nebula Spitzer"];

var galaxyArr = ["M31 Galaxy", "M33 Galaxy"];

var planetMapsArr = ["map of venus", "map of mars"];

var surfacePhotosArr = [
  "surface of pluto",
  "surface of mercury",
  "giant squid",
];

var gameContainerEl = document.querySelector(".gameContainer");
var gameButtonEl = document.querySelector(".gameButton");
gameButtonEl.addEventListener("click", selectKeyword);

//Declare function to select a random keyword from one of the arrays.
function selectKeyword() {
  //Each nested array will display a distinct question format on the quiz.
  var combinedArray = [
    celestialArr,
    galaxyArr,
    planetMapsArr,
    surfacePhotosArr,
  ];

  //Select random nested array.
  var randomSubArrayIndex = Math.floor(Math.random() * combinedArray.length);
  var randomSubArray = combinedArray[randomSubArrayIndex];
  console.log(randomSubArray);


  //Select a random prroperty from the nested array.
  var randomPropertyIndex = Math.floor(Math.random() * randomSubArray.length);
  var randomProperty = randomSubArray[randomPropertyIndex];
  console.log(randomProperty);

  //Pass proprty to searchLibraryAPI function for use as keyword.
  searchLibraryAPI(randomProperty);
  // selectQuestion(randomSubArray);
}


//Declare function that receives randomlly selected keyword to query the image library API and save the response it to localstorage.
function searchLibraryAPI(selectedKeyword) {
  var queryLibraryURL =
    "https://images-api.nasa.gov/search?q=" + selectedKeyword;
  console.log(queryLibraryURL);

  fetch(queryLibraryURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      localStorage.setItem("rawLibraryData", JSON.stringify(data));
      getLibraryData();
    });
}

//Declare a function that retrieves the data from local storage, parses it, target the necessary property(image URL) to store in a variable.
function getLibraryData() {
  var rawLibraryData = localStorage.getItem("rawLibraryData");
  console.log(rawLibraryData);

  if (rawLibraryData) {
    var parsedLibraryData = JSON.parse(rawLibraryData);
    console.log(parsedLibraryData);

    var imageLink = parsedLibraryData.collection.items[0].links[0].href;

    displayLibraryData(imageLink);
  }
}

//Receives the image URL and displays it.
function displayLibraryData(imageLink) {
  var existingImageEl = document.getElementById("libraryImage");

  if (existingImageEl) {
    existingImageEl.parentNode.removeChild(existingImageEl);
  }

  var libraryImageEl = document.createElement("img");
  libraryImageEl.setAttribute("id", "libraryImage");
  libraryImageEl.src = imageLink;
  gameContainerEl.appendChild(libraryImageEl);
}
