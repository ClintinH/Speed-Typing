const containerSelect = document.querySelector(".container");
const quoteDisplay = document.querySelector(".quote-display");
const inputData = document.querySelector(".quote-input");
const timerContainer = document.querySelector(".timer");
let myInterval;
let quote;

const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  quote = await getRandomQuote();
  quoteDisplay.innerHTML = "";
  inputData.value = "";

  quote.split("").forEach((char) => {
    let span = document.createElement("span");
    span.innerHTML = char;
    quoteDisplay.append(span);
  });

  clearInterval(myInterval);
  startTimer();
}

renderNewQuote();

// listening to keyboard input
const addKeyListener = function () {
  inputData.addEventListener("input", function (e) {
    const spanData = document.querySelectorAll("span");
    spanData.forEach((span) => {
      span.classList.remove("correct");
      span.classList.remove("incorrect");
    });

    const stringInput = e.target.value;
    stringInput.split("").forEach((char, i) => {
      if (i > spanData.length - 1) return;

      spanData[i].classList.add(
        char === spanData[i].innerText ? "correct" : "incorrect"
      );
    });
    if (quote === stringInput) renderNewQuote();
  });
};

addKeyListener();

const startTimer = function () {
  let time = getTime();
  myInterval = setInterval(function () {
    timerContainer.innerHTML = time--;
    if (time < 0) renderNewQuote();
  }, 1000);
};

const getTime = function () {
  let time = 15;
  const strLenght = quote.length;
  if (strLenght > 50 && strLenght < 75) time = 30;
  if (strLenght > 75) time = 45;

  return time;
};
