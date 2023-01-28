import { drawMap, template } from "./field.js";
import { player, setStartpoint } from "./player.js";

function init() {
    let game = document.createElement('div');
    game.className = 'game';
    game.id = 'game';
    document.body.append(game);
    player();
    drawMap(setStartpoint(template));
}

window.onload = init();