import { drawMap } from "./field.js";
import { player, setStartpoint } from "./player.js";

function init() {
  let game = document.createElement('div');
  game.className = 'game';
  game.id = 'game';
  document.body.append(game);
  setStartpoint();
  player();
  // drawMap();
}

let fps = 60;
let now;
let interval = 1000 / fps;
let then = Date.now();
let delta;
let animationID;

function update() {
  document.querySelectorAll(".grid-container").forEach((e) => e.remove());
  document.querySelectorAll(".player").forEach((e) => e.remove());
  document.querySelectorAll(".explosion").forEach((e) => e.remove());


  animationID = requestAnimationFrame(update);

  now = Date.now();
  delta = now - then;

  if (delta > interval) {

    drawMap();

    then = now - (delta % interval);
  }
}

update();

// let resumeButton = document.getElementById("continueButton");
// let quitButton = document.getElementById("quitButton");
// resumeButton.addEventListener("click",update());
// quitButton.addEventListener("click",init());

// const resume = () => update();

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
window.onload = init();

