import { player } from "./script.js";
import { template } from "./field.js";
import { setStartpoint } from "./tools.js";
// import { sfx } from "./soundFx.js";

// MovingElement is the parent class to Player and Enemy, it is not used itself anywhere
export class MovingElement {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
  moveUp() {
    let x = this.x;
    let y = this.y;
    let nextSpotY = this.y - 1;
    let currentSpot = document.getElementById(`block-${x}:${y}`);
    let nextSpot = document.getElementById(`block-${x}:${nextSpotY}`);
    if (
      nextSpot.classList.contains("empty-field") &&
      !nextSpot.classList.contains("bomb")
    ) {
      if (this.type === "enemy" && nextSpot.classList.contains("enemy")) {
        return false;
      }
      nextSpot.classList.toggle(this.type);
      nextSpot.classList.add("moveUp");
      this.y--;
      currentSpot.classList.toggle(this.type);
      currentSpot.classList.remove(
        "moveRight",
        "moveLeft",
        "moveUp",
        "moveDown"
      );
      return true;
    } else {
      return false;
    }
  }
  moveDown() {
    let x = this.x;
    let y = this.y;
    let nextSpotY = this.y + 1;
    let currentSpot = document.getElementById(`block-${x}:${y}`);
    let nextSpot = document.getElementById(`block-${x}:${nextSpotY}`);
    if (
      nextSpot.classList.contains("empty-field") &&
      !nextSpot.classList.contains("bomb")
    ) {
      if (this.type === "enemy" && nextSpot.classList.contains("enemy")) {
        return false;
      }
      nextSpot.classList.toggle(this.type);
      nextSpot.classList.add("moveDown");
      this.y++;
      currentSpot.classList.toggle(this.type);
      currentSpot.classList.remove(
        "moveRight",
        "moveLeft",
        "moveUp",
        "moveDown"
      );
      return true;
    } else {
      return false;
    }
  }
  moveLeft() {
    let x = this.x;
    let y = this.y;
    let nextSpotX = this.x - 1;
    let currentSpot = document.getElementById(`block-${x}:${y}`);
    let nextSpot = document.getElementById(`block-${nextSpotX}:${y}`);
    if (
      nextSpot.classList.contains("empty-field") &&
      !nextSpot.classList.contains("bomb")
    ) {
      if (this.type === "enemy" && nextSpot.classList.contains("enemy")) {
        return false;
      }
      nextSpot.classList.toggle(this.type);
      nextSpot.classList.add("moveLeft");
      this.x--;
      currentSpot.classList.toggle(this.type);
      currentSpot.classList.remove(
        "moveRight",
        "moveLeft",
        "moveUp",
        "moveDown"
      );
      return true;
    } else {
      return false;
    }
  }
  moveRight() {
    let x = this.x;
    let y = this.y;
    let nextSpotX = this.x + 1;
    let currentSpot = document.getElementById(`block-${x}:${y}`);
    let nextSpot = document.getElementById(`block-${nextSpotX}:${y}`);
    if (
      nextSpot.classList.contains("empty-field") &&
      !nextSpot.classList.contains("bomb")
    ) {
      if (this.type === "enemy" && nextSpot.classList.contains("enemy")) {
        return false;
      }
      nextSpot.classList.toggle(this.type);
      nextSpot.classList.add("moveRight");
      this.x++;
      currentSpot.classList.toggle(this.type);
      currentSpot.classList.remove(
        "moveRight",
        "moveLeft",
        "moveUp",
        "moveDown"
      );
      return true;
    } else {
      return false;
    }
  }
  movement(keyPressed) {
    if (keyPressed !== null) {
      switch (keyPressed) {
        case "down":
          this.moveDown();
          break;
        case "up":
          this.moveUp();
          break;
        case "left":
          this.moveLeft();
          break;
        case "right":
          this.moveRight();
          break;
        case "escape":
          togglePause();
          break;
      }
    }
  }
}

// Player is the class for the single player object, inherits properties and methods from MovingElement
export class Player extends MovingElement {
  constructor(x, y) {
    super(x, y);
    this.alive = true;
    this.bombs = 0;
    this.lives = 3;
    this.type = "player";
    this.score = 0;
    this.level = 1
    this.invincible = false;
    let startPoint = document.getElementById(`block-${x}:${y}`);
    startPoint.classList.add(this.type);
  }
  moveUp() {
    if (this.alive) {
      super.moveUp();
    }
  }
  moveDown() {
    if (this.alive) {
      super.moveDown();
    }
  }
  moveLeft() {
    if (this.alive) {
      super.moveLeft();
    }
  }
  moveRight() {
    if (this.alive) {
      super.moveRight();
    }
  }
  // placeBomb creates a new Bomb object at the player's position
  placeBomb() {
    if (this.bombs < 3 && this.alive) {
      let x = this.x;
      let y = this.y;
      let currentSpot = document.getElementById(`block-${x}:${y}`);
      if (!currentSpot.classList.contains("bomb")) {
        let thisBomb = new Bomb(x, y);
        this.bombs++;
      }
    }
  }
  get getScore() {
    return this.score;
  }
  addScore(num) {
    this.score += num;
  }
  death() {
    this.alive = false;
    let spot = document.getElementById(`block-${this.x}:${this.y}`);
    spot.classList.remove(
      "moveRight",
      "moveLeft",
      "moveUp",
      "moveDown",
      "player"
    );
    this.invincible = true;
    this.lives--;
    console.log(this.lives);
		spot.classList.add('dead')
    setTimeout(() => {
      spot.classList.remove('dead')
			this.respawn();
    }, 1000);
		
  }
  respawn() {
    let respawn = setStartpoint();
    this.x = respawn[0];
    this.y = respawn[1];
    document
      .getElementById(`block-${this.x}:${this.y}`)
      .classList.add("player", "invincible");
    this.alive = true;
    setTimeout(() => {
      this.invincible = false;
      document
        .getElementById(`block-${this.x}:${this.y}`)
        .classList.remove("invincible");
    }, 3000);
  }
  clearAllBombs() {
    bombsPlaced = {};
  }
}

export let allEnemies = [];

// Enemy is the class for enemy objects, inherits from MovingElement
export class Enemy extends MovingElement {
  constructor(x, y) {
    super(x, y);
    this.type = "enemy";
    this.movementDirection = -1;
    this.allDirections = [
      "this.moveUp()",
      "this.moveDown()",
      "this.moveLeft()",
      "this.moveRight()",
      "this.moveDown()",
      "this.moveUp()",
      "this.moveRight()",
      "this.moveLeft()",
    ];
    let startPoint = document.getElementById(`block-${x}:${y}`);
    startPoint.classList.add(this.type);
    allEnemies.push(this);
    this.alive = true;
  }
  moveUp() {
    if (super.moveUp()) {
      return true;
    } else {
      return false;
    }
  }
  moveDown() {
    if (super.moveDown()) {
      return true;
    } else {
      return false;
    }
  }
  moveLeft() {
    if (super.moveLeft()) {
      return true;
    } else {
      return false;
    }
  }
  moveRight() {
    if (super.moveRight()) {
      return true;
    } else {
      return false;
    }
  }
  // move contains the logic for enemy movement,
  // keeps track of which way the enemy is heading as long as the way forward is clear,
  // if not, chooses another direction until it can move, or skip the movement if enemy is walled in
  move() {
    if (!this.alive) {
      return;
    }
    if (this.movementDirection === -1) {
      this.movementDirection = Math.floor(
        Math.random() * this.allDirections.length
      );
      if (eval(this.allDirections[this.movementDirection])) {
        this.movementDirection = this.movementDirection;
        return;
      } else {
        let originalIndex = this.movementDirection;
        while (!eval(this.allDirections[this.movementDirection])) {
          this.movementDirection =
            (this.movementDirection + 1) % this.allDirections.length;
          if (this.movementDirection === originalIndex) {
            return;
          }
        }
        this.movementDirection = this.movementDirection;
        return;
      }
    } else {
      if (eval(this.allDirections[this.movementDirection])) {
        return;
      } else {
        let originalIndex = this.movementDirection;
        while (!eval(this.allDirections[this.movementDirection])) {
          this.movementDirection =
            (this.movementDirection + 1) % this.allDirections.length;
          if (this.movementDirection === originalIndex) {
            break;
          }
        }
        return;
      }
    }
  }
  death() {
    this.alive = false;
    let spot = document.getElementById(`block-${this.x}:${this.y}`);
    spot.classList.remove("enemy");
  }
}

export let bombsPlaced = {};

// Bomb is the class for bomb objects, keeps track of the remaining time and handles the explosion
export class Bomb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isTicking = true;
    let bombBlock = document.getElementById(`block-${x}:${y}`);
    bombBlock.classList.add("bomb");
    this.placementTime = new Date().getTime();
    this.timer = 3000;
    this.timerId = this.explodeOnTimer(this.timer);
    bombsPlaced[`${x}:${y}`] = this;
  }
  explosionPrep() {
    let explFields = [];
    // checking explosion range upwards
    // the bomb's location should be added only once, so the loop starts on this.y (and this.x) on this loop only
    // rest of the checks start from the spot after the bomb's location
    for (let i = this.y; i > 0 && i >= this.y - 3; i--) {
      let currentBlock = document.getElementById(`block-${this.x}:${i}`);
      if (currentBlock.classList.contains("solid-wall")) {
        break;
      } else if (currentBlock.classList.contains("softWall")) {
        explFields.push([i, this.x]);
        break;
      } else {
        explFields.push([i, this.x]);
      }
    }
    // checking downwards
    for (let i = this.y + 1; i < template.length - 1 && i <= this.y + 3; i++) {
      let currentBlock = document.getElementById(`block-${this.x}:${i}`);
      if (currentBlock.classList.contains("solid-wall")) {
        break;
      } else if (currentBlock.classList.contains("softWall")) {
        explFields.push([i, this.x]);
        break;
      } else {
        explFields.push([i, this.x]);
      }
    }
    // checking to the left
    for (let i = this.x - 1; i > 0 && i >= this.x - 3; i--) {
      let currentBlock = document.getElementById(`block-${i}:${this.y}`);
      if (currentBlock.classList.contains("solid-wall")) {
        break;
      } else if (currentBlock.classList.contains("softWall")) {
        explFields.push([this.y, i]);
        break;
      } else {
        explFields.push([this.y, i]);
      }
    }
    // checking to the right
    for (
      let i = this.x + 1;
      i < template[this.y].length - 1 && i <= this.x + 3;
      i++
    ) {
      let currentBlock = document.getElementById(`block-${i}:${this.y}`);
      if (currentBlock.classList.contains("solid-wall")) {
        break;
      } else if (currentBlock.classList.contains("softWall")) {
        explFields.push([this.y, i]);
        break;
      } else {
        explFields.push([this.y, i]);
      }
    }
    return explFields;
  }
  explodeNow() {
    this.range = this.explosionPrep();
    for (let [index, elem] of this.range.entries()) {
      let bombBlock = document.getElementById(`block-${elem[1]}:${elem[0]}`);
      if (index !== 0 && bombBlock.classList.contains("bomb")) {
        let chainedBomb = bombsPlaced[`${elem[1]}:${elem[0]}`];
        clearTimeout(chainedBomb.timerId);
        chainedBomb.explodeNow();
      }
      bombBlock.classList.remove("bomb", "softWall");
      // sfx.bombExplode.play();
      bombBlock.classList.add("explosion");
    }
    this.bombClearOut();
    player.bombs--;
    delete bombsPlaced[`${this.x}:${this.y}`];
  }
  explodeOnTimer(timer=3000) {
    let id = setTimeout(() => {
      this.explodeNow();
    }, timer);
    return id;
  }
  bombClearOut() {
    setTimeout(() => {
      for (let elem of this.range) {
        let bombBlock = document.getElementById(`block-${elem[1]}:${elem[0]}`);
        bombBlock.classList.remove("explosion");
        bombBlock.classList.add("empty-field");
      }
    }, 500);
  }
}
