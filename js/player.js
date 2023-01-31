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
      nextSpot.classList.add('moveUp');
      // nextSpot.classList.toggle('moveUp');
      this.y--;
      // currentSpot.classList.toggle('empty-field');
      currentSpot.classList.toggle('player');
      currentSpot.classList.remove('moveRight','moveLeft','moveUp','moveDown');    }
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
      nextSpot.classList.add('moveDown');
      // nextSpot.classList.toggle('moveDown');
      this.y++;
      // currentSpot.classList.toggle('empty-field');
      currentSpot.classList.toggle('player');
      currentSpot.classList.remove('moveRight','moveLeft','moveUp','moveDown');    }
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
      nextSpot.classList.add('moveLeft');
      // nextSpot.classList.toggle('moveLeft');
      this.x--;
      // currentSpot.classList.toggle('empty-field');
      currentSpot.classList.toggle('player');
      currentSpot.classList.remove('moveRight','moveLeft','moveUp','moveDown');    }
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
      nextSpot.classList.add('moveRight');
      // nextSpot.classList.toggle('moveRight');
      this.x++;
      // currentSpot.classList.toggle('empty-field');
      currentSpot.classList.toggle('player');
      currentSpot.classList.remove('moveRight','moveLeft','moveUp','moveDown');
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

