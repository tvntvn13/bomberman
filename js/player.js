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

export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.bombs = 0;
    // let startPoint = document.getElementById(`block-${x}:${y}`);
    // startPoint.classList.add('player');
  }
  moveUp() {
    let x = this.x
    let y = this.y
    let nextSpotY = this.y - 1;
    let currentSpot = document.getElementById(`block-${x}:${y}`);
    let nextSpot = document.getElementById(`block-${x}:${nextSpotY}`);
    if (nextSpot.classList.contains('empty-field') && !nextSpot.classList.contains('bomb')) {
      // nextSpot.classList.toggle('empty-field');
      nextSpot.classList.toggle('player');
      this.y--;
      // currentSpot.classList.toggle('empty-field');
      currentSpot.classList.toggle('player');
    }
  }
  moveDown() {
    let x = this.x;
    let y = this.y;
    let nextSpotY = this.y + 1;
    let currentSpot = document.getElementById(`block-${x}:${y}`);
    let nextSpot = document.getElementById(`block-${x}:${nextSpotY}`);
    if (nextSpot.classList.contains('empty-field') && !nextSpot.classList.contains('bomb')) {
      // nextSpot.classList.toggle('empty-field');
      nextSpot.classList.toggle('player');
      this.y++;
      // currentSpot.classList.toggle('empty-field');
      currentSpot.classList.toggle('player');
    }
  }
  moveLeft() {
    let x = this.x;
    let y = this.y;
    let nextSpotX = this.x - 1;
    let currentSpot = document.getElementById(`block-${x}:${y}`);
    let nextSpot = document.getElementById(`block-${nextSpotX}:${y}`);
    if (nextSpot.classList.contains('empty-field') && !nextSpot.classList.contains('bomb')) {
      // nextSpot.classList.toggle('empty-field');
      nextSpot.classList.toggle('player');
      this.x--;
      // currentSpot.classList.toggle('empty-field');
      currentSpot.classList.toggle('player');
    }
  }
  moveRight() {
    let x = this.x;
    let y = this.y;
    let nextSpotX = this.x + 1;
    let currentSpot = document.getElementById(`block-${x}:${y}`);
    let nextSpot = document.getElementById(`block-${nextSpotX}:${y}`);
    if (nextSpot.classList.contains('empty-field') && !nextSpot.classList.contains('bomb')) {
      // nextSpot.classList.toggle('empty-field');
      nextSpot.classList.toggle('player');
      this.x++;
      // currentSpot.classList.toggle('empty-field');
      currentSpot.classList.toggle('player');
    }
  }
  placeBomb() {
    if (this.bombs < 3) {
      let x = this.x;
      let y = this.y;
      let currentSpot = document.getElementById(`block-${x}:${y}`);
      currentSpot.classList.add('bomb');
      bomb(x, y);
      this.bombs++;
    }
  }
}

// player function/object that has the x and y coordinates
// and movement functions
// export function player(x, y) {
//   player = {
//     x: x,
//     y: y,
//     playerMarker: "P",
//     bombs: 0,

//     moveUp: function () {
//       let x = player.x
//       let y = player.y
//       let nextSpotY = player.y - 1;
//       let currentSpot = document.getElementById(`block-${x}:${y}`);
//       let nextSpot = document.getElementById(`block-${x}:${nextSpotY}`);
//       if (nextSpot.classList.contains('empty-field') && !nextSpot.classList.contains('bomb')) {
//         nextSpot.classList.toggle('empty-field');
//         nextSpot.classList.toggle('player');
//         player.y--;
//         currentSpot.classList.toggle('empty-field');
//         currentSpot.classList.toggle('player');
//       }
//     },
//     moveDown: function () {
//       let x = player.x;
//       let y = player.y;
//       let nextSpotY = player.y + 1;
//       let currentSpot = document.getElementById(`block-${x}:${y}`);
//       let nextSpot = document.getElementById(`block-${x}:${nextSpotY}`);
//       if (nextSpot.classList.contains('empty-field') && !nextSpot.classList.contains('bomb')) {
//         nextSpot.classList.toggle('empty-field');
//         nextSpot.classList.toggle('player');
//         player.y++;
//         currentSpot.classList.toggle('empty-field');
//         currentSpot.classList.toggle('player');
//       }
//     },
//     moveLeft: function () {
//       let x = player.x;
//       let y = player.y;
//       let nextSpotX = player.x - 1;
//       let currentSpot = document.getElementById(`block-${x}:${y}`);
//       let nextSpot = document.getElementById(`block-${nextSpotX}:${y}`);
//       if (nextSpot.classList.contains('empty-field') && !nextSpot.classList.contains('bomb')) {
//         nextSpot.classList.toggle('empty-field');
//         nextSpot.classList.toggle('player');
//         player.x--;
//         currentSpot.classList.toggle('empty-field');
//         currentSpot.classList.toggle('player');
//       }
//     },
//     moveRight: function () {
//       let x = player.x;
//       let y = player.y;
//       let nextSpotX = player.x + 1;
//       let currentSpot = document.getElementById(`block-${x}:${y}`);
//       let nextSpot = document.getElementById(`block-${nextSpotX}:${y}`);
//       if (nextSpot.classList.contains('empty-field') && !nextSpot.classList.contains('bomb')) {
//         nextSpot.classList.toggle('empty-field');
//         nextSpot.classList.toggle('player');
//         player.x++;
//         currentSpot.classList.toggle('empty-field');
//         currentSpot.classList.toggle('player');
//       }
//     },
//     placeBomb: function () {
//       if (this.bombs < 3) {
//         let x = player.x;
//         let y = player.y;
//         let currentSpot = document.getElementById(`block-${x}:${y}`);
//         currentSpot.classList.add('bomb');
//         bomb(x, y);
//         this.bombs++;
//       }
//     }
//   }
//   return player;
// }
