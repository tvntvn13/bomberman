import { Enemy, allEnemies } from './classes.js';
import { drawMap } from './field.js';
import { map, mapEngine } from './maps.js';
import {
  ENEMY_NUM,
  continueGame,
  currentLevel,
  incrementLevel,
  pauseShift,
  player,
  rafID,
  resetTime,
  time,
  update,
} from './script.js';

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
  let emptyFields = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      let currBlock = document.getElementById(`block-${j}:${i}`);
      if (currBlock.classList.contains('empty-field') && !currBlock.classList.contains('starting-point')) {
        emptyFields.push([j, i]);
      }
    }
  }
  return emptyFields;
}

export function createEnemies(num) {
  let startingPoints = enemyStartpoint(num);
  let sampled = [];
  while (sampled.length < num) {
    // randomly shuffle the startingPoints array,
    // take the first element, then take it out from startingPoints
    startingPoints = startingPoints.sort(() => Math.random() - 0.5);
    sampled.push(startingPoints[0]);
    startingPoints = startingPoints.slice(1);
  }
  for (let elem of sampled) {
    // it is actually being used
    // eslint-disable-next-line no-unused-vars
    const enemy = new Enemy(elem[0], elem[1]); // NOSONAR
  }
}

export function score(amount) {
  let scoreDiv = document.getElementById('score');
  scoreDiv.textContent = amount.toString().padStart(6, '0');
}

export function timer(time = 200) {
  let timerDiv = document.getElementById('timer');
  timerDiv.textContent = time;
}

export function lives() {
  if (player.lives < 1) {
    cancelAnimationFrame(rafID);
    gameOver();
  } else if (player.lives === 3) {
    let livesDiv = document.getElementById('lives');
    for (i = 0; i < player.lives; i++) {
      let live = document.createElement('div');
      live.classList.add('livesIcon');
      livesDiv.append(live);
    }
  } else {
    let lastOne = document.querySelectorAll('.livesIcon');
    console.log(lastOne);
    lastOne[lastOne.length - 1].remove();
  }
}

let i = 0;
export function loadingBar() {
  let loadingScreen = document.createElement('div');
  let loadingBar = document.createElement('div');
  let loadingBarFill = document.createElement('div');

  loadingScreen.classList.add('loadingScreen');
  loadingScreen.id = 'loadingScreen';
  loadingBar.classList.add('loadingBar');
  loadingBar.id = 'loadingBar';
  loadingBarFill.classList.add('loadingBarFill');
  loadingBarFill.id = 'loadingBarFill';
  loadingBarFill.textContent = 'LOADING...';

  loadingBar.append(loadingBarFill);
  loadingScreen.append(loadingBar);
  document.body.prepend(loadingScreen);
  if (i == 0) {
    i = 1;
    let elem = loadingBarFill;
    let width = 1;
    const frame = () => {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = `${width}%`;
      }
    };
    let id = setInterval(frame, 30);
  }
  document.body.prepend(loadingScreen);
}

// when the player loses all lives, gameOver is called, which brings up the gameOver screen
export function gameOver() {
  cancelAnimationFrame(rafID);
  setTimeout(() => {
    let gameOverScreen = document.getElementById('gameOverScreen');
    let gameOverH1 = document.getElementById('gameOverScreenH1');
    let scoreDisplay = document.createElement('p');

    scoreDisplay.textContent = player.score.toString().padStart(6, '0');
    scoreDisplay.classList.add('winP');
    gameOverH1.append(scoreDisplay);
    gameOverScreen.style.display = 'block';

    document.getElementById('wrapper').style.display = 'none';
    cancelAnimationFrame(rafID);

    document.body.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') window.location.reload();
    });
  }, 900);
}

export function reloadEvent(e) {
  if (e.key == 'Enter') {
    document.getElementById('info').querySelector('.congratulations').remove();
    nextLevel();
  }
}
export function winner() {
  if (currentLevel < 10) {
    let congrats = document.createElement('h1');
    let win = document.createElement('p');

    win.textContent = `you cleared level ${currentLevel}! press ENTER to move to level ${currentLevel + 1}`;
    win.classList.add('winP');

    congrats.classList.add('congratulations');
    congrats.textContent = 'CONGRATULATIONS';
    congrats.append(win);

    document.getElementById('info').append(congrats);
    cancelAnimationFrame(rafID);
    document.body.addEventListener('keydown', reloadEvent);
  } else {
    gameEnd();
  }
}

// nextLevel is called when a level is finished, it reloads the map, enemies, resets the timer,
// but keeps the Player object intact
export function nextLevel() {
  document.body.removeEventListener('keydown', reloadEvent);
  let mainMap = document.getElementById('mainMap');
  mainMap.replaceChildren();

  while (allEnemies.length > 0) {
    allEnemies.pop();
  }
  mapEngine();
  drawMap();
  resetTime();
  timer(time);
  incrementLevel();
  createEnemies(ENEMY_NUM + currentLevel - 1);
  player.respawn();
  pauseShift();
  levelDisplay();
  update();
}

// startScreen creates the first screen the player sees
export function startScreen() {
  let startWrap = document.createElement('div');
  startWrap.id = 'startWrap';
  startWrap.classList.add('startWrap');

  let startDiv = document.createElement('div');
  let title2 = document.createElement('h1');
  let startButton = document.createElement('button');
  let infoButton = document.createElement('button');

  title2.classList.add('startTitle2');
  infoButton.classList.add('startButton');
  infoButton.id = 'infoButton';

  title2.textContent = 'BOMBMAN JS';
  startButton.textContent = 'NEW GAME';
  infoButton.textContent = 'HELP';

  startButton.classList.add('startButton');
  startDiv.classList.add('startScreen');
  startDiv.append(startButton, infoButton);
  startWrap.append(title2, startDiv);

  document.body.prepend(startWrap);
  document.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowDown' || e.key == 'ArrowLeft') {
      infoButton.focus();
      e.preventDefault();
    } else if (e.key == 'ArrowUp' || e.key == 'ArrowRight') {
      startButton.focus();
      e.preventDefault();
    }
  });
  infoButton.addEventListener('click', help);
  startButton.addEventListener('click', removeStart);
}

// removeStart removes the startScreen
function removeStart() {
  let startScreen = document.getElementById('startWrap');
  startScreen.remove();
  continueGame(1);
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
  document.getElementById('startWrap').remove();
  let helpWrap = document.createElement('div');
  helpWrap.classList.add('helpWrap');
  helpWrap.id = 'helpWrap';

  let helpScreen = document.createElement('div');
  let backButton = document.createElement('button');
  let helpText = document.createElement('p');

  helpText.textContent = infoText;
  helpText.id = 'helpText';

  backButton.classList.add('startButton');
  backButton.id = 'backButton';
  backButton.textContent = 'BACK';

  helpScreen.classList.add('help');
  helpScreen.id = 'helpScreen';

  document.addEventListener('keydown', () => {
    backButton.focus();
  });
  backButton.addEventListener('click', goBack);

  helpScreen.append(helpText, backButton);
  helpWrap.append(helpScreen);
  document.body.prepend(helpWrap);
}

function goBack() {
  document.getElementById('helpWrap').remove();
  startScreen();
}

export function levelDisplay() {
  let levelDiv = document.getElementById('level');
  levelDiv.textContent = `LEVEL ${currentLevel}`;
}

// when level 10 is finished, it's game over, player receives a bonus
export function gameEnd() {
  let time = 5;
  player.score += 1000 * player.lives;

  let scoreP = document.createElement('p');
  scoreP.classList.add('endP');
  score.id = 'scoreP';
  scoreP.textContent = `\n\nSCORE: ${player.score.toString()}`;

  let counter = document.createElement('p');
  counter.classList.add('endP');
  counter.textContent = time.toString() + '...';

  document.getElementById('wrapper').remove();
  document.getElementById('gameOverScreen').remove();

  let endDiv = document.createElement('div');
  endDiv.classList.add('endDiv');
  endDiv.id = 'endDiv';

  let endH2 = document.createElement('h2');
  endH2.classList.add('endH2');
  endH2.textContent = 'CONGRATULATIONS!';

  let endP = document.createElement('p');
  endP.classList.add('endP');
  endP.textContent = `YOU HAVE COMPLETED ALL THE LEVELS
YOU TRULY DESERVE THE TITLE:`;

  let ultimate = document.createElement('h4');
  ultimate.classList.add('ultimate');
  ultimate.textContent = 'U L T I M A T E   B O M B M A N';

  endDiv.append(endH2, endP, ultimate, scoreP, counter);
  document.body.prepend(endDiv);

  let endTimer = setInterval(() => {
    time--;
    counter.textContent = time.toString() + '...';
    if (time === 0) {
      clearInterval(endTimer);
      counter.textContent = 'Press ENTER to restart';
      document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          window.location.reload();
        }
      });
    }
  }, 1000);
}
