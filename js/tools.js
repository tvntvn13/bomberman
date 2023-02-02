import { template } from "./field.js";
import { player } from "./script.js";

// set startpoint for player
export function setStartpoint() {
  let x;
  let y;
  let randNum = Math.floor(Math.random() * 4);
  switch (randNum) {
    case 0:
      x = 1;
      y = 1;
      break;
    case 1:
      x = 13;
      y = 1;
      break;
    case 2:
      x = 1;
      y = 11;
      break;
    case 3:
      x = 13;
      y = 11;
      break;
  }
  return [x, y];
}

export function score() {
  let scoreDiv = document.getElementById("score");
  let scoreAmount = 0;
  scoreDiv.textContent = scoreAmount.toString().padStart(6,"0");
}


export function timer(time) {
  let timerDiv = document.getElementById("timer");
  timerDiv.textContent = time;
}

export function lives() {
  let livesDiv = document.getElementById("lives");
  let livesAmount = player.lives;
  livesDiv.textContent = "♥ ".repeat(livesAmount);
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
          elem.style.width = width + "%";
        }
      }
    }
}

export function death() {
  


}
