import { template } from "./field.js";

export function bomb(x, y) {
  explosion(x, y);
}

export function explosion(x, y) {
  let explFields = [];
  for (let i = y; i > 0 && i >= y-3; i--) {
    if (template[i][x] === "▉") {
      break;
    } else {
      explFields.push([i, x]);
    }
  }
  for (let i = y; i < template.length-1 && i <= y+3; i++) {
    if (template[i][x] === "▉") {
      break;
    } else {
      explFields.push([i, x]);
    }
  }
  for (let i = x; i > 0 && i >= x-3; i--) {
    if (template[y][i] === "▉") {
      break;
    } else {
    explFields.push([y, i]);
    }
  }
  for (let i = x; i < template[y].length-1 && i <= x+3; i++) {
    if (template[y][i] === "▉") {
      break;
    } else {
      explFields.push([y, i]);
    }
  }
  console.log('filled', explFields);
  for (let elem of explFields) {
    template[elem[0][elem[1]]] = "X";
  }
  setTimeout(() => {
    for (let elem of explFields) {
      template[elem[0]][elem[1]] = "X"
    }

    // if (template[y + 2][x] !== "▉") {
    //   explFields.push([y + 2, x]);
    //   explFields.push([y + 1, x]);
    //   template[y + 2][x] = "X";
    //   template[y + 1][x] = "X";
    // } else if (template[y + 1][x] !== "▉") {
    //   explFields.push([y + 1, x]);
    //   template[y + 1][x] = "X";
    // }
    // if (template[y - 2][x] !== "▉") {
    //   template[y - 2][x] = "X";
    //   template[y - 1][x] = "X";
    //   explFields.push([y - 2, x]);
    //   explFields.push([y - 1, x]);
    // } else if (template[y - 1][x] !== "▉") {
    //   template[y - 1][x] = "X";
    //   explFields.push([y - 1, x]);
    // }
    // if (template[y][x + 2] !== "▉") {
    //   template[y][x + 2] = "X";
    //   template[y][x + 1] = "X";
    //   explFields.push([y, x + 2]);
    //   explFields.push([y, x + 1]);
    // } else if (template[y][x + 1] !== "▉") {
    //   template[y][x + 1] = "X";
    //   explFields.push([y, x + 1]);
    // }
    // if (template[y][x - 2] !== "▉") {
    //   template[y][x - 2] = "X";
    //   template[y][x - 1] = "X";
    //   explFields.push([y, x - 2]);
    //   explFields.push([y, x - 1]);
    // } else if (template[y][x - 1] !== "▉") {
    //   template[y][x - 1] = "X";
    //   explFields.push([y, x - 1]);
    // }
    bombClearOut(explFields);
  }, 3000);
  // drawMap();
  // setTimeout(() => {
  //   for (let elem of template) {
  //     template[elem[0]][elem[1]] = undefined;
  //   }
    
  // }, 1000);
  // for (let i = 0; i < template.length; i++) {
  //   for ( let j = 0; j < template[0].length; j++) {
  //     if (template[i][j] === "X")
  //   }
  // }
  
  // console.log('this', explFields);
}


function bombClearOut(arr) {
  setTimeout(() => {
    for (let elem of arr) {
      template[elem[0]][elem[1]] = undefined;
    }
    
  }, 1000);
  // drawMap();
}