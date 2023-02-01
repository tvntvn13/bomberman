import { template } from "./field.js";
import { bomb } from "./bomb.js";

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

// helper function to get players coordinates
function getPlayerLocation() {
  for (let i = 1; i < template.length - 1; i++) {
    let index = template[i].indexOf("P");
    if (index != -1) {
      return [i, index];
    }
  }
}