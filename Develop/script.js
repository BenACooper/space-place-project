// This loads the modal function on window load
window.onload = function () {
  var modal = document.getElementById("modal");
  var btn = document.getElementById("openModalBtn");
  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
  };
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

// Review docs: https://github.com/nasa/apod-api#docs for help

const btnInput = document.getElementById("submit-button");
btnInput.addEventListener("click", getAPOD);

const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("click", toggleMode);

function toggleMode() {
  document.body.classList.toggle("light-mode");
  document.body.classList.toggle("dark-mode");
}

function getAPOD() {
  document.getElementById("modal").style.display = "none";

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
  const imageEl = document.getElementById("image");

  fetch(spaceQuery)
    .then((response) => response.json())
    .then((data) => {
      titleEl.textContent = data.title;
      descriptionEl.textContent = data.explanation;
      imageEl.src = data.hdurl;

      saveToLocalStorage(dateValue, data.title);
      displayHistory();
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

    const titleEl = document.createElement("p");
    titleEl.textContent = `Title: ${entry.title}`;

    historyItem.appendChild(dateEl);
    historyItem.appendChild(titleEl);

    historyContainer.appendChild(historyItem);
  });
}

// NASA images library section
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

function selectKeyword() {
  var combinedArray = [
    celestialArr,
    galaxyArr,
    planetMapsArr,
    surfacePhotosArr,
  ];

  var randomSubArrayIndex = Math.floor(Math.random() * combinedArray.length);
  var randomSubArray = combinedArray[randomSubArrayIndex];

  var randomPropertyIndex = Math.floor(Math.random() * randomSubArray.length);
  var randomProperty = randomSubArray[randomPropertyIndex];

  searchLibraryAPI(randomProperty);
}

function searchLibraryAPI(selectedKeyword) {
  var queryLibraryURL =
    "https://images-api.nasa.gov/search?q=" + selectedKeyword;

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

function getLibraryData() {
  var rawLibraryData = localStorage.getItem("rawLibraryData");

  if (rawLibraryData) {
    var parsedLibraryData = JSON.parse(rawLibraryData);

    var imageLink = parsedLibraryData.collection.items[0].links[0].href;

    displayLibraryData(imageLink);
  }
}

var gameImageContainerEl = document.querySelector(".gameImageContainer");

function displayLibraryData(imageLink) {
  var existingImageEl = document.getElementById("gameImage");

  if (existingImageEl) {
    existingImageEl.parentNode.removeChild(existingImageEl);
  }

  var gameImageEl = document.createElement("img");
  gameImageEl.setAttribute("id", "gameImage");
  gameImageEl.src = imageLink;
  gameImageContainerEl.appendChild(gameImageEl);
}
