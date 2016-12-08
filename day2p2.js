// credit to https://github.com/NiXXeD/adventofcode/blob/master/2016/day2/part2.js

const fs = require('fs');

let keypad = [
    [0, 0, 1, 0, 0],
    [0, 2, 3, 4, 0],
    [5, 6, 7, 8, 9],
    [0, 'A', 'B', 'C', 0],
    [0, 0, 'D', 0, 0]
]

fs.readFile('day2input.txt', 'utf8', (err, data) => {
  if (err) throw err;
  const codes = data.split('\n');
  let pos = [2, 0];

  let answer = codes.map(line => {
    // line is each line of letters in string form, which we need to split in order to use reduce (on the array)
    return line.split('').reduce((a, b) => {
      // a is the coordinate of the previous position, b is the next letter
      let n = [a[0], a[1]]
      // n is the placeholder for where the next position on the keypad would be
      if (b === 'U') n[0] = a[0] - 1 // we go back up (lower) the matrix
      else if (b === 'D') n[0] = a[0] + 1 // we go down (higher) the matrix
      else if (b === 'L') n[1] = a[1] - 1
      else if (b === 'R') n[1] = a[1] + 1
        // check if the new coordinates in n make sense - if they are invalid they will return
        // undefined, and the following if statement will return true. Don't change n ie set it back to the last position
      if ( !keypad[n[0]] || !keypad[n[0]][n[1]]) n = a
        // n becomes the new accumulator, which is either the previous value or a new one
      return n
    }, pos);
  }) // answer returns the set of coords cooresponding to the numbers/letters
  .map(coords => keypad[ coords[0] ][ coords[1] ])

  console.log(answer)
})