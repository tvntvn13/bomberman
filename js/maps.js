// map is the default level design, the '▉' characters are solid walls,
// the 'x' characters are the starting points and the neighbouring areas,
// 'W' are the default soft walls, so the player is walled in/protected at the start
export let map1 = [
  ["▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉"],
  ["▉", "x", "x", "W", , , , , , , , "W", "x", "x", "▉"],
  ["▉", "x", "▉", , "▉", , "▉", , "▉", , "▉", , "▉", "x", "▉"],
  ["▉", "x", "W", , , , , , , , , , "W", "x", "▉"],
  ["▉", "W", "▉", , "▉", , "▉", , "▉", , "▉", , "▉", "W", "▉"],
  ["▉", , , , , , , , , , , , , , "▉"],
  ["▉", , "▉", , "▉", , "▉", , "▉", , "▉", , "▉", , "▉"],
  ["▉", , , , , , , , , , , , , , "▉"],
  ["▉", "W", "▉", , "▉", , "▉", , "▉", , "▉", , "▉", "W", "▉"],
  ["▉", "x", "W", , , , , , , , , , "W", "x", "▉"],
  ["▉", "x", "▉", , "▉", , "▉", , "▉", , "▉", , "▉", "x", "▉"],
  ["▉", "x", "x", "W", , , , , , , , "W", "x", "x", "▉"],
  ["▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉", "▉"],
];

export let map = [
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
export function changeField() {
  let styleSheet = document.styleSheets[1];
  let softWall;
  let hardWall;
  console.log(styleSheet);
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
  softWall.style["background-image"] = "url('/img/wall_textures.png')";
  softWall.style["background-position"] = "0 0";
  hardWall.style["background-image"] = "url('/img/wall_textures.png')";
  hardWall.style["background-position"] = "20% 0";
  console.log(softWall);
}
