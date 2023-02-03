import { template } from "./field.js";
import { player, rafID, pause } from "./script.js";


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
        elem.style.width = width + "%";
      }
    }
  }
}

export function gameOver(){
  let gameOverScreen = document.getElementById("gameOverScreen");
  gameOverScreen.style.display = "block";
  document.getElementById("wrapper").style.display = "none";
  cancelAnimationFrame(rafID);
  document.body.addEventListener("keydown", (e) =>{
    if (e.key === " " || e.key === "Enter") window.location.reload();
  });

}

export function winner(){
  // let winScreen = document.createElement("div");
  // winScreen.classList.add("winScreen");
  let congrats = document.createElement("h1");
  let win = document.createElement("p");
  win.textContent = "you cleared the level!";
  win.classList.add("winP");
  congrats.classList.add("congratulations");
  congrats.textContent = "CONGRATULATIONS!!!";
  congrats.append(win);
  // winScreen.append(congrats);
  let info = document.getElementById("info");
  info.append(congrats);
  cancelAnimationFrame(rafID);
  document.body.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      congrats.style.display = "none";
    }
  });


}
