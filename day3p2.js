const fs = require('fs');
const readStream = fs.createReadStream('day3input.txt');

let data;
let counter = 0;

readStream.on('data', (chunk) => {
  data = chunk.toString().split('\n');
});

readStream.on('end', () => {
  processData(data);
});

const processData = (data) => {
  data.forEach((datum, i) => {
    const triangle = cleanUp(datum);
    calculateSums(triangle);

    if (i == data.length - 1) {
      console.log(data.length - counter); // in calculateSums we check for how many are impossible triangles. subtract that from the total number of triangles
    }
  })
};

const cleanUp = (datum) => {
  if (datum) {
    return datum.split(' ').filter((el) => {
      return el != ''
    })      
  }
};

const calculateSums = (triangle) => {
  var pass = false; // to check if we should keep going in the current calculations
  var one, two, three; // these will hold the removed elements
  var triangleOne = triangle.slice(0,3), triangleTwo = triangle.slice(0,3), triangleThree = triangle.slice(0,3); // these will be manipulated

  one = parseInt(triangleOne.shift());
  two = parseInt(triangleTwo.pop());
  three = parseInt(triangleThree.splice(1, 1));

  const comparisons = [one, two, three];
  const calculations = [triangleOne, triangleTwo, triangleThree];

  calculations.forEach((numbers, i) => {
    const compareWith = comparisons[i];
    let sum = 0;

    if (pass == false) {
      sum = numbers.reduce(function(a,b) {
        return parseInt(a) + parseInt(b)
      })  

      if (sum <= compareWith) {
        counter += 1;
        pass = true;
      }
    };
  });
}