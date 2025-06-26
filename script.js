import { RubiksCube } from './RubiksCube.js';

const cube = new RubiksCube();
const container = document.getElementById('cube-container');
const logOutput = document.getElementById('move-log');

const facePositions = {
  U: { row: 0, col: 3 },
  L: { row: 3, col: 0 },
  F: { row: 3, col: 3 },
  R: { row: 3, col: 6 },
  B: { row: 3, col: 9 },
  D: { row: 6, col: 3 },
};

const colorMap = {
  r: '#ff3d3d', g: '#4caf50', b: '#2196f3',
  y: '#ffeb3b', o: '#ff9800', w: '#ffffff',
};

function renderCube() {
  container.innerHTML = '';
  for (const face in cube.faces) {
    const { row, col } = facePositions[face];
    cube.faces[face].forEach((color, i) => {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.style.backgroundColor = colorMap[color];
      tile.style.gridColumnStart = col + (i % 3) + 1;
      tile.style.gridRowStart = row + Math.floor(i / 3) + 1;
      container.appendChild(tile);
    });
  }
  logOutput.textContent = cube.getMoveLog();
}

document.getElementById('shuffleBtn').addEventListener('click', () => {
  cube.scramble(20);
  renderCube();
});

document.getElementById('mixBtn').addEventListener('click', () => {
  cube.reset();
  renderCube();
});

renderCube();
