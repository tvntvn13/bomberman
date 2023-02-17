import { drawMap } from "./field.js";
// import { sfx } from "./soundFx.js";
import {
  setStartpoint,
  loadingBar,
  score,
  timer,
  lives,
  gameOver,
  winner,
  createEnemies,
  startScreen,
  levelDisplay
} from "./tools.js";
import { Enemy, Player, allEnemies } from "./classes.js";

export let currentLevel = 1;
export function incrementLevel() {
  currentLevel++;
}
export let pause = true;

export function pauseShift() {
  if (pause) {
    pause = false;
  } else {
    pause = true;
  }
}
startScreen();
export const ENEMY_NUM = 4;
let startTime;
let startTime2;
let startTime3;
let sp = setStartpoint();
let keyPressed = null;
export let time = 200;

export function resetTime() {
  time = 200;
}

let aliveEnemies;
export let rafID = requestAnimationFrame(update);

// comment out this part to get rid of the loading bar !!!
// loadingBar();
// setTimeout(() => {
//this part needs to stay.
// document.getElementById("loadingScreen").remove();
// },3200);

// ^^^ loading bar shit above ^^^

timer(time);
drawMap();
// sfx.stageIntro.play();
export let player = new Player(sp[0], sp[1]);
lives();
levelDisplay()
createEnemies(ENEMY_NUM);

// let enemy2 = new Enemy(8, 5);
// let enemy2 = new Enemy(8, 5);
// let enemyStartPoint = document.getElementById(`block-${enemy.x}:${enemy.y}`);
// enemyStartPoint.classList.add('enemy');
let startPoint = document.getElementById(`block-${player.x}:${player.y}`);
startPoint.classList.add("player");
let pauseScreen = document.getElementById("pauseScreen");
score(player.getScore);
update();
//requestAnimationFrame(update)

document.body.addEventListener("keyup", (e) => {
  if (e.key !== " ") keyPressed = null;
});

document.body.addEventListener("keydown", (e) => {
  if (keyPressed === null) {
    switch (e.key) {
      case "ArrowUp":
        keyPressed = "up";
        break;
      case "ArrowLeft":
        keyPressed = "left";
        break;
      case "ArrowRight":
        keyPressed = "right";
        break;
      case "ArrowDown":
        keyPressed = "down";
        break;
      case "Escape":
        if(!pause)
        togglePause();
        break;
    }
  }
});


export function update(timestamp) {
  let playerPosition = document.getElementById(`block-${player.x}:${player.y}`);  
  if (
    !player.invincible &&
    (playerPosition.classList.contains("enemy") ||
      playerPosition.classList.contains("explosion"))
  ) {
    // sfx.playerDies.play();
    player.death();
    lives(1);
  }
  aliveEnemies = 0;
  for (let enemy of allEnemies) {
    if (enemy.alive) {
      aliveEnemies++;
      let enemyPosition = document.getElementById(
        `block-${enemy.x}:${enemy.y}`
      );

      if (enemyPosition.classList.contains("explosion")) {
        // player.score += 100;
        player.addScore(100);
        score(player.getScore);
        enemy.death();
      }
    }
  }
  
  if (playerPosition.classList.contains("goal") && aliveEnemies === 0 ) {
    pause = true;
    // player.score += Math.floor((time * 100) / 60);
    // score(player.getScore);
    // sfx.stageClear.play();
    playerPosition.classList.add("winner")
    winner();
    return;
  }

  if (startTime === undefined) {
    startTime = timestamp;
  }
  const elapsed = timestamp - startTime;
  if (elapsed > 500) {
    startTime = timestamp;
    for (let enemy of allEnemies) {
      enemy.move();
    }
  }

  if (startTime2 === undefined) {
    startTime2 = timestamp;
  }
  if (timestamp - startTime2 > 100) {
    startTime2 = timestamp;
    if (keyPressed) {
      // sfx.walking2.play();
      player.movement(keyPressed);
      // sfx.walking.play();
    }
  }
  if (startTime3 === undefined) {
    startTime3 = timestamp;
  }
  if (timestamp - startTime3 > 1100) {
    startTime3 = timestamp;
    if (time === 0) {
      
      // sfx.timeUpFull.play();
      gameOver();
      pause=true
    }
    timer(time--);
  }

  if (!pause) {
    requestAnimationFrame(update);
  } else {
    return;
  }
}

document.addEventListener("keypress", (e) => {
  if (e.key === " " && !pause) {
    // sfx.placeBomb.play();
    player.placeBomb();
  }
});

function restart() {
  window.location.reload();
}

export function continueGame() {
  if (status == 0) {
    let pauseDiv = document.getElementById("pauseScreen");
    document.body.removeChild(pauseDiv);
  }
  pause = false;
  requestAnimationFrame(update);
}

let status = 1;

function togglePause() {
  status = 1;
  let pauseDiv = document.createElement("div");
  pauseDiv.className = "pauseScreen";
  pauseDiv.id = "pauseScreen";
  let text = document.createElement("h1");
  text.innerHTML = "GAME PAUSED";
  pauseDiv.append(text);
  let continueButton = document.createElement("button");
  // continueButton.onclick = function(){continueGame};
  continueButton.className = "pauseButton";
  continueButton.id = "continueButton";
  continueButton.innerHTML = "CONTINUE";
  continueButton.addEventListener("click", () => {
    status = 0;
    continueGame();
  });
  pauseDiv.style.display = "block";
  pauseDiv.append(continueButton);
  let restartButton = document.createElement("button");
  restartButton.className = "pauseButton";
  restartButton.id = "restartButton";
  restartButton.innerHTML = "RESTART";
  restartButton.addEventListener("click", restart);
  pauseDiv.append(restartButton);
  document.body.prepend(pauseDiv);
  // cancelAnimationFrame(rafID);
  // if (pause) {
  //   pause = false;
  // } else {
  //   pause = true;
  // }
  pause = true;
  // let cont = document.getElementById("continueButton");

  // requestAnimationFrame(update);
}
