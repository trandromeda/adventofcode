const fs = require('fs');

fs.readFile('day4input.txt', 'utf8', (err, data) => {
  if (err) throw err;
  const codes = data.split('\n');
  process(codes);
})

let slider = {}
let sum = 0;

// example object:
// {
//   a: 1,
//   b: 2,
//   c: 5,
//   h: 3
// }

const process = (codes) => {
  // go through each line

  codes.forEach((line, i, arr) => {
    const checksum = line.slice(-6, -1);
    const letters = line.slice(0, -11);
    const sectorId = line.slice(-10, -7)

    countLetters(letters, checksum, sectorId);

    if (i == arr.length - 1) console.log(sum);
  })
}

const countLetters = (letters, checksum, sectorId) => {
  const arrayOfLetters = letters.split('');

  // this function returns an object with a count of each letter
  let count = arrayOfLetters.reduce((acc, letter, i, arr) => {
    if (acc[letter] >= 0) {
      acc[letter] += 1
    } else if (letter != '-') {
      acc[letter] = 1
    }
    return acc;
  }, slider)

  let sortedCount = sort(count)
  // let str = sortedCount[0][0] + sortedCount[1][0] + sortedCount[2][0] + sortedCount[3][0] + sortedCount[4][0]

  // console.log(sortedCount)
  // if (str == checksum) sum += parseInt(sectorId);
}


const sort = (count) => {
  let sortable = [];

  for (key in count) {
    sortable.push([key + count[key]])
    // sort numerically
    // sortable.sort(function(a,b) {
    //   return b[1] - a[1]
    // })
  }

  // sortable is now sorted by number, go through and sort each common pair in order to sort by letter
  // [ 'f', 1 ]
  // [ 'a', 1 ]
  // [ 'z', 1 ]

  // sortable.sort((a,b) => {
  //   // look at the count
  //   // if they are the same, organize alphabetically
  //   // if the first letter is 'smaller' than the next letter, return -1 so it goes on the left
  //   if ( a[0] < b[0] && a[1] == b[1] ) {
  //     return -1
  //   } else if ( a[0] > b[0] && a[1] == b[1] ) {
  //     return 1
  //   } else {
  //     return 0
  //   }
  // })


var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;
function sortAlphaNum(d1,d2) {
  let a = d1[0]
  let b = d2[0];

  var aA = a.replace(reA, "");
  var bA = b.replace(reA, "");

  var aN = parseInt(a.replace(reN, ""), 10);
  var bN = parseInt(b.replace(reN, ""), 10);

  if(aN === bN) {
      return aA === bA ? 0 : aA > bA ? 1 : -1;
  } else {
      return aN < bN ? 1 : -1;
  }
}

sortable.sort(sortAlphaNum)
console.log(sortable)
  return sortable;
}


    // sort alphabetically
    // sortable.sort(function(a,b) {
    //   if (b[0] < a[0]) return 1
    //   if (b[0] > a[0]) return -1
    // })