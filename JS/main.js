// 사용변수
const GAME_TIME = 9;
let score = 0;
let time = GAME_TIME;
let isPalying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector('.word-input');
const worldDisplay = document.querySelector('.world-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');


init()

function init() {
  buttonChange("게임 로딩중 . . . . .");
  getWords();
  wordInput.addEventListener('input', checkMatch);
}

// 게임 실행
function run() {
  if (isPalying) {
    return;
  }
  isPalying = true;
  time = GAME_TIME;
  wordInput.focus();
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange("게임중 . . .");
}


// 단어불러오기
function getWords() {
  axios.get('https://random-word-api.herokuapp.com/word?number=100')
    .then(function (response) {
      response.data.forEach((word) => {
        if (word.length < 10) {
          words.push(word);
        };
      });
      buttonChange("게임시작");
    })
    .catch(function (error) {
      console.log(error);
    });
}

wordInput.addEventListener('input', checkMatch);

// 단어 일치 체크
function checkMatch() {
  if (wordInput.value.toLowerCase() === worldDisplay.innerText.toLowerCase()) {
    wordInput.value = "";
    if (!isPalying) {
      return;
    }
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random() * words.length);
    worldDisplay.innerText = words[randomIndex];
  }
}


function checkStatus() {
  if (!isPalying && time === 0) {
    buttonChange("게임시작");
    clearInterval(checkInterval)
  }
}


// setInterval(countDown, 1000);

// buttonChange("게임시작");



function countDown() {
  time > 0 ? time-- : isPalying = false;
  if (!isPalying) {
    clearInterval(timeInterval);
  }
  timeDisplay.innerText = time;
}

function buttonChange(text) {
  button.innerText = text;
  text === "게임시작" ? button.classList.remove("loading") : button.classList.add("loading");
}

