
// template is the default level design, the '▉' characters are solid walls, the 'x' characters are the starting points and the neighbouring areas
const template = [
    ['▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉'],
    ['▉', 'x', 'x', , , , , , , , , , 'x', 'x', '▉'],
    ['▉', 'x', '▉', , '▉', , '▉', , '▉', , '▉', , '▉', 'x', '▉'],
    ['▉', 'x', , , , , , , , , , , , 'x', '▉'],
    ['▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉'],
    ['▉', , , , , , , , , , , , , , '▉'],
    ['▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉'],
    ['▉', , , , , , , , , , , , , , '▉'],
    ['▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉', , '▉'],
    ['▉', 'x', , , , , , , , , , , , 'x', '▉'],
    ['▉', 'x', '▉', , '▉', , '▉', , '▉', , '▉', , '▉', 'x', '▉'],
    ['▉', 'x', 'x', , , , , , , , , , 'x', 'x', '▉'],
    ['▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉', '▉']
];

export function drawMap(templ=template) {
    let game = document.getElementById('game');
    let mainMap = document.createElement('div');
    mainMap.className = 'grid-container';
    mainMap.id = 'mainMap';
    for (let i = 0; i < templ.length; i++) {
        for (let j = 0; j < templ[i].length; j++) {
            let mapBlock = document.createElement('div');
            mapBlock.className = 'grid-item';
            mapBlock.id = `block-${j}:${i}`;
            if (templ[i][j] === '▉') {
                mapBlock.classList.add('solid-wall');
            } else if (templ[i][j] === 'x') {
                mapBlock.classList.add('starting-point');
            } else if (templ[i][j] === undefined) {
                mapBlock.classList.add('empty-field');
            }
            mapBlock.innerHTML = templ[i][j] === undefined ? ' ' : templ[i][j];
            mainMap.append(mapBlock);
        }
    }
    game.append(mainMap);
}