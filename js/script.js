import { drawMap } from "./field.js";
import { player, setStartpoint } from "./player.js";

function init() {
    let game = document.createElement('div');
    game.className = 'game';
    game.id = 'game';
    document.body.append(game);
    setStartpoint();
    player();
    drawMap();
}



function loop() {
    //document.querySelectorAll("grid-container").forEach((e) => e.remove())
    // player();
    drawMap();
    // requestAnimationFrame(loop)
}

// eventlistener for player movement
document.body.addEventListener("keydown", (e) => {
    // delete the old map and update it with new one
    document.querySelectorAll(".grid-container").forEach((e) => e.remove())
    // delete old player position and updfate it with new one 
    document.querySelectorAll(".player").forEach((e) => e.remove());
    // let moveInterval;
    switch (e.key) {
      case "ArrowUp":
        player.moveUp();
        break;
        // moveInterval = setInterval(player.moveUp(player.x,player.y),500);
      case "ArrowLeft":
        player.moveLeft();
        break;
        // moveInterval = setInteval(player.moveLeft(player.x,player.y),500);
      case "ArrowRight":
        player.moveRight();
        break;
        // moveInterval = setInteral(player.moveRigth(player.x,player.y),500);
      case "ArrowDown":
        player.moveDown();
        break;
        // moveInterval = setInteral(player.moveDown(player.x,player.y),500);
        default:
            // if player cant move, just draw the map
            drawMap();
        
    }

  })
  window.onload = init();

// requestAnimationFrame(loop);
