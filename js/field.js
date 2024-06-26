import { map, mapEngine } from './maps.js';

const SOFTWALL_CHANCE = 5.5;
mapEngine();

// drawMap creates the game field based on the template provided;
export function drawMap(templ = map) {
  let game = document.getElementById('game');
  let mainMap = document.getElementById('mainMap');
  let softWalls = [];

  for (let i = 0; i < templ.length; i++) {
    for (let j = 0; j < templ[i].length; j++) {
      let mapBlock = document.createElement('div');
      mapBlock.className = 'grid-item';
      mapBlock.id = `block-${j}:${i}`;

      if (templ[i][j] === '▉') {
        if (i !== 0 && i !== templ.length - 1 && j !== 0 && j !== templ[i].length - 1) {
          mapBlock.classList.add('solid-wall');
        } else {
          mapBlock.classList.add('border');
        }
      } else if (templ[i][j] === 'x') {
        mapBlock.classList.add('starting-point', 'empty-field');
      } else if (templ[i][j] === null || templ[i][j] === '') {
        let randomNum = Math.random() * 10;
        if (randomNum < SOFTWALL_CHANCE) {
          mapBlock.classList.add('softWall');
          softWalls.push(mapBlock.id);
        } else {
          mapBlock.classList.add('empty-field');
        }
      } else if (templ[i][j]?.includes('W')) {
        mapBlock.classList.add('softWall');
      }
      mainMap.append(mapBlock);
    }
  }

  let goalIndex = Math.floor(Math.random() * softWalls.length);
  let goalBlock = document.getElementById(softWalls[goalIndex]);

  goalBlock.classList.add('goal');
  game.append(mainMap);
}
