import { template } from "./field.js";
import { player } from "./script.js";

export function bomb(x, y) {
  explosion(x, y);
}

export function explosion(x, y) {
  let explFields = [];
  for (let i = y; i > 0 && i >= y - 3; i--) {
    let currentBlock = document.getElementById(`block-${x}:${i}`);
    if (template[i][x] === "▉") {
      break;
    } else if (currentBlock.classList.contains('softWall')) {
      explFields.push([i, x]);
      break;
    } else {
      explFields.push([i, x]);
    }
  }
  for (let i = y; i < template.length - 1 && i <= y + 3; i++) {
    let currentBlock = document.getElementById(`block-${x}:${i}`);
    if (template[i][x] === "▉") {
      break;
    } else if (currentBlock.classList.contains('softWall')) {
      explFields.push([i, x]);
      break;
    } else {
      explFields.push([i, x]);
    }
  }
  for (let i = x; i > 0 && i >= x - 3; i--) {
    let currentBlock = document.getElementById(`block-${i}:${y}`);
    if (template[y][i] === "▉") {
      break;
    } else if (currentBlock.classList.contains('softWall')) {
      explFields.push([y, i]);
      break;
    } else {
      explFields.push([y, i]);
    }
  }
  for (let i = x; i < template[y].length - 1 && i <= x + 3; i++) {
    let currentBlock = document.getElementById(`block-${i}:${y}`);
    if (template[y][i] === "▉") {
      break;
    } else if (currentBlock.classList.contains('softWall')) {
      explFields.push([y, i]);
      break;
    } else {
      explFields.push([y, i]);
    }
  }
  // for (let elem of explFields) {
  //   template[elem[0][elem[1]]] = "X";
  // }
  setTimeout(() => {
    // let bombPlaced = document.getElementById(`block-${x}:${y}`);
    // bombPlaced.classList.remove('bomb');
    for (let elem of explFields) {
      let bombBlock = document.getElementById(`block-${elem[1]}:${elem[0]}`);
      bombBlock.classList.remove('bomb', 'softWall');
      bombBlock.classList.add('explosion');
      // bombBlock.classList.remove('softWall');
      // template[elem[0]][elem[1]] = "X"
    }
    bombClearOut(explFields);
    player.bombs--;
  }, 3000);
}


function bombClearOut(arr) {
  setTimeout(() => {
    for (let elem of arr) {
      let bombBlock = document.getElementById(`block-${elem[1]}:${elem[0]}`);
      bombBlock.classList.remove('explosion');
      bombBlock.classList.add('empty-field');
    }

  }, 500);
}