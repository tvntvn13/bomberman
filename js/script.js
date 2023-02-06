import { drawMap } from "./field.js";
import { sfx } from "./soundFx.js";
import { setStartpoint, loadingBar, score, timer, lives, gameOver, winner } from "./tools.js";
import { Enemy, Player, allEnemies } from "./classes.js";

export let pause = false;
let startTime;
let startTime2;
let startTime3;
let sp = setStartpoint();
let keyPressed = null;
let time = 200;
export let rafID = requestAnimationFrame(update)

// comment out this part to get rid of the loading bar !!!
// loadingBar();
// setTimeout(() => {
    //this part needs to stay.
   document.getElementById("loadingScreen").remove();
// },3200);

// ^^^ loading bar shit above ^^^



timer(time);
drawMap();
// sfx.stageIntro.play();
export let player = new Player(sp[0], sp[1]);
lives();
let enemy1 = new Enemy(5, 5);
let enemy2 = new Enemy(8, 5);
// let enemy2 = new Enemy(8, 5);
// let enemyStartPoint = document.getElementById(`block-${enemy.x}:${enemy.y}`);
// enemyStartPoint.classList.add('enemy');
let startPoint = document.getElementById(`block-${player.x}:${player.y}`);
startPoint.classList.add('player');
let pauseScreen = document.getElementById("pauseScreen");
score(player.score);
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
  let playerPosition = document.getElementById(`block-${player.x}:${player.y}`);
  if (!player.invincible && (playerPosition.classList.contains("enemy") || playerPosition.classList.contains("explosion"))) {
    sfx.playerDies.play();
    player.death();
    lives();
  }
  for (let enemy of allEnemies) {
    if (enemy.alive) {
      let enemyPosition = document.getElementById(`block-${enemy.x}:${enemy.y}`);

      if (enemyPosition.classList.contains("explosion")) {
        player.score += 100;
        score(player.score);
        enemy.death();
      }
    }
  }
  if (playerPosition.classList.contains("goal")) {
    pause = true;
    player.score += Math.floor((time * 100) / 60);
    score(player.score)
    sfx.stageClear.play();
    winner();

    return;
  }

  if (startTime === undefined) {
    startTime = timestamp;
  }
  const elapsed = timestamp - startTime;
  if (elapsed > 500) {
    startTime = timestamp;
    // NEED TO FIX THIS!
    console.log(allEnemies);
    for (let enemy of allEnemies) {
      enemy.move();
    }
    // enemy.move();
  }

  if (startTime2 === undefined) {
    startTime2 = timestamp;
  }
  if (timestamp - startTime2 > 70) {
    startTime2 = timestamp;
    if (keyPressed) {
      sfx.walking2.play();
      player.movement(keyPressed);
      sfx.walking.play();
    }
  }
  if (startTime3 === undefined) {
    startTime3 = timestamp;
  }
  if (timestamp - startTime3 > 1100) {
    startTime3 = timestamp;
    if (time === 0) {
      pause = true;
      sfx.timeUpFull.play();
      gameOver();
    }
    timer(time--);
  }

  if (!pause) {
    requestAnimationFrame(update)
  } else {
    return
  }
}

document.addEventListener("keypress", (e) => {
  if (e.key === " " && !pause) {
    sfx.placeBomb.play();
    player.placeBomb();
  }
})



let continueButton = document.getElementById("continueButton");
let restartButton = document.getElementById("restartButton");
continueButton.focus();
continueButton.addEventListener("keypress", (e) => {
  if (e.key === "ArrowRight") {
    document.getElementById("restartButton").focus();
  }
  if (e.key === "Enter" || e.key === " ") {
    continueButton.click();
  }
});

restartButton.addEventListener("keypress", (e) => {
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




