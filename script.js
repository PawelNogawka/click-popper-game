const playArea = {};
const player = {};

let gameObj = {
  data: [
    {
      icon: "\u0026#8902;",
      value: 10,
    },
    {
      icon: "\u0026#10031;",
      value: 30,
    },
    {
      icon: "\u0026#10036;",
      value: 50,
    },
    {
      icon: "\u0026#10042;",
      value: 70,
    },
    {
      icon: "\u0026#10084;",
      value: 75,
    },
    {
      icon: "\u0026#9813;",
      value: 50,
    },
    {
      icon: "\u0026#9822;",
      value: 60,
    },
    {
      icon: "\u0026#9924;",
      value: 40,
    },
    {
      icon: "\u0026#9971;",
      value: 100,
    },
    {
      icon: "\u0026#9729;",
      value: -50,
    },
    {
      icon: "\u0026#9785;",
      value: -100,
    },
    {
      icon: "\u0026#9760;",
      value: -250,
    },
    {
      icon: "\u0026#9791;",
      value: -20,
    },
  ],
};
playArea.stats = document.querySelector(".stats");
playArea.main = document.querySelector(".main");
playArea.game = document.querySelector(".game");
playArea.btn = document.querySelector(".btn");
playArea.page = Array.from(document.querySelectorAll(".page"));

playArea.btn.addEventListener("click", startGame);

function startGame(e) {
  player.gameOver = false;
  e.target.style.display = "none";
  buildBoard();
  player.score = 0;
  player.lives = 3;
  updateScore();
  showActiveSquare();
}

function showActiveSquare() {
  let square = getRandomSquare();
  square.old = square.innerHTML;

  square.classList.add("active");
  let time = Math.round(Math.random() * 1500 + 750);
  let ran = Math.floor(Math.random() * gameObj.data.length);

  square.points = gameObj.data[ran].value;
  square.icon = gameObj.data[ran].icon;

  square.innerHTML = `${square.points} <br> ${square.icon}`;

  square.addEventListener("click", hitSquare);
  player.interval = setTimeout(function () {
    square.classList.remove("active");
    square.innerHTML = square.old;
    square.removeEventListener("click", hitSquare);
    if (!player.gameOver) {
      showActiveSquare();
    }
    checkLives(square);
  }, time);
}

function checkLives(el) {
  if (el.points > 0) {
    player.lives--;
    updateScore();
  }
  if (player.lives == 0) {
    return gameOver();
  }
}

function gameOver() {
  clearInterval(player.interval);
  player.gameOver = true;
  playArea.game.innerHTML = "";
  playArea.btn.style.display = "block";
  setTimeout(function () {
    playArea.stats.innerHTML = "Press the start btn to try again!";
  }, 2000);
}

function hitSquare(e) {
  let activeEl = e.target;
  activeEl.removeEventListener("click", hitSquare);
  clearInterval(player.interval);
  player.score += activeEl.points;
  updateScore();
  activeEl.classList.remove("active");
  activeEl.innerHTML = activeEl.old;
  showActiveSquare();
}

function getRandomSquare() {
  const squares = document.querySelectorAll(".box");

  let ranInd = Math.floor(Math.random() * squares.length);

  if (player.last == squares[ranInd]) {
    return getRandomSquare();
  }

  player.last = squares[ranInd];
  return squares[ranInd];
}

function buildBoard() {
  let cols = 4;
  let rows = 4;
  let value = 0;

  for (let y = 0; y < rows; y++) {
    let row = document.createElement("div");
    row.style.width = cols * 100;
    for (let x = 0; x < cols; x++) {
      value++;
      let square = document.createElement("div");
      square.classList.add("box");
      square.value = value;
      square.innerHTML = value;
      row.appendChild(square);
    }
    playArea.game.appendChild(row);
  }
}
function updateScore() {
  playArea.stats.innerHTML = `Score:${player.score} Lives: ${player.lives}`;
}
