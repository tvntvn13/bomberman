import { drawMap } from "./field.js";
import { setStartpoint, loadingBar, score, timer, lives } from "./tools.js";
import { Enemy, Player } from "./classes.js";


let pause = false;
let startTime;
let startTime2;
let startTime3;
let sp = setStartpoint();
let keyPressed = null;
let time = 300;
let rafID = requestAnimationFrame(update)

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
let startPoint = document.getElementById(`block-${player.x}:${player.y}`);
startPoint.classList.add('player');
let pauseScreen = document.getElementById("pauseScreen");
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
  if (e.key === " " && !pause) player.placeBomb();
})



let continueButton = document.getElementById("continueButton");
let restartButton = document.getElementById("restartButton");
continueButton.focus();
continueButton.addEventListener("keypress", (e)=>{
  if (e.key === "ArrowRight") {
    document.getElementById("restartButton").focus();
  }
  if (e.key === "Enter" || e.key === " ") {
    continueButton.click();
  }
}); 

restartButton.addEventListener("keypress", (e)=>{
  if (e.key === "ArrowLeft") {
    continueButton.focus();
  }
  if (e.key === "Enter" || e.key === " ") {
    restart();
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
  cancelAnimationFrame(rafID);
  if (pause) {
    pause = false;
  } else {
    pause = true;
  }
  pauseScreen.style.display = "block";
  
  // requestAnimationFrame(update);
}




