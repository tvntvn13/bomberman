import { drawMap, template } from "./field.js";
import { bomb } from "./bomb.js";

// set startpoint for player
export function setStartpoint() {
  let x = 3;
  let y = 3;
  template[x][y] = "P";
}

// helper function to get players coordinates
function getPlayerLocation() {
  for (let i = 1; i < template.length - 1; i++) {
    let index = template[i].indexOf("P");
    if (index != -1) {
      return [i, index];
    }
  }
}

// player function/object that has the x and y coordinates
// and movement functions
export async function player() {
  player = {
    x: getPlayerLocation(template)[0],
    y: getPlayerLocation(template)[1],
    playerMarker: "P",

    moveUp: function () {
      let x = player.x
      let y = player.y
      if (template[y - 1][x] === undefined || template[y - 1][x] === "") {
        if (template[y][x] !== "P B") template[y][x] = "";
        template[y - 1][x] = "P";
        player.y--;
        drawMap();
      // } else {
      //   drawMap();
      }

    },
    moveDown: function () {
      let x = player.x;
      let y = player.y;
      if (template[y + 1][x] === undefined || template[y + 1][x] === "") {
        if (template[y][x] !== "P B") template[y][x] = "";
        template[y + 1][x] = "P";
        player.y++;
        drawMap();
      // } else {
      //   drawMap();
      }
    },
    moveLeft: function () {
      let x = player.x;
      let y = player.y;
      if (template[y][x - 1] === undefined || template[y][x - 1] === "") {
        if (template[y][x] !== "P B") template[y][x] = "";
        template[y][x - 1] = "P";
        player.x--;
        drawMap();
      // } else {
      //   drawMap();
      }
    },
    moveRight: function () {
      let x = player.x;
      let y = player.y;
      if (template[y][x + 1] === undefined || template[y][x + 1] === "") {
        if (template[y][x] !== "P B") template[y][x] = "";
        template[y][x + 1] = "P";
        player.x++;
        drawMap();
      // } else {
      //   drawMap();
      }
    },
    placeBomb: function () {
      let x = player.x;
      let y = player.y;
      template[y][x] += " B";
      bomb(x,y);
      // drawMap();
    }
  }
}
