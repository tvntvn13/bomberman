import { Player, allEnemies, bombsPlaced } from './classes.js';
import { drawMap } from './field.js';
import {
  createEnemies,
  gameOver,
  levelDisplay,
  lives,
  nextLevel,
  score,
  setStartpoint,
  startScreen,
  timer,
  winner,
} from './tools.js';

// currentLevel keeps track of the level the player is on
export let currentLevel = 1;
// we need the incrementLevel to increment the currentLevel from outside
export function incrementLevel() {
  currentLevel++;
}

// if pause is true, the update function doesn't call the next animationFrame
export let pause = true;

// pauseShift is needed to toggle the pause from outside
export function pauseShift() {
  if (pause) {
    pause = false;
  } else {
    pause = true;
  }
}
startScreen();

// the starting enemy number
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

timer(time);
drawMap();
export let player = new Player(sp[0], sp[1]);
lives();
levelDisplay();
createEnemies(ENEMY_NUM);

let startPoint = document.getElementById(`block-${player.x}:${player.y}`);
startPoint.classList.add('player');
score(player.getScore);
update();

document.body.addEventListener('keyup', (e) => {
  if (e.key !== ' ') keyPressed = null;
});

document.body.addEventListener('keydown', (e) => {
  if (keyPressed === null) {
    switch (e.key) {
      case 'ArrowUp':
        keyPressed = 'up';
        break;
      case 'ArrowLeft':
        keyPressed = 'left';
        break;
      case 'ArrowRight':
        keyPressed = 'right';
        break;
      case 'ArrowDown':
        keyPressed = 'down';
        break;
      case 'e':
        pause = true;
        winner();
        break;
      case 'w':
        pause = true;
        nextLevel();
        break;
      case 'Escape':
        if (!pause) togglePause();
        break;
    }
  }
});

// update is one of the main functions that runs the game,
// it keeps track of explosions, player lives, the game over screen, etc.
// when pause or game over is toggled, it doesn't call the next animationFrame
export function update(timestamp) {
  let playerPosition = document.getElementById(`block-${player.x}:${player.y}`);
  if (
    !player.invincible &&
    (playerPosition.classList.contains('enemy') || playerPosition.classList.contains('explosion'))
  ) {
    if (player.lives > 1) {
      player.death();
      lives();
    } else {
      player.death();
      pause = true;
      gameOver();
    }
  }
  aliveEnemies = 0;
  for (let enemy of allEnemies) {
    if (enemy.alive) {
      aliveEnemies++;
      let enemyPosition = document.getElementById(`block-${enemy.x}:${enemy.y}`);

      if (enemyPosition.classList.contains('explosion')) {
        player.addScore(100);
        score(player.getScore);
        enemy.death();
      }
    }
  }

  if (playerPosition.classList.contains('goal') && aliveEnemies === 0) {
    pause = true;
    for (let elem of Object.values(bombsPlaced)) {
      clearTimeout(elem.timerId);
    }
    player.score += Math.floor((time * 100) / 60);
    score(player.getScore);
    playerPosition.classList.add('winner');
    winner();
    player.clearAllBombs();
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
      player.movement(keyPressed);
    }
  }
  if (startTime3 === undefined) {
    startTime3 = timestamp;
  }
  if (timestamp - startTime3 > 1100) {
    startTime3 = timestamp;
    if (time === 0) {
      pause = true;
      gameOver();
    }
    timer(time--);
  }

  if (!pause) {
    requestAnimationFrame(update);
  } else {
    return;
  }
}

document.addEventListener('keypress', (e) => {
  if (e.key === ' ' && !pause) {
    player.placeBomb();
  }
});

function restart() {
  window.location.reload();
}

// continueGame removes the pauseScreen, resets the bomb timers, and calls the next animationFrame
export function continueGame() {
  if (status == 0) {
    let pauseDiv = document.getElementById('pauseScreen');
    document.body.removeChild(pauseDiv);
  }
  pause = false;
  for (let elem of Object.values(bombsPlaced)) {
    elem.placementTime = new Date().getTime();
    elem.timerId = elem.explodeOnTimer(elem.timer);
  }
  requestAnimationFrame(update);
}

let status = 1;

// togglePause cancels bomb timers, saves the remaining time as the Bomb objects' property,
// and brings up a pauseScreen
function togglePause() {
  let pauseTime = new Date().getTime();
  for (let elem of Object.values(bombsPlaced)) {
    let timePassed = pauseTime - elem.placementTime;
    clearTimeout(elem.timerId);
    elem.timer = elem.timer - timePassed;
  }
  status = 1;
  let pauseDiv = document.createElement('div');
  pauseDiv.className = 'pauseScreen';
  pauseDiv.id = 'pauseScreen';
  let text = document.createElement('h1');
  text.innerHTML = 'GAME PAUSED';
  pauseDiv.append(text);
  let continueButton = document.createElement('button');
  continueButton.className = 'pauseButton';
  continueButton.id = 'continueButton';
  continueButton.innerHTML = '<< CONTINUE';
  continueButton.addEventListener('click', () => {
    status = 0;
    continueGame();
  });
  pauseDiv.style.display = 'block';
  pauseDiv.append(continueButton);
  let restartButton = document.createElement('button');
  restartButton.className = 'pauseButton';
  restartButton.id = 'restartButton';
  restartButton.innerHTML = 'RESTART >>';
  restartButton.addEventListener('click', restart);
  pauseDiv.append(restartButton);
  document.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowRight') {
      restartButton.focus();
      e.preventDefault();
    } else if (e.key == 'ArrowLeft') {
      continueButton.focus();
      e.preventDefault();
    }
  });
  document.body.prepend(pauseDiv);
  pause = true;
}
