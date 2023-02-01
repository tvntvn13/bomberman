import { drawMap } from "./field.js";
import { Player } from "./player.js";

let pause = false;
let startTime;
let keyPressed = null;
export let player = new Player(1, 1);
drawMap();
let pauseScreen = document.getElementById("pauseScreen");
let startPoint = document.getElementById(`block-${player.x}:${player.y}`);
startPoint.classList.add('player');
// update();
requestAnimationFrame(update)
function init() {
  // let game = document.createElement('div');
  // game.className = 'game';
  // game.id = 'game';
  // document.body.append(game);
}

function movement() {
  if (keyPressed !== null) {
    switch (keyPressed) {
      case "down":
        player.moveDown();
        break;
      case "up":
        player.moveUp();
        break;
      case "left":
        player.moveLeft();
        break;
      case "right":
        player.moveRight();
        break;
      case "escape":
        togglePause();
        break;
    }
  }
}

function update(timestamp) {
  
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
  if (startTime === undefined) {
    startTime = timestamp;
  }
  if (timestamp - startTime > 70) {
    startTime = timestamp;
    movement();
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
  console.log("pause")
  pauseScreen.style.display = "block";
  // requestAnimationFrame(update);
}


