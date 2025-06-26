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

let solutionSteps = [];
let currentStep = 0;

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

function renderCubeFromState(faces) {
  container.innerHTML = '';
  for (const face in faces) {
    const { row, col } = facePositions[face];
    faces[face].forEach((color, i) => {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.style.backgroundColor = colorMap[color];
      tile.style.gridColumnStart = col + (i % 3) + 1;
      tile.style.gridRowStart = row + Math.floor(i / 3) + 1;
      container.appendChild(tile);
    });
  }
}

function updateNavigationButtons() {
  prevBtn.style.display = currentStep > 0 ? 'inline-block' : 'none';
  nextBtn.style.display = currentStep < solutionSteps.length - 1 ? 'inline-block' : 'none';
}

function updateStep(stepIndex) {
  if (stepIndex >= 0 && stepIndex < solutionSteps.length) {
    currentStep = stepIndex;
    renderCubeFromState(solutionSteps[stepIndex].faces);
    logOutput.textContent = `Step ${stepIndex}: ${solutionSteps[stepIndex].move}`;
    updateNavigationButtons();
  }
}

// Event Listeners
document.getElementById('shuffleBtn').addEventListener('click', () => {
  cube.reset();
  cube.scramble(20);
  renderCubeFromState(cube.faces);
  logOutput.textContent = cube.getMoveLog();
});

document.getElementById('solveBtn').addEventListener('click', () => {
  solutionSteps = cube.solveStepByStep();
  updateStep(0);
});

nextBtn.addEventListener('click', () => {
  updateStep(currentStep + 1);
});

prevBtn.addEventListener('click', () => {
  updateStep(currentStep - 1);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  cube.reset();
  solutionSteps = [];
  currentStep = 0;
  renderCubeFromState(cube.faces);
  logOutput.textContent = '-- Reset to Solved State --';

  // Hide buttons after reset
  nextBtn.style.display = 'none';
  prevBtn.style.display = 'none';
});

// Initial render
renderCubeFromState(cube.faces);
logOutput.textContent = '-- Ready --';
