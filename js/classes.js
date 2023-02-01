import { bomb } from "./bomb.js";

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
            currentSpot.classList.remove('moveRight','moveLeft','moveUp','moveDown')
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
            currentSpot.classList.remove('moveRight','moveLeft','moveUp','moveDown')
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
            currentSpot.classList.remove('moveRight','moveLeft','moveUp','moveDown')
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
            currentSpot.classList.remove('moveRight','moveLeft','moveUp','moveDown');
            return true;
        } else {
            return false;
        }
    }
}

export class Player extends MovingElement {
    constructor(x, y) {
        super(x, y)
        this.bombs = 0;
        this.type = 'player';
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
            let currentSpot = document.getElementById(`block-${x}:${y}`);
            currentSpot.classList.add('bomb');
            bomb(x, y);
            this.bombs++;
        }
    }
}

export class Enemy extends MovingElement {
    constructor(x, y) {
        super(x, y);
        this.type = 'enemy';
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
}