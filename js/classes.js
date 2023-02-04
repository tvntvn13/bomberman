import { player } from "./script.js";
import { template } from "./field.js";
import { setStartpoint } from "./tools.js";

export class MovingElement {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
    moveUp() {
        let x = this.x
        let y = this.y
        let nextSpotY = this.y - 1;
        let currentSpot = document.getElementById(`block-${x}:${y}`);
        let nextSpot = document.getElementById(`block-${x}:${nextSpotY}`);
        if (nextSpot.classList.contains('empty-field') && !nextSpot.classList.contains('bomb')) {
            // nextSpot.classList.toggle('empty-field');
            nextSpot.classList.toggle(this.type);
            nextSpot.classList.add("moveUp")
            this.y--;
            // currentSpot.classList.toggle('empty-field');
            currentSpot.classList.toggle(this.type);
            currentSpot.classList.remove('moveRight', 'moveLeft', 'moveUp', 'moveDown')
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
        if (nextSpot.classList.contains('empty-field') && !nextSpot.classList.contains('bomb')) {
            // nextSpot.classList.toggle('empty-field');
            nextSpot.classList.toggle(this.type);
            nextSpot.classList.add('moveDown');
            this.y++;
            // currentSpot.classList.toggle('empty-field');
            currentSpot.classList.toggle(this.type);
            currentSpot.classList.remove('moveRight', 'moveLeft', 'moveUp', 'moveDown')
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
        if (nextSpot.classList.contains('empty-field') && !nextSpot.classList.contains('bomb')) {
            // nextSpot.classList.toggle('empty-field');
            nextSpot.classList.toggle(this.type);
            nextSpot.classList.add('moveLeft');
            this.x--;
            // currentSpot.classList.toggle('empty-field');
            currentSpot.classList.toggle(this.type);
            currentSpot.classList.remove('moveRight', 'moveLeft', 'moveUp', 'moveDown')
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
        if (nextSpot.classList.contains('empty-field') && !nextSpot.classList.contains('bomb')) {
            // nextSpot.classList.toggle('empty-field');
            nextSpot.classList.toggle(this.type);
            nextSpot.classList.add('moveRight');
            this.x++;
            // currentSpot.classList.toggle('empty-field');
            currentSpot.classList.toggle(this.type);
            currentSpot.classList.remove('moveRight', 'moveLeft', 'moveUp', 'moveDown');
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

export class Player extends MovingElement {
    constructor(x, y) {
        super(x, y)
        this.bombs = 0;
        this.lives = 3;
        this.type = 'player';
        this.score = 0;
        this.invincible = false;
        let startPoint = document.getElementById(`block-${x}:${y}`);
        startPoint.classList.add(this.type);
    }
    moveUp() {
        super.moveUp();
    }
    moveDown() {
        super.moveDown();
    }
    moveLeft() {
        super.moveLeft();
    }
    moveRight() {
        super.moveRight();
    }
    placeBomb() {
        if (this.bombs < 3) {
            let x = this.x;
            let y = this.y;
            // let currentSpot = document.getElementById(`block-${x}:${y}`);
            // currentSpot.classList.add('bomb');
            // bomb(x, y);
            let thisBomb = new Bomb(x, y);
            this.bombs++;
        }
    }
    death() {
        let spot = document.getElementById(`block-${this.x}:${this.y}`);
        spot.classList.remove("moveRight", "moveLeft","moveUp","moveDown","player");
        let respawn = setStartpoint();
        this.x = respawn[0]
        this.y = respawn[1]
        document.getElementById(`block-${this.x}:${this.y}`).classList.add("player");
        this.lives--;
        this.invincible = true;
        setTimeout(() => {
            this.invincible = false;
        }, 2000);
        console.log("you died!");
    }
}

export class Enemy extends MovingElement {
    constructor(x, y) {
        super(x, y);
        this.type = 'enemy';
        this.amount = 1;
        this.movementDirection = -1;
        this.allDirections = ['this.moveUp()', 'this.moveLeft()', 'this.moveRight()', 'this.moveDown()'];
        let startPoint = document.getElementById(`block-${x}:${y}`);
        startPoint.classList.add(this.type);
    }
    moveUp() {
        super.moveUp();
    }
    moveDown() {
        super.moveDown();
    }
    moveLeft() {
        super.moveLeft();
    }
    moveRight() {
        super.moveRight();
    }
    move() {
        if (this.movementDirection === -1) {
            let index = Math.floor(Math.random() * this.allDirections.length);
            if (eval(this.allDirections[index])) {
                this.movementDirection = index;
                return;
            } else {
                let originalIndex = index;
                while (!eval(this.allDirections[index])) {
                    index = (index + 1) % this.allDirections.length;
                    if (index === originalIndex) {
                        return;
                    }
                }
                this.movementDirection = index;
                return;
            }
        } else {
            if (eval(this.allDirections[this.movementDirection])) {
                return;
            } else {
                let originalIndex = index;
                while (!eval(this.allDirections[index])) {
                    index = (index + 1) % this.allDirections.length;
                    if (index === originalIndex) {
                        return;
                    }
                }
                this.movementDirection = index;
                return;
            }
        }
    }
    death(){
        let spot = document.getElementById(`block-${this.x}:${this.y}`);
        spot.classList.remove("enemy");
        this.amount--;
        console.log("enemy died");
    }
}

let bombsPlaced = {};

export class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isTicking = true;
        let bombBlock = document.getElementById(`block-${x}:${y}`);
        bombBlock.classList.add('bomb');
        this.range = this.explosionPrep()
        this.timerId = this.explodeOnTimer(this.range);
        bombsPlaced[`${x}:${y}`] = this;
    }
    explosionPrep() {
        let explFields = [];
        // checking explosion range upwards
        // the bomb's location should be added only once, so the loop starts on this.y (and this.x) on this loop only
        // rest of the checks start from the spot after the bomb's location
        for (let i = this.y; i > 0 && i >= this.y - 3; i--) {
            let currentBlock = document.getElementById(`block-${this.x}:${i}`);
            if (currentBlock.classList.contains('solid-wall')) {
                break;
            } else if (currentBlock.classList.contains('softWall')) {
                explFields.push([i, this.x]);
                break;
            } else {
                explFields.push([i, this.x]);
            }
        }
        // checking downwards
        for (let i = this.y+1; i < template.length - 1 && i <= this.y + 3; i++) {
            let currentBlock = document.getElementById(`block-${this.x}:${i}`);
            if (currentBlock.classList.contains('solid-wall')) {
                break;
            } else if (currentBlock.classList.contains('softWall')) {
                explFields.push([i, this.x]);
                break;
            } else {
                explFields.push([i, this.x]);
            }
        }
        // checking to the left
        for (let i = this.x-1; i > 0 && i >= this.x - 3; i--) {
            let currentBlock = document.getElementById(`block-${i}:${this.y}`);
            if (currentBlock.classList.contains('solid-wall')) {
                break;
            } else if (currentBlock.classList.contains('softWall')) {
                explFields.push([this.y, i]);
                break;
            } else {
                explFields.push([this.y, i]);
            }
        }
        // checking to the right
        for (let i = this.x+1; i < template[this.y].length - 1 && i <= this.x + 3; i++) {
            let currentBlock = document.getElementById(`block-${i}:${this.y}`);
            if (currentBlock.classList.contains('solid-wall')) {
                break;
            } else if (currentBlock.classList.contains('softWall')) {
                explFields.push([this.y, i]);
                break;
            } else {
                explFields.push([this.y, i]);
            }
        }
        return explFields;
    }
    explodeNow() {
        for (let [index, elem] of this.range.entries()) {
            let bombBlock = document.getElementById(`block-${elem[1]}:${elem[0]}`);
            if (index !== 0 && bombBlock.classList.contains('bomb')) {
                let chainedBomb = bombsPlaced[`${elem[1]}:${elem[0]}`];
                clearTimeout(chainedBomb.timerId);
                chainedBomb.explodeNow();
            }
            bombBlock.classList.remove('bomb', 'softWall');
            bombBlock.classList.add('explosion');
        }
        this.bombClearOut();
        player.bombs--;
        delete bombsPlaced[`${this.x}:${this.y}`];
    }
    explodeOnTimer(fields) {
        let id = setTimeout(() => {
            this.explodeNow(fields);
        }, 3000);
        return id;
    }
    bombClearOut() {
        setTimeout(() => {
            for (let elem of this.range) {
                let bombBlock = document.getElementById(`block-${elem[1]}:${elem[0]}`);
                bombBlock.classList.remove('explosion');
                bombBlock.classList.add('empty-field');
            }
        }, 500);
    }
}