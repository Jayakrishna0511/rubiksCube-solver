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
  }

  rotateFaceClockwise(face) {
    const f = this.faces[face];
    this.faces[face] = [
      f[6], f[3], f[0],
      f[7], f[4], f[1],
      f[8], f[5], f[2],
    ];
  }

  rotateF() {
    this.rotateFaceClockwise('F');
    const { U, R, D, L } = this.faces;
    const [u6, u7, u8] = [U[6], U[7], U[8]];
    [U[6], U[7], U[8]] = [L[8], L[5], L[2]];
    [L[2], L[5], L[8]] = [D[2], D[1], D[0]];
    [D[0], D[1], D[2]] = [R[6], R[3], R[0]];
    [R[0], R[3], R[6]] = [u6, u7, u8];
    this.moveLog.push('F');
  }

  rotateU() {
    this.rotateFaceClockwise('U');
    const { B, R, F, L } = this.faces;
    const [b0, b1, b2] = [B[0], B[1], B[2]];
    [B[0], B[1], B[2]] = [R[0], R[1], R[2]];
    [R[0], R[1], R[2]] = [F[0], F[1], F[2]];
    [F[0], F[1], F[2]] = [L[0], L[1], L[2]];
    [L[0], L[1], L[2]] = [b0, b1, b2];
    this.moveLog.push('U');
  }

  rotateR() {
    this.rotateFaceClockwise('R');
    const { U, F, D, B } = this.faces;
    const [u2, u5, u8] = [U[2], U[5], U[8]];
    [U[2], U[5], U[8]] = [F[2], F[5], F[8]];
    [F[2], F[5], F[8]] = [D[2], D[5], D[8]];
    [D[2], D[5], D[8]] = [B[6], B[3], B[0]];
    [B[0], B[3], B[6]] = [u2, u5, u8];
    this.moveLog.push('R');
  }

  scramble(times = 20) {
    const moves = ['F', 'U', 'R'];
    for (let i = 0; i < times; i++) {
      const move = moves[Math.floor(Math.random() * moves.length)];
      this[`rotate${move}`]();
    }
    this.moveLog.push('-- Scrambled --');
  }

  getFaceColors() {
    return Object.values(this.faces).flat();
  }

  getMoveLog() {
    return this.moveLog.join('\n');
  }
}
