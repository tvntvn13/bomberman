//import { drawMap } from "./field.js";
import { drawMap, template } from "./field.js";

export function setStartpoint() {
  let x = 3;
  let y = 3;
  template[x][y] = "P";
}

function getPlayerLocation() {
  for (let i = 1; i < template.length - 1; i++) {
    let index = template[i].indexOf("P");
    if (index != -1) {
      return [i, index];
    }
  }
}

export function player() {
  player = {
    x: getPlayerLocation(template)[0],
    y: getPlayerLocation(template)[1],


    // console.log("this",player.x)
    // console.log("this",player.y)
    playerMarker: "P",
    // playerModel.classList.add("player")
    // playerModel.id = "player";
    moveUp: function () {
      let x = player.x
      let y = player.y
      console.log("MOVEUP:", player.x, player.y)
      if (template[y - 1][x] === undefined || template[y - 1][x] === " ") {
        template[y][x] = " ";
        template[y - 1][x] = "P";
        player.y--;
        drawMap();
      }
      console.log("player.y", player.y)
      console.log(template[4]);

    },
    moveDown: function () {
      let x = player.x;
      let y = player.y;
      if (template[y + 1][x] === undefined || template[y + 1][x] === " ") {
        template[y][x] = " ";
        template[y + 1][x] = "P";
        player.y++;
        drawMap();
      }

    },
    moveLeft: function () {
      let x = player.x;
      let y = player.y;
      if (template[y][x - 1] === undefined || template[y][x - 1] === " ") {
        template[y][x] = " ";
        template[y][x - 1] = "P";
        player.x--;
        drawMap();
      }


    },
    moveRight: function () {
      let x = player.x;
      let y = player.y;
      if (template[y][x + 1] === undefined || template[y][x + 1] === " ") {
        template[y][x] = " ";
        template[y][x + 1] = "P";
        player.x++;
        drawMap();
      }

    }
  }
}
