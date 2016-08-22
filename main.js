const Elevator = require('./src/Elevator');
const ElevatorAnalyzer = require('./src/ElevatorAnalyzer');
const ElevatorLogger = require('./src/ElevatorLogger');

const elevator = new Elevator(1);
const elevatorLogger = new ElevatorLogger(elevator);
const elevatorAnalyzer = new ElevatorAnalyzer(elevator);
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

newLine();
console.log('ACTUAL');
console.log(`Path: ${elevatorLogger.buildMovementString()}`);
console.log(`# floors passed: ${elevatorAnalyzer.numberOfFloorsPassed}`);
console.log(`# direction changes: ${elevatorAnalyzer.numberOfDirectionChanges}`);

function newLine() { console.log(' '); }