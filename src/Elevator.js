const ElevatorRouter = require('./ElevatorRouter');
const _ = require('lodash');

class Elevator {
  constructor(startingFloor = 1) {
    this._floorsVisited = [startingFloor];
  }

  get floorsVisited() {
    return this._floorsVisited;
  }

  get currentFloor() {
    return _.last(this._floorsVisited);
  }

  get currentDirection() {
    // default to going up if haven't moved yet
    if (this._floorsVisited.length < 2) return 'UP';

    const [lastFloor, currentFloor] = this._floorsVisited.slice(-2);

    return (currentFloor - lastFloor > 0) ? 'UP' : 'DOWN';
  }

  moveToFloor(requestedFloor) {
    this._floorsVisited.push(requestedFloor);
  }

  moveAlongSequence(sequence) {
    const elevatorRouter = new ElevatorRouter(this);
    const optimalSequence = elevatorRouter.optimizeSequence(sequence);
    optimalSequence.forEach(this.moveToFloor.bind(this));
  }

  moveAlongSequences(sequences) {
    sequences.forEach(this.moveAlongSequence.bind(this));
  }
}

module.exports = Elevator;