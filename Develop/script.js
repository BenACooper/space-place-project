// * This loads the modal function on window load
window.onload = function () {
  // * These variables used to manipulate modal and modal content
  var modal = document.getElementById("modal");
  var btn = document.getElementById("openModalBtn");
  var span = document.getElementsByClassName("close")[0];

  // * On modal button click, display style block
  btn.onclick = function () {
    modal.style.display = "block";
  };
  // * On span click, hide the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

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
  document.getElementById("modal").style.display = "none";

  // TODO: Need to generate API key from nasa website
  // TODO: Create a modal with calendar to select year/date: needs to be string
  //* Format of date needs to be "A string in YYYY-MM-DD -docs"
  var dateInput = document.getElementById("date");
  var dateValue = dateInput.value;

  var APIKey = "KWP7hL5CquZLoMNheN4c7PgY4gcRxdp3w9cddb2S";
  var spaceQuery =
    "https://api.nasa.gov/planetary/apod?api_key=" +
    APIKey +
    "&date=" +
    dateValue;

  var titleEl = document.querySelector("#apod-title");
  var descriptionEl = document.querySelector("#description");
  const imageEl = document.getElementById("apodImage");

  fetch(spaceQuery)
    .then((response) => response.json())
    .then((data) => {
      titleEl.textContent = data.title;
      descriptionEl.textContent = data.explanation;
      imageEl.src = data.hdurl;

      saveToLocalStorage(dateValue, data.title);
      displayHistory(); // Display history after saving the new entry
    });
}

function saveToLocalStorage(date, title) {
  const history = JSON.parse(localStorage.getItem("apodHistory")) || [];

  if (history.length >= 5) {
    history.shift();
  }

  history.push({ date, title });
  localStorage.setItem("apodHistory", JSON.stringify(history));
}

function displayHistory() {
  const history = JSON.parse(localStorage.getItem("apodHistory")) || [];
  const historyContainer = document.getElementById("history-container");
  historyContainer.innerHTML = "";

  const startIdx = Math.max(0, history.length - 5);
  const recentHistory = history.slice(startIdx);

  recentHistory.forEach((entry) => {
    const historyItem = document.createElement("div");
    historyItem.classList.add("history-item");

    const dateEl = document.createElement("p");
    dateEl.textContent = `Date: ${entry.date}`;
    dateEl.classList.add("history-date");

    const titleEl = document.createElement("p");
    titleEl.textContent = `Title: ${entry.title}`;

    historyItem.appendChild(dateEl);
    historyItem.appendChild(titleEl);

    historyItem.addEventListener("click", () => {
      fetchImageForHistoryEntry(entry.date);
    });

    historyContainer.appendChild(historyItem);
  });
}
function fetchImageForHistoryEntry(date) {
  var APIKey = "KWP7hL5CquZLoMNheN4c7PgY4gcRxdp3w9cddb2S";
  var spaceQuery =
    "https://api.nasa.gov/planetary/apod?api_key=" + APIKey + "&date=" + date;

  var titleEl = document.querySelector("#apod-title");
  var descriptionEl = document.querySelector("#description");
  const imageEl = document.getElementById("apodImage");

  fetch(spaceQuery)
    .then((response) => response.json())
    .then((data) => {
      titleEl.textContent = data.title;
      descriptionEl.textContent = data.explanation;
      imageEl.src = data.hdurl;
    });
}

//! Light & Darkmode Toggle
document.getElementById("mode-toggle").addEventListener("click", function () {
  var icon = document.getElementById("mode-toggle");
  if (icon.classList.contains("fa-moon")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});

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
var playAgainButtonEl = document.querySelector(".playAgain")
var previousKeyword = "";

gameButtonEl.addEventListener("click", selectKeyword);

//Declare function to select a random keyword from one of the arrays.
function selectKeyword() {
  playAgainButtonEl.classList.add("hidden"); 
  var selectedKeyword = "";
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
  console.log("SubArray: " + randomSubArray);

  //Select a random prroperty from the nested array.
  var randomPropertyIndex = Math.floor(Math.random() * randomSubArray.length);
  selectedKeyword = randomSubArray[randomPropertyIndex];
  console.log("Keyword: " + selectedKeyword);

  gameButtonEl.classList.add("hidden");
  gameImageContainerEl.classList.remove("hidden");  

  //Pass proprty to searchLibraryAPI function for use as keyword.
  searchLibraryAPI(selectedKeyword);
  selectGameWord(selectedKeyword);
  selectQuestion(randomSubArray);
}

//Declare function that receives randomlly selected keyword to query the image library API and save the response it to localstorage.
function searchLibraryAPI(selectedKeyword) {
  var queryLibraryURL =
    "https://images-api.nasa.gov/search?q=" + selectedKeyword;
  // console.log(queryLibraryURL);

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
  // console.log(rawLibraryData);

  if (rawLibraryData) {
    var parsedLibraryData = JSON.parse(rawLibraryData);
    // console.log(parsedLibraryData);

    var imageLink = parsedLibraryData.collection.items[0].links[0].href;
    console.log(imageLink);
    displayLibraryData(imageLink);
  }
}

//Receives the image URL and displays it.
var gameImageContainerEl = document.querySelector(".gameImageContainer");

function displayLibraryData(imageLink) {
  var gameImageEl = document.createElement("img");
  gameImageEl.src = imageLink;
  gameImageEl.setAttribute("id", "gameImage")

  while (gameImageContainerEl.firstChild) {
    gameImageContainerEl.removeChild(gameImageContainerEl.firstChild);
  }


  gameImageEl.style.maxHeight = "590px";  
  gameImageEl.style.maxWidth = "100%";
  gameImageContainerEl.appendChild(gameImageEl);
}

//! Hangman Game
var wordContainer = document.querySelector(".wordContainer");
var questionContainer = document.querySelector(".questionContainer");
var lettersInChosenWord = [];
var blanksLetters = [];
var numBlanks = 0;
var gameWord = "";

//Declare function to select a question to display for hangman game. This function is called by the selectKeyword function.
function selectQuestion(randomSubArray) {
  var question = "";

  if (randomSubArray === celestialArr) {
    question =
      "This nebulae is named after an animal it resembles. Which animal do you think it looks like?";
  }

  if (randomSubArray === galaxyArr) {
    question =
      "This galaxy is from our local group. Which galaxy do you think this is?";
  }

  if (randomSubArray === planetMapsArr) {
    question =
      "This is a world map of another planet in our solar system. Which planet is it?";
  }

  if (randomSubArray === surfacePhotosArr) {
    question =
      "This is a 'close-up' photo of another planet's surface. Which planet is it?";
  }

  console.log(question);
  displayQuestion(question);
}

//Declare a function to select a gameWord that's more friendly to the game than the actual keyWord.
function selectGameWord(selectedKeyword) {
  gameWord = "";

  if (selectedKeyword === "Horsehead Nebula visible") {
    gameWord = "Horse";
  } else if (selectedKeyword === "Tarantula Nebula Spitzer") {
    gameWord = "Tarantula";
  } else if (selectedKeyword === "M31 Galaxy") {
    gameWord = "Andromeda";
  } else if (selectedKeyword === "M33 Galaxy") {
    gameWord = "Triangulum";
  } else if (selectedKeyword === "map of venus") {
    gameWord = "Venus";
  } else if (selectedKeyword === "map of mars") {
    gameWord = "Mars";
  } else if (selectedKeyword === "surface of pluto") {
    gameWord = "Pluto";
  } else if (selectedKeyword === "surface of mercury") {
    gameWord = "Mercury";
  } else if (selectedKeyword === "giant squid") {
    gameWord = "Earth";
  }
  console.log("Game Word: " + gameWord);
  generateGameBlanks(gameWord);
}

//Declare function to create 'blank spaces' for the user to fill in with the keyword.
function generateGameBlanks(gameWord) {
  lettersInGameword = gameWord.split("");
  numBlanks = lettersInGameword.length;
  blanksLetters = [];

  for (var i = 0; i < numBlanks; i++) {
    blanksLetters.push("_");
  }
  console.log("Hangman blanks: " + blanksLetters);
  wordContainer.textContent = blanksLetters.join(" ");
}

//Declare a function to listen for keydowns
document.addEventListener("keydown", function (event) {
  var key = event.key.toLowerCase();
  var alphabetCharacters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVQXYZ".split("");
  if (alphabetCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed);
    checkWin()
  }
});

function checkLetters(letter) {
  var letterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (gameWord[i] === letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (gameWord[j] === letter) {
        blanksLetters[j] = letter;
      }
    }
    wordContainer.textContent = blanksLetters.join(" ");
  }  
}

function displayQuestion(question) {
  questionContainer.textContent = question;
}

function checkWin() {
  if (gameWord === blanksLetters.join("")) {
    playAgainButtonEl.classList.remove("hidden");  
    gameImageContainerEl.classList.add("hidden");
  }
}

playAgainButtonEl.addEventListener("click", selectKeyword);