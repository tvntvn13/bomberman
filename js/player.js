//import { drawMap } from "./field.js";
import { drawMap, template } from "./field.js";

export function setStartpoint() {
  let x = 4;
  let y = 3;
  template[x][y] = "P";
  return template;
}

export function player() {
  let x = setStartpoint.x
  let y = setStartpoint.y
  let playerMarker = "P"
  // playerModel.classList.add("player")
  // playerModel.id = "player";
  function moveUp(x,y) {
    // let x = this.x
    // let y = this.y
    if (template[x][y + 1] === undefined || template[x][y + 1] === " ") {
      template[x][y] = " ";
      template[x][y + 1] = "P";
    }
    drawMap();
  }
  function moveDown(x,y) {
    // let x = this.x;
    // let y = this.y;
    if (template[x][y - 1] === undefined || template[x][y - 1] === " ") {
      template[x][y] = " ";
      template[x][y - 1] = "P";
    }
    drawMap();
  }
    function moveLeft(x,y) {
      // let x = this.x;
      // let y = this.y;
      if (template[x - 1][y] === undefined || template[x - 1][y] === " ") {
        template[x][y] = " ";
        template[x - 1][y] = "P";
      }
      drawMap();

    }
    function moveRigth(x,y) {
      // let x = this.x;
      // let y = this.y;
      if (template[x+1][y] === undefined || template[x+1][y] === " ") {
        template[x][y] = " ";
        template[x+1][y] = "P";
    }
    drawMap();
  }

    document.body.addEventListener("keydown", (e) => {
      document.querySelectorAll(".player").forEach(e => e.remove());
      let moveInterval;
      switch (e.key) {
        case "arrowUp":
          moveInterval = setInterval(player.moveUp(player.x,player.y),500);
        case "arrowLeft":
          moveInterval = setInteval(player.moveLeft(player.x,player.y),500);
        case "arrowRigth":
          moveInterval = setInteral(player.moveRigth(player.x,player.y),500);
        case "arrowDown":
          moveInterval = setInteral(player.moveDown(player.x,player.y),500);
      }

    })

    // document.body.addEventListener("keyup", (e) => {
    //   if (moveInterval) clearInterval(moveInterval);
    // })
  }

