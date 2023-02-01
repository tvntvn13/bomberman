import { drawMap } from "./field.js";
import { setStartpoint } from "./tools.js";
import { Enemy, Player } from "./classes.js";


let pause = false;
let startTime;
let startTime2;
let sp = setStartpoint();
let keyPressed = null;
drawMap();
export let player = new Player(sp[0], sp[1]);
let enemy = new Enemy(5,5);
let enemyStartPoint = document.getElementById(`block-${enemy.x}:${enemy.y}`);
enemyStartPoint.classList.add('enemy');
let pauseScreen = document.getElementById("pauseScreen");
let startPoint = document.getElementById(`block-${player.x}:${player.y}`);
startPoint.classList.add('player');
update();
// requestAnimationFrame(update)

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
  const elapsed = timestamp - startTime;
  if (elapsed > 500) {
    startTime = timestamp;
    enemy.move();
  }

  if (startTime2 === undefined) {
    startTime2 = timestamp;
  }
  if (timestamp - startTime2 > 70) {
    startTime2 = timestamp;
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
  pauseScreen.style.display = "block";
  // requestAnimationFrame(update);
}


