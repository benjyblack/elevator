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

  get numberOfFloorsPassed() {
    if (this._floorsVisited.length === 1) return 0;

    return this._floorsVisited.reduce((totalFloorsPassed, nextFloor, idx, movements) => {
      if (idx === 0) return totalFloorsPassed;
      return totalFloorsPassed + Math.abs(nextFloor - movements[idx - 1])
    }, 0);
  }

  get numberOfDirectionChanges() {
    // can't have changed direction if has only moved one floor
    if (this._floorsVisited.length <= 2) return 0;

    return this._floorsVisited.reduce((totalDirectionChanges, nextFloor, idx, movements) => {
      if (idx < 2) return totalDirectionChanges;

      const currentFloor = movements[idx - 1];
      const lastFloor = movements[idx - 2];

      return _.inRange(currentFloor, lastFloor, nextFloor) ?
        totalDirectionChanges :
        totalDirectionChanges + 1;
    }, 0);
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