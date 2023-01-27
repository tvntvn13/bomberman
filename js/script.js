import { drawMap } from "./field.js";

function init() {
    let game = document.createElement('div');
    game.className = 'game';
    game.id = 'game';
    document.body.append(game);
    drawMap();
}

window.onload(init());