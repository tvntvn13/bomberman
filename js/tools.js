import { map } from "./maps.js";
import { player, rafID } from "./script.js";
import { sfx } from "./soundFx.js";
import { Enemy } from "./classes.js";


// set startpoint for player
export function setStartpoint() {
  let randNum = Math.floor(Math.random() * 4);
  switch (randNum) {
    case 0:
      return [1, 1];
    case 1:
      return [13, 1];
    case 2:
      return [1, 11]
    case 3:
      return [13, 11]
  }
}

function enemyStartpoint(enemies) {
  if (enemies < 1) return
  let sp = []
  let set = []

  while (enemies > 0) {
    let rX = Math.ceil((Math.random() * (map.length - 4)) + 3);
    let rY = Math.ceil((Math.random() * (map[0].length - 4)) + 3);
    if (map[rX][rY] === undefined || map[rX][rY] === '') {
      map[rX][rY] = 'E';
      enemies--
      sp.push(rY,rX)
      set.push(sp)
      sp = [];
    } else {
      continue
    }
  }
  return set
}

export function createEnemies(num) {
  let startingPoints = enemyStartpoint(num);
  let enemies = new Array(num)
  for (let i = 0; i < num; i++) {
    enemies[i] = new Enemy(startingPoints[i][0],startingPoints[i][1])
  }
}

export function score(amount) {
  let scoreDiv = document.getElementById("score");
  scoreDiv.textContent = amount.toString().padStart(6, "0");
}

export function timer(time) {
  let timerDiv = document.getElementById("timer");
  timerDiv.textContent = time;
}

export function lives() {
  if (player.lives < 1) {
    gameOver();
  } else {
    let livesDiv = document.getElementById("lives");
    livesDiv.textContent = "♥ ".repeat(player.lives);
  }
}

let i = 0;
export function loadingBar() {
  if (i == 0) {
    i = 1;
    let elem = document.getElementById("loadingBarFill");
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
}

export function gameOver() {
  let gameOverScreen = document.getElementById("gameOverScreen");
  sfx.timeUpFull.play();
  gameOverScreen.style.display = "block";
  document.getElementById("wrapper").style.display = "none";
  cancelAnimationFrame(rafID);
  document.body.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") window.location.reload();
  });
}

export function winner() {
  let congrats = document.createElement("h1");
  let win = document.createElement("p");
  win.textContent = "you cleared the level!";
  win.classList.add("winP");
  congrats.classList.add("congratulations");
  congrats.textContent = "CONGRATULATIONS!!!";
  congrats.append(win);
  document.getElementById("info").append(congrats);
  cancelAnimationFrame(rafID);
  document.body.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      congrats.style.display = "none";
    }
  });
}
