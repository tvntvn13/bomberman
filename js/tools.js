import { map } from "./maps.js";
import {
  player,
  rafID,
  pause,
  continueGame,
  time,
  ENEMY_NUM,
  pauseShift,
  resetTime,
  incrementLevel,
  currentLevel
} from "./script.js";
// import { sfx } from "./soundFx.js";
import { allEnemies, bombsPlaced, Enemy } from "./classes.js";
import { drawMap } from "./field.js";
import { update } from "./script.js";

// set startpoint for player
export function setStartpoint() {
  let randNum = Math.floor(Math.random() * 4);
  switch (randNum) {
    case 0:
      return [1, 1];
    case 1:
      return [13, 1];
    case 2:
      return [1, 11];
    case 3:
      return [13, 11];
  }
}

function enemyStartpoint(enemies) {
  if (enemies < 1) return;
  // let sp = []
  // let set = []
  let emptyFields = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      let currBlock = document.getElementById(`block-${j}:${i}`);
      if (
        currBlock.classList.contains("empty-field") &&
        !currBlock.classList.contains("starting-point")
      ) {
        emptyFields.push([j, i]);
      }
    }
  }
  // while (enemies > 0) {
  //   let rY = Math.ceil((Math.random() * (map.length - 4)) + 3);
  //   let rX = Math.ceil((Math.random() * (map[0].length - 4)) + 3);
  //   let currBlock = document.getElementById(`block-${rX}:${rY}`)
  //   if (currBlock.classList.contains("empty-field") && !currBlock.classList.contains("starting-point") && !currBlock.classList.contains("enemy")) {
  //     enemies--
  //     set.push([rX, rY]);
  //   }
  //   // if (map[rX][rY] === undefined || map[rX][rY] === '') {
  //   //   map[rX][rY] = 'E';
  //   //   enemies--
  //   //   sp.push(rY,rX)
  //   //   set.push(sp)
  //   //   sp = [];
  //   // } else {
  //   //   continue
  //   // }
  // }
  return emptyFields;
}

export function createEnemies(num) {
  let startingPoints = enemyStartpoint(num);
  let sampled = [];
  while (sampled.length < num) {
    // randomly shuffle the startingPoints array, and take the first element, then take it out from startingPoints
    startingPoints = startingPoints.sort(() => Math.random() - 0.5);
    sampled.push(startingPoints[0]);
    startingPoints = startingPoints.slice(1);
  }
  for (let elem of sampled) {
    let enemy = new Enemy(elem[0], elem[1]);
  }
  // return enemies
}

export function score(amount) {
  let scoreDiv = document.getElementById("score");
  scoreDiv.textContent = amount.toString().padStart(6, "0");
}

export function timer(time = 200) {
  let timerDiv = document.getElementById("timer");
  timerDiv.textContent = time;
}

export function lives() {
  if (player.lives < 1) {
      gameOver();
  } else if (player.lives === 3) {
    let livesDiv = document.getElementById("lives");
    for (i = 0; i < player.lives; i++) {
      let live = document.createElement("div");
      live.classList.add("livesIcon");
      livesDiv.append(live);
    }
  } else {
    let lastOne = document.querySelectorAll(".livesIcon");
    console.log(lastOne);
    lastOne[lastOne.length - 1].remove();
  }
}

let i = 0;
export function loadingBar() {
  let loadingScreen = document.createElement('div')
  let loadingBar = document.createElement('div')
  let loadingBarFill = document.createElement('div')
  loadingScreen.classList.add('loadingScreen')
  loadingScreen.id='loadingScreen'
  loadingBar.classList.add('loadingBar')
  loadingBar.id='loadingBar'
  loadingBarFill.classList.add('loadingBarFill')
  loadingBarFill.id='loadingBarFill'
  loadingBarFill.textContent='LOADING...'
  loadingBar.append(loadingBarFill)
  loadingScreen.append(loadingBar)
  document.body.prepend(loadingScreen)
  if (i == 0) {
    i = 1;
    let elem = loadingBarFill
    let width = 1;
    let id = setInterval(frame, 30);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = `${width}%`;
      }
    }
  }
  document.body.prepend(loadingScreen)
}

export function gameOver() {
  let gameOverScreen = document.getElementById("gameOverScreen");
  // sfx.timeUpFull.play();
  gameOverScreen.style.display = "block";
  document.getElementById("wrapper").style.display = "none";
  cancelAnimationFrame(rafID);
  document.body.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter" ) window.location.reload();
  });
}


function reloadEvent(e) {
  if (e.key === "Enter") {
    // congrats.style.display = "none";
    document.getElementById("info").querySelector(".congratulations").remove();
    nextLevel();
  }
}
export function winner() {
  let congrats = document.createElement("h1");
  let win = document.createElement("p");
  win.textContent = `you cleared level ${currentLevel}! press ENTER to proceed to level ${currentLevel + 1}`;
  win.classList.add("winP");
  congrats.classList.add("congratulations");
  congrats.textContent = "CONGRATULATIONS";
  congrats.append(win);
  document.getElementById("info").append(congrats);
  cancelAnimationFrame(rafID);
  document.body.addEventListener("keydown", reloadEvent);
}

export function nextLevel() {
  document.body.removeEventListener("keydown", reloadEvent);
  let mainMap = document.getElementById("mainMap");
  mainMap.replaceChildren();
  while (allEnemies.length > 0) {
    allEnemies.pop();
  }
  drawMap();
  resetTime();
  timer(time);
  incrementLevel();
  createEnemies(ENEMY_NUM + currentLevel - 1);
  console.log(bombsPlaced);
  player.respawn();
  pauseShift();
  levelDisplay();
  update();
}

export function startScreen() {
  let startWrap = document.createElement("div");
  startWrap.id = "startWrap";
  startWrap.classList.add("startWrap");
  let startDiv = document.createElement("div");
  // let title = document.createElement('h1');
  let title2 = document.createElement("h1");
  let startButton = document.createElement("button");
  let infoButton = document.createElement("button");
  // title.classList.add("startTitle");
  title2.classList.add("startTitle2");
  infoButton.classList.add("startButton");
  infoButton.id = "infoButton";
  // title.textContent="BOMBMAN JS"
  title2.textContent = "BOMBMAN JS";
  startButton.textContent = "NEW GAME";
  infoButton.textContent = "HELP";
  startButton.classList.add("startButton");
  startDiv.classList.add("startScreen");
  startDiv.append(startButton, infoButton);
  startWrap.append(title2, startDiv);
  document.body.prepend(startWrap);
  infoButton.addEventListener("click", help);
  startButton.addEventListener("click", removeStart);
}

function removeStart() {
  let startScreen = document.getElementById("startWrap");
  //startScreen.style.display="none";
  startScreen.remove();
  continueGame(1);
  //requestAnimationFrame(update)
}

let infoText = `You are the BOMBMAN.

Your objective is to demolish all enemies and locate the exit.

To exterminate the enemies, you must use your bombs.
To find the exit, you must use your bombs.
You have unlimited supply of bombs, but you can only place three bombs at the time.

MOVE:   arrow keys
BOMB:   space
PAUSE:  escape

Now you are ready to bomb.

Good luck!`;

function help() {
  document.getElementById("startWrap").remove();
  let helpWrap = document.createElement("div");
  helpWrap.classList.add("helpWrap");
  helpWrap.id = "helpWrap";
  let helpScreen = document.createElement("div");
  let backButton = document.createElement("button");
  let helpText = document.createElement("p");
  helpText.textContent = infoText;
  helpText.id = "helpText";
  backButton.classList.add("startButton");
  backButton.id = "backButton";
  backButton.textContent = "BACK";
  helpScreen.classList.add("help");
  helpScreen.id = "helpScreen";
  backButton.addEventListener("click", goBack);
  helpScreen.append(helpText, backButton);
  helpWrap.append(helpScreen);
  document.body.prepend(helpWrap);
}

function goBack() {
  document.getElementById("helpWrap").remove();
  startScreen();
}

export function levelDisplay(level=currentLevel){
  let levelDiv = document.createElement('div')
  levelDiv.classList.add('level')
  levelDiv.id = 'level'
  levelDiv.textContent = `LEVEL ${currentLevel}`
  document.getElementById('mainMap').append(levelDiv)
}
