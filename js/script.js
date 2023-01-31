import { drawMap } from "./field.js";
import { Player, setStartpoint } from "./player.js";

let startTime;
let keyPressed = null;
export let player = new Player(1, 1);
drawMap();
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

function movement(){
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
      }
    }
}

function update(timestamp) {
  if (startTime === undefined) {
    startTime = timestamp;
  }
  if (timestamp - startTime > 70) {
    startTime = timestamp;
    movement();
  }

  requestAnimationFrame(update)
}

document.addEventListener("keypress", (e)=>{
  if (e.key === " ") player.placeBomb();
  if (e.key === "Escape") {
    cancelAnimationFrame(animationID);
    let pause = document.getElementById("pauseScreen");
    pause.style.display = "inline-block";
  }
})

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
    }
  }
});


