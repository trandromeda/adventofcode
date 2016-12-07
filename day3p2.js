const fs = require('fs');
const readStream = fs.createReadStream('day3input.txt');

let data;
let convertedData;
let counter = 0;

readStream.on('data', (chunk) => {
  data = chunk.toString().split('\n');
});

readStream.on('end', () => {
  processData();
});

const processData = () => {
  let tri = [];
  var cleanData = data.map((d) => {
    return d.trim();
  })

  cleanData.forEach((datum, i) => {
    if (tri.length % 3 != 0 && tri.length < 3 || tri.length < 3) {
      tri.push(datum.trim().split('  '));
    }

    if (tri.length == 3) {
      processMatrix(tri);
      tri = [];
    }

    if (i == data.length - 1) {
      console.log(counter); // in calculateSums we check for how many are impossible triangles. subtract that from the total number of triangles
    }
  })
};

// example:
// [ [ '810', '679', ' 10' ],
//   [ '783', '255', '616' ],
//   [ '545', '626', '626' ] ]

const processMatrix = (data) => {
  var trinity = data.map(function(d) {
    return cleanUp(d)
  })

  const tri = trinity;

  for (let i = 0; i < tri.length; i++) {
    let triangle = [tri[0][i], tri[1][i], tri[2][i]]
    calculateSums(triangle);
  }

}

const cleanUp = (datum) => {
  const data = datum.map(function(d) {
    return d.trim();
  })

  return data.filter((el) => {
    return el != ''
  })      
};

const calculateSums = (data) => {
  const triangle = data.map(function(d) {
    return parseInt(d);
  })

  let sum = triangle[0] + triangle[1] + triangle[2];
  let max = Math.max(Math.max(triangle[0], triangle[1]), triangle[2]);
  if (sum - max > max) {
      counter++;
  }
}