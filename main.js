const Elevator = require('./Elevator');

const elevator = new Elevator(true, 1);
const sequences = [
  [1,2,7,3],
  [],
  [2,3,9,1],
  [5,4,6]
];

console.log('EXPECTED');
console.log('Path: 1 -> 2 -> 3 -> 7 -> 9 -> 3 -> 2 -> 1 -> 4 -> 5 -> 6');
console.log('# floors passed: 21');
console.log('# direction changes: 2');

elevator.moveAlongSequences(sequences);

const movementString = elevator.movementHistory.reduce((movementString, nextMovement, idx, arr) => {
  const updatedMovementString = movementString + `${nextMovement}`;
  return (idx < arr.length - 1) ?
    `${updatedMovementString} -> ` :
    `${updatedMovementString}`;
}, '');

newLine();
newLine();
console.log('ACTUAL');
console.log(`Path: ${movementString}`);
console.log(`# floors passed: ${elevator.numberOfFloorsPassed()}`);
console.log(`# direction changes: ${elevator.numberOfDirectionChanges()}`);

function newLine() { console.log(' '); }