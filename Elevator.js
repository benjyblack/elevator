const ElevatorRouter = require('./ElevatorRouter');
const _ = require('lodash');

class Elevator {
  constructor(isGoingUp = true, currentFloor = 1) {
    this.isGoingUp = isGoingUp;
    this.currentFloor = currentFloor;

    this.movementHistory = [currentFloor];
  }

  moveToFloor(requestedFloor) {
    const floorDistance = this.currentFloor - requestedFloor;

    if (floorDistance === 0) return;

    this.isGoingUp = floorDistance < 0;
    this.currentFloor = requestedFloor;
    this.movementHistory.push(requestedFloor);
  }

  moveAlongSequence(sequence) {
    const elevatorRouter = new ElevatorRouter(this);
    const optimalSequence = elevatorRouter.optimizeSequence(sequence);
    optimalSequence.forEach(this.move);
  }

  moveAlongSequences(sequences) {
    sequences.forEach(moveAlongSequence);
  }

  numberOfFloorsPassed() {
    if (this.movementHistory.length === 1) return 0;

    return this.movementHistory.reduce((totalFloorsPassed, nextFloor, idx, movements) => {
      if (idx === 0) return totalFloorsPassed;
      return totalFloorsPassed + Math.abs(nextFloor - movements[idx - 1])
    }, 0);
  }

  numberOfDirectionChanges() {
    // can't have changed direction if has only moved one floor
    if (this.movementHistory.length <= 2) return 0;

    return this.movementHistory.reduce((totalDirectionChanges, nextFloor, idx, movements) => {
      if (idx < 2) return totalDirectionChanges;

      const currentFloor = movements[idx - 1];
      const lastFloor = movements[idx - 2];

      return _.inRange(currentFloor, lastFloor, nextFloor) ?
        totalDirectionChanges :
        totalDirectionChanges + 1;
    }, 0);
  }
}

module.exports = Elevator;