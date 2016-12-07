const fs = require('fs');

fs.readFile('day2input.txt', 'utf8', (err, data) => {
  if (err) throw err;
  const codes = data.split('\n');
  process(codes);
})

let pos = {x: 2, y: 2}
const maX = 3, maY = 3, miX = 0, miY = 0;

const process = (codes) => {
  // read each line
  codes.forEach((code, i, arr) => {
    // read each letter
    for (let i = 0; i < code.length; i++) {
      // line is finished
      if (i == code.length - 1) {
        step(code[i], true);
      } else {
        step(code[i], false);
      }
    }
  })
}

const step = (letter, bool) => {
  // do something with the letters
  switch (letter) {
  case 'U':
    if (pos.y < 3) pos.y += 1
  break;
  case 'D':
    if (pos.y > 1) pos.y -= 1
  break;
  case 'L':
    if (pos.x > 1) pos.x -= 1
  break;
  case 'R':
    if (pos.x < 3) pos.x += 1
  break;
  }

  if (bool) {
    console.log(pos);
  }
}

// 3 123
// 2 456
// 1 789
// 0 123