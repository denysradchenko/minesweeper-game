export default class GameFieldGenerator {

  getRand(range) {
    return Math.floor(Math.random() * range);
  }

  generateField(cols, rows, difficulty) {
    const field = new Array(cols)
    for (let i = 0; i < field.length; i++) {
      field[i] = new Array(rows).fill(0);
    }

    const diff = difficulty === 1 ? 0.10 : (difficulty === 2 ? 0.14 : 0.19);

    const bombNumber = Math.floor(cols * rows * diff);

    for (let i = 0; i < bombNumber; i++) {
      const c = this.getRand(cols);
      const r = this.getRand(rows);
      if (field[c][r] === 0) {
        field[c][r] = 'b';
        // debugger;
        if (typeof field[c - 1] !== 'undefined' && typeof field[c - 1][r - 1] != 'undefined') field[c - 1][r - 1] += 1;
        if (typeof field[c] !== 'undefined' && typeof field[c][r - 1] !== 'undefined') field[c][r - 1] += 1;
        if (typeof field[c + 1] !== 'undefined' && typeof field[c + 1][r - 1] !== 'undefined') field[c + 1][r - 1] += 1;
        if (typeof field[c - 1] !== 'undefined' && typeof field[c - 1][r] !== 'undefined') field[c - 1][r] += 1;
        if (typeof field[c + 1] !== 'undefined' && typeof field[c + 1][r] !== 'undefined') field[c + 1][r] += 1;
        if (typeof field[c - 1] !== 'undefined' && typeof field[c - 1][r + 1] !== 'undefined') field[c - 1][r + 1] += 1;
        if (typeof field[c] !== 'undefined' && typeof field[c][r + 1] !== 'undefined') field[c][r + 1] += 1;
        if (typeof field[c + 1] !== 'undefined' && typeof field[c + 1][r + 1] !== 'undefined') field[c + 1][r + 1] += 1;
      } else {
        i--
      }
    }



    return field;
  }

}
