// export let map = [];

// map is the default level design, the '▉' characters are solid walls,
// the 'x' characters are the starting points and the neighbouring areas,
// 'W' are the default soft walls, so the player is walled in/protected at the start
export let map = [
  ["▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉"],
  ["▉", "x", "x", "W", , , , , , , , "W", "x", "x", "▉"],
  ["▉", "x", "▉", , "▉", , "▉", , "▉", , "▉", , "▉", "x", "▉"],
  ["▉", "x", "W", , , , , , , , , , "W", "x", "▉"],
  ["▉", "W", "▉", , "▉", , "▉", , "▉", , "▉", , "▉", "W", "▉"],
  ["▉", , , , , , , , , , , , , , "▉"],
  ["▉", , "▉", , "▉", , "▉", , "▉", , "▉", , "▉", , "▉"],
  ["▉", , , , , , , , , , , , , , "▉"],
  ["▉","W", "▉", , "▉", , "▉", , "▉", , "▉", , "▉","W", "▉"],
  ["▉", "x","W", , , , , , , , , ,"W", "x", "▉"],
  ["▉", "x", "▉", , "▉", , "▉", , "▉", , "▉", , "▉", "x", "▉"],
  ["▉", "x", "x", "W", , , , , , , , "W", "x", "x", "▉"],
  ["▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉"],
];

let map0 = [
  ["▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉"],
  ["▉", "x", "x", "W", , , , , , , , "W", "x", "x", "▉"],
  ["▉", "x", "▉", , "▉", , "▉", , "▉", , "▉", , "▉", "x", "▉"],
  ["▉", "x", "W", , , , , , , , , , "W", "x", "▉"],
  ["▉", "W", "▉", , "▉", , "▉", , "▉", , "▉", , "▉", "W", "▉"],
  ["▉", , , , , , , , , , , , , , "▉"],
  ["▉", , "▉", , "▉", , "▉", , "▉", , "▉", , "▉", , "▉"],
  ["▉", , , , , , , , , , , , , , "▉"],
  ["▉","W", "▉", , "▉", , "▉", , "▉", , "▉", , "▉","W", "▉"],
  ["▉", "x","W", , , , , , , , , ,"W", "x", "▉"],
  ["▉", "x", "▉", , "▉", , "▉", , "▉", , "▉", , "▉", "x", "▉"],
  ["▉", "x", "x", "W", , , , , , , , "W", "x", "x", "▉"],
  ["▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉"],
];

let map1 = [
  ['▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉'],
  ['▉','x','x','W',   ,   ,   ,   ,   ,   ,   ,'W','x','x','▉'],
  ['▉','x','▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉','x','▉'],
  ['▉','x','W','▉',   ,   ,   ,'▉',   ,   ,   ,'▉','W','x','▉'],
  ['▉','W','▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉','W','▉'],
  ['▉',   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,'▉'],
  ['▉',   ,'▉','▉','▉',   ,'▉','▉','▉',   ,'▉','▉','▉',   ,'▉'],
  ['▉',   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,'▉'],
  ['▉','W','▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉','W','▉'],
  ['▉','x','W','▉',   ,   ,   ,'▉',   ,   ,   ,'▉','W','x','▉'],
  ['▉','x','▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉','x','▉'],
  ['▉','x','x','W',   ,   ,   ,   ,   ,   ,   ,'W','x','x','▉'],
  ['▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉']
];


let map2 = [
  ['▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉'],
  ['▉','x','x',   ,   ,   ,   ,   ,   ,   ,   ,   ,'x','x','▉'],
  ['▉','x','▉','▉','▉','▉','▉',   ,'▉','▉','▉','▉','▉','x','▉'],
  ['▉','x',  ,  ,  '▉',   ,  ,  ,  '▉',   ,   ,   ,'▉','x','▉'],
  ['▉',   ,   ,   ,'▉',   ,   ,   ,'▉',   ,   ,   ,'▉',   ,'▉'],
  ['▉',   ,   ,   ,'▉',   ,   ,   ,   ,   ,   ,   ,'▉',   ,'▉'],
  ['▉',   ,   ,   ,'▉',   ,   ,   ,'▉',   ,  ,   , '▉',   ,'▉'],
  ['▉',   ,   ,   ,   ,   ,   ,   ,'▉',   ,   ,   ,'▉',   ,'▉'],
  ['▉',   ,   ,   ,'▉',   ,   ,   ,'▉',   ,   ,   ,'▉',   ,'▉'],
  ['▉','x',   ,   ,'▉',   ,   ,   ,'▉',   ,   ,   ,   ,'x','▉'],
  ['▉','x','▉','▉','▉',   ,'▉','▉','▉',   ,'▉','▉','▉','x','▉'],
  ['▉','x','x',   ,   ,   ,   ,   ,   ,   ,   ,   ,'x','x','▉'],
  ['▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉']
];

let maps = [{
  mapName: map0,
  softWall: {
    "background-image": "url('/img/wall_textures.png')",
    "background-position": "0 0"
  },
  hardWall: {
    "background-image": "url('/img/wall_textures.png')",
    "background-position": "20% 0"
  }
},
{
  mapName: map1,
  softWall: {
    "background-image": "url('/img/wall_textures.png')",
    "background-position": "40% 0"
  },
  hardWall: {
    "background-image": "url('/img/wall_textures.png')",
    "background-position": "60% 0"
  }
},
{
  mapName: map2,
  softWall: {
    "background-image": "url('/img/wall_textures.png')",
    "background-position": "80% 0"
  },
  hardWall: {
    "background-image": "url('/img/wall_textures.png')",
    "background-position": "100% 0"
  }
}];


export function mapEngine() {
  let randomMapNum = Math.floor(Math.random() * 3);
  let styleSheet = document.styleSheets[1];
  let softWall;
  let hardWall;
  for (let elem of styleSheet.cssRules) {
    if (elem.selectorText === ".softWall") {
      softWall = elem;
    } else if (elem.selectorText === ".solid-wall") {
      hardWall = elem;
    }
    if (softWall !== undefined && hardWall !== undefined) {
      break;
    }
  }
  map = maps[randomMapNum].mapName;
  softWall.style["background-image"] = maps[randomMapNum].softWall["background-image"];
  softWall.style["background-position"] = maps[randomMapNum].softWall["background-position"];
  hardWall.style["background-image"] = maps[randomMapNum].hardWall["background-image"];
  hardWall.style["background-position"] = maps[randomMapNum].hardWall["background-position"];
  console.log(softWall);
}
