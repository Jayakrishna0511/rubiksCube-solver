export class RubiksCube {
  constructor() {
    this.reset();
  }

  reset() {
    this.faces = {
      U: Array(9).fill('w'),
      D: Array(9).fill('y'),
      F: Array(9).fill('g'),
      B: Array(9).fill('b'),
      L: Array(9).fill('o'),
      R: Array(9).fill('r'),
    };
    this.moveLog = ['-- Reset to Solved State --'];
    this.scrambleMoves = [];
  }

  rotateFaceClockwise(face) {
    const f = this.faces[face];
    this.faces[face] = [
      f[6], f[3], f[0],
      f[7], f[4], f[1],
      f[8], f[5], f[2],
    ];
  }

  rotate(face) {
    this[`rotate${face}`]();
    this.moveLog.push(face);
    this.scrambleMoves.push(face);
  }

  rotateF() {
    this.rotateFaceClockwise('F');
    const { U, R, D, L } = this.faces;
    [U[6], U[7], U[8], L[2], L[5], L[8], D[2], D[1], D[0], R[0], R[3], R[6]] =
    [L[8], L[5], L[2], D[2], D[1], D[0], R[6], R[3], R[0], U[6], U[7], U[8]];
  }

  rotateB() {
    this.rotateFaceClockwise('B');
    const { U, R, D, L } = this.faces;
    [U[0], U[1], U[2], R[2], R[5], R[8], D[8], D[7], D[6], L[6], L[3], L[0]] =
    [R[2], R[5], R[8], D[8], D[7], D[6], L[6], L[3], L[0], U[0], U[1], U[2]];
  }

  rotateU() {
    this.rotateFaceClockwise('U');
    const { B, R, F, L } = this.faces;
    [B[0], B[1], B[2], R[0], R[1], R[2], F[0], F[1], F[2], L[0], L[1], L[2]] =
    [R[0], R[1], R[2], F[0], F[1], F[2], L[0], L[1], L[2], B[0], B[1], B[2]];
  }

  rotateD() {
    this.rotateFaceClockwise('D');
    const { B, R, F, L } = this.faces;
    [B[6], B[7], B[8], L[6], L[7], L[8], F[6], F[7], F[8], R[6], R[7], R[8]] =
    [L[6], L[7], L[8], F[6], F[7], F[8], R[6], R[7], R[8], B[6], B[7], B[8]];
  }

  rotateL() {
    this.rotateFaceClockwise('L');
    const { U, F, D, B } = this.faces;
    [U[0], U[3], U[6], F[0], F[3], F[6], D[0], D[3], D[6], B[8], B[5], B[2]] =
    [F[0], F[3], F[6], D[0], D[3], D[6], B[8], B[5], B[2], U[0], U[3], U[6]];
  }

  rotateR() {
    this.rotateFaceClockwise('R');
    const { U, F, D, B } = this.faces;
    [U[2], U[5], U[8], B[6], B[3], B[0], D[2], D[5], D[8], F[2], F[5], F[8]] =
    [F[2], F[5], F[8], U[2], U[5], U[8], B[6], B[3], B[0], D[2], D[5], D[8]];
  }

  scramble(times = 20) {
    this.scrambleMoves = [];
    const moves = ['F', 'B', 'U', 'D', 'L', 'R'];
    for (let i = 0; i < times; i++) {
      const move = moves[Math.floor(Math.random() * moves.length)];
      this.rotate(move);
    }
    this.moveLog.push('-- Scrambled --');
  }

  solveStepByStep() {
    const reverseMoves = this.scrambleMoves.slice().reverse().map(move => ({
      face: move,
      turns: 3
    }));

    const solutionSteps = [{ faces: this.cloneFaces(), move: 'Start' }];
    reverseMoves.forEach(({ face, turns }) => {
      for (let i = 0; i < turns; i++) {
        this.rotate(face);
      }
      solutionSteps.push({ faces: this.cloneFaces(), move: face + "'" });
    });

    return solutionSteps;
  }

  cloneFaces() {
    return JSON.parse(JSON.stringify(this.faces));
  }

  getMoveLog() {
    return this.moveLog.join('\n');
  }
}
