import { drawMap } from "./field.js";
import { setStartpoint, loadingBar } from "./tools.js";
import { Enemy, Player } from "./classes.js";


let pause = false;
let startTime;
let startTime2;
let startTime3;
let sp = setStartpoint();
let keyPressed = null;
let time = 300;

// comment out this part to get rid of the loading bar !!!
// loadingBar();
// setTimeout(() => {
    //this part needs to stay.
   document.getElementById("loadingScreen").remove();
// },3200);
// ^^^ loading bar shit above ^^^

lives();
score();
timer(time);
drawMap();
export let player = new Player(sp[0], sp[1]);
let enemy = new Enemy(5,5);
let enemyStartPoint = document.getElementById(`block-${enemy.x}:${enemy.y}`);
enemyStartPoint.classList.add('enemy');
let pauseScreen = document.getElementById("pauseScreen");
let startPoint = document.getElementById(`block-${player.x}:${player.y}`);
startPoint.classList.add('player');
update();
//requestAnimationFrame(update)



document.body.addEventListener("keyup", (e) => {
  if (e.key !== " ") keyPressed = null;
})

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
        togglePause();
        break;
    }
  }
});


function update(timestamp) {
  
  if (startTime === undefined) {
    startTime = timestamp;
  }
  const elapsed = timestamp - startTime;
  if (elapsed > 300) {
    startTime = timestamp;
    enemy.move();
  }

  if (startTime2 === undefined) {
    startTime2 = timestamp;
  }
  if (timestamp - startTime2 > 70) {
    startTime2 = timestamp;
    player.movement(keyPressed);
  }
  if (startTime3 === undefined) {
    startTime3 = timestamp;
  }
  if (timestamp - startTime3 > 1100) {
    startTime3 = timestamp;
    timer(time--);
  }
  
  if (!pause) {
    requestAnimationFrame(update)
  }
}

document.addEventListener("keypress", (e) => {
  if (e.key === " ") player.placeBomb();
})



let pauseMenu = document.getElementById("pauseScreen");
pauseMenu.addEventListener("keypress", (e)=>{
  document.getElementById("continueButton").focus();
  if (e.key === "ArrowRight") {
    document.getElementById("continueButton").focus();
  }
  if (e.key === "ArrowLeft") {
    document.getElementById("restartButton").focus();
  }
  if (e.key === " " || e.key === "Enter") {
    document.activeElement.click();
  }
}); 

function restart() {
  window.location.reload();
}

// document.getElementById("restartButton").addEventListener("click",restart())




// let continueButton = document.getElementById("continueButton");
// continueButton.addEventListener("keypress")
// let restartButton = document.getElementById("restartButton");
// restartButton.addEventListener("keypress",(e)=>{
//   if (e.key === "Enter" || e.key === " ") {
//     e.preventDefault();
//     window.location.reload();
//   }
//});



function togglePause() {
  if (pause) {
    pause = false;
  } else {
    pause = true;
  }
  pauseScreen.style.display = "block";
  // requestAnimationFrame(update);
}

function score() {
  let scoreDiv = document.getElementById("score");
  let scoreAmount = 0;
  scoreDiv.textContent = scoreAmount.toString().padStart(6,"0");
}

function timer(time) {
  let timerDiv = document.getElementById("timer");
  timerDiv.textContent = time;
  return;
}

function lives() {
  let livesDiv = document.getElementById("lives");
  let livesAmount = 3;
  livesDiv.textContent = "♥ ".repeat(livesAmount);
}


