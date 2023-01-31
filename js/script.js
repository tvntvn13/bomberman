import { drawMap } from "./field.js";
import { setStartpoint } from "./tools.js";
import { Enemy, Player } from "./classes.js";

let startTime;
let sp = setStartpoint();
drawMap();
export let player = new Player(sp[0], sp[1]);
// let startPoint = document.getElementById(`block-${player.x}:${player.y}`);
// startPoint.classList.add('player');
let enemy = new Enemy(5,5);
let enemyStartPoint = document.getElementById(`block-${enemy.x}:${enemy.y}`);
enemyStartPoint.classList.add('enemy');
// console.log('thiss', `block-${enemy.x}:${enemy.y}`)
// enemy.move();
update();

function update(timestamp) {
  if (startTime === undefined) {
    startTime = timestamp;
  }
  const elapsed = timestamp - startTime;
  if (elapsed > 500) {
    startTime = timestamp;
    enemy.move();
  }
  requestAnimationFrame(update)
}

// let resumeButton = document.getElementById("continueButton");
// let quitButton = document.getElementById("quitButton");
// resumeButton.addEventListener("click",update());
// quitButton.addEventListener("click",init());

// eventlistener for player movement
document.body.addEventListener("keydown", (e) => {

  switch (e.key) {
    case "ArrowUp":
      player.moveUp();
      break;
    case "ArrowLeft":
      player.moveLeft();
      break;
    case "ArrowRight":
      player.moveRight();
      break;
    case "ArrowDown":
      player.moveDown();
      break;
    case " ":
      player.placeBomb();
      break;
    case "Escape":
      cancelAnimationFrame(animationID);
      let pause = document.getElementById("pauseScreen");
      pause.style.display = "inline-block";
  }

})
// window.onload = init();

