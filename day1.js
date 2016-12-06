const fs = require('fs');
const readStream = fs.createReadStream('day1input.txt');

let steps;
let trackLocations = [];
let current = {
  dir: 'N',
  coord: {
    x: 0,
    y: 0
  }
};

readStream.on('data', function(chunk) {
  steps = chunk.toString().split(', ');
})

readStream.on('end', () => {
  calculateWalk(steps)
})

const calculateWalk = function(steps) {
  steps.forEach((step, index, arr) => {
    switch (current.dir) {
      case 'N':
        northWalk(step);
      break;
      case 'E':
        eastWalk(step);
      break;
      case 'S':
        southWalk(step);
      break;
      case 'W':
        westWalk(step);
      break;      
      default:
      console.log('What?');
      break;
    }

    // FOR PART TWO: Check for same location
    if (trackLocations.find(visited)) {
      console.log('Duplicate found at x: ' + current.coord.x + ', y: ' + current.coord.y)
    }

    function visited(location) {
      return location.x == current.coord.x && location.y == current.coord.y
    }

    trackLocations.push({
      x: current.coord.x,
      y: current.coord.y
    });
    
    if (index == arr.length - 1) {
      console.log('We are now at x: ' + current.coord.x + ', y: ' + current.coord.y)
    }

  })
};

const northWalk = function(step) {
  const direction = step[0];
  const amount = parseInt(step.slice(1));

  if (direction == 'L') {
    current.coord.x -= amount;
    current.dir = 'W';
  } else {
    current.coord.x += amount;
    current.dir = 'E';
  }
};

const eastWalk = function(step) {
  const direction = step[0];
  const amount = parseInt(step.slice(1));

  if (direction == 'L') {
    current.coord.y += amount;
    current.dir = 'N';
  } else {
    current.coord.y -= amount;
    current.dir = 'S';
  }
};

const southWalk = function(step) {
  const direction = step[0];
  const amount = parseInt(step.slice(1));

  if (direction == 'L') {
    current.coord.x += amount;
    current.dir = 'E';
  } else {
    current.coord.x -= amount;
    current.dir = 'W';
  }
};

const westWalk = function(step) {
  const direction = step[0];
  const amount = parseInt(step.slice(1));

  if (direction == 'L') {
    current.coord.y -= amount;
    current.dir = 'S';
  } else {
    current.coord.y += amount;
    current.dir = 'N';
  }
};