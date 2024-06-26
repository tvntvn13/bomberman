// map is the default level design, the '▉' characters are solid walls,
// the 'x' characters are the starting points and the neighbouring areas,
// 'W' are the default soft walls, so the player is walled in/protected at the start
export let map = [
  ['▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉'],
  ['▉', 'x', 'x', 'W', null, null, null, null, null, null, null, 'W', 'x', 'x', '▉'],
  ['▉', 'x', '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', 'x', '▉'],
  ['▉', 'x', 'W', null, null, null, null, null, null, null, null, null, 'W', 'x', '▉'],
  ['▉', 'W', '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', 'W', '▉'],
  ['▉', null, null, null, null, null, null, null, null, null, null, null, null, null, '▉'],
  ['▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉'],
  ['▉', null, null, null, null, null, null, null, null, null, null, null, null, null, '▉'],
  ['▉', 'W', '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', 'W', '▉'],
  ['▉', 'x', 'W', null, null, null, null, null, null, null, null, null, 'W', 'x', '▉'],
  ['▉', 'x', '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', 'x', '▉'],
  ['▉', 'x', 'x', 'W', null, null, null, null, null, null, null, 'W', 'x', 'x', '▉'],
  ['▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉'],
];

let map0 = [
  ['▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉'],
  ['▉', 'x', 'x', 'W', null, null, null, null, null, null, null, 'W', 'x', 'x', '▉'],
  ['▉', 'x', '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', 'x', '▉'],
  ['▉', 'x', 'W', null, null, null, null, null, null, null, null, null, 'W', 'x', '▉'],
  ['▉', 'W', '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', 'W', '▉'],
  ['▉', null, null, null, null, null, null, null, null, null, null, null, null, null, '▉'],
  ['▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉'],
  ['▉', null, null, null, null, null, null, null, null, null, null, null, null, null, '▉'],
  ['▉', 'W', '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', 'W', '▉'],
  ['▉', 'x', 'W', null, null, null, null, null, null, null, null, null, 'W', 'x', '▉'],
  ['▉', 'x', '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', 'x', '▉'],
  ['▉', 'x', 'x', 'W', null, null, null, null, null, null, null, 'W', 'x', 'x', '▉'],
  ['▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉'],
];

let map1 = [
  ['▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉'],
  ['▉', 'x', 'x', 'W', null, null, null, null, null, null, null, 'W', 'x', 'x', '▉'],
  ['▉', 'x', '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', 'x', '▉'],
  ['▉', 'x', 'W', '▉', null, null, null, '▉', null, null, null, '▉', 'W', 'x', '▉'],
  ['▉', 'W', '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', 'W', '▉'],
  ['▉', null, null, null, null, null, null, null, null, null, null, null, null, null, '▉'],
  ['▉', null, '▉', '▉', '▉', null, '▉', '▉', '▉', null, '▉', '▉', '▉', null, '▉'],
  ['▉', null, null, null, null, null, null, null, null, null, null, null, null, null, '▉'],
  ['▉', 'W', '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', 'W', '▉'],
  ['▉', 'x', 'W', '▉', null, null, null, '▉', null, null, null, '▉', 'W', 'x', '▉'],
  ['▉', 'x', '▉', null, '▉', null, '▉', null, '▉', null, '▉', null, '▉', 'x', '▉'],
  ['▉', 'x', 'x', 'W', null, null, null, null, null, null, null, 'W', 'x', 'x', '▉'],
  ['▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉'],
];

let map2 = [
  ['▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉'],
  ['▉', 'x', 'x', 'W', null, null, null, null, null, null, null, 'W', 'x', 'x', '▉'],
  ['▉', 'x', '▉', '▉', '▉', '▉', '▉', null, '▉', '▉', '▉', '▉', '▉', 'x', '▉'],
  ['▉', 'x', 'W', null, '▉', null, null, null, '▉', null, null, null, '▉', 'x', '▉'],
  ['▉', 'W', null, null, '▉', null, null, null, '▉', null, null, null, '▉', 'W', '▉'],
  ['▉', null, null, null, '▉', null, null, null, null, null, null, null, '▉', null, '▉'],
  ['▉', null, null, null, '▉', null, null, null, '▉', null, null, null, '▉', null, '▉'],
  ['▉', null, null, null, null, null, null, null, '▉', null, null, null, '▉', null, '▉'],
  ['▉', 'W', null, null, '▉', null, null, null, '▉', null, null, null, '▉', 'W', '▉'],
  ['▉', 'x', 'W', null, '▉', null, null, null, '▉', null, null, null, 'W', 'x', '▉'],
  ['▉', 'x', '▉', '▉', '▉', null, '▉', '▉', '▉', null, '▉', '▉', '▉', 'x', '▉'],
  ['▉', 'x', 'x', 'W', null, null, null, null, null, null, null, 'W', 'x', 'x', '▉'],
  ['▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉'],
];

let maps = [
  {
    'background-color': 'cyan',
    mapName: map0,
    softWall: {
      'background-image': "url('/img/wall_textures.png')",
      'background-position': '0 0',
    },
    hardWall: {
      'background-image': "url('/img/wall_textures.png')",
      'background-position': '20% 0',
    },
  },
  {
    'background-color': 'green',
    mapName: map1,
    softWall: {
      'background-image': "url('/img/wall_textures.png')",
      'background-position': '40% 0',
    },
    hardWall: {
      'background-image': "url('/img/wall_textures.png')",
      'background-position': '60% 0',
    },
  },
  {
    'background-color': 'grey',
    mapName: map2,
    softWall: {
      'background-image': "url('/img/wall_textures.png')",
      'background-position': '80% 0',
    },
    hardWall: {
      'background-image': "url('/img/wall_textures.png')",
      'background-position': '100% 0',
    },
  },
];

export function mapEngine() {
  let randomMapNum = Math.floor(Math.random() * 3);
  let styleSheet = document.styleSheets[1];
  let softWall;
  let hardWall;
  let gridContainer;
  for (let elem of styleSheet.cssRules) {
    if (elem.selectorText === '.softWall') {
      softWall = elem;
    } else if (elem.selectorText === '.solid-wall') {
      hardWall = elem;
    } else if (elem.selectorText === '.grid-container') {
      gridContainer = elem;
    }
    if (softWall !== undefined && hardWall !== undefined && gridContainer !== undefined) {
      break;
    }
  }
  gridContainer.style['background-color'] = maps[randomMapNum]['background-color'];
  map = maps[randomMapNum].mapName;
  softWall.style['background-image'] = maps[randomMapNum].softWall['background-image'];
  softWall.style['background-position'] = maps[randomMapNum].softWall['background-position'];
  hardWall.style['background-image'] = maps[randomMapNum].hardWall['background-image'];
  hardWall.style['background-position'] = maps[randomMapNum].hardWall['background-position'];
  console.log(softWall);
}
