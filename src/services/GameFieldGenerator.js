export default class GameFieldGenerator {

  getRand(range) {
    return Math.floor(Math.random() * range);
  }

  countCellsToOpen(array) {
    return array.reduce((acc, el) => {
      return acc + el.filter(cell => cell.value !== 'b').length;
    }, 0)
  }

  generateField(cols, rows, difficulty) {
    const field = [];

    for (let i = 0; i < cols; i++) {
      field[i] = [];
      for (let j = 0; j < rows; j++) {
        field[i][j] = { value: 0, open: false, marked: false };
      }
    }
    const diff = difficulty === 1 ? 0.14 : (difficulty === 2 ? 0.19 : 0.24);

    const bombNumber = Math.floor(cols * rows * diff);

    for (let i = 0; i < bombNumber; i++) {
      const c = this.getRand(cols);
      const r = this.getRand(rows);

      if (field[c][r].value !== 'b') {
        field[c][r].value = 'b';
        const leftCol = c > 0;
        const rightCol = c < cols - 1;
        const topRow = r > 0;
        const bottomRow = r < rows - 1;

        if (leftCol) {
          if (topRow && !isNaN(field[c - 1][r - 1].value)) {
            field[c - 1][r - 1].value += 1;
          }
          if (!isNaN(field[c - 1][r].value)) {
            field[c - 1][r].value += 1;
          }
          if (bottomRow && !isNaN(field[c - 1][r + 1].value)) {
            field[c - 1][r + 1].value += 1;
          }
        }

        if (topRow && !isNaN(field[c][r - 1].value)) {
          field[c][r - 1].value += 1;
        }
        if (bottomRow && !isNaN(field[c][r + 1].value)) {
          field[c][r + 1].value += 1;
        }

        if (rightCol) {
          if (topRow && !isNaN(field[c + 1][r - 1].value)) {
            field[c + 1][r - 1].value += 1;
          }
          if (!isNaN(field[c + 1][r].value)) {
            field[c + 1][r].value += 1;
          }
          if (bottomRow && !isNaN(field[c + 1][r + 1].value)) {
            field[c + 1][r + 1].value += 1;
          }
        }
      }
    }

    return { field: field, startGame: true, allCells: this.countCellsToOpen(field) };
  }

}
