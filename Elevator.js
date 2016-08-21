const ElevatorRouter = require('./ElevatorRouter');

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

    return this.movementHistory.reduce((totalFloorsPassed, nextFloor, idx, arr) => {
      if (idx === 0) return totalFloorsPassed;
      return totalFloorsPassed + Math.abs(nextFloor - arr[idx - 1])
    }, 0);
  }

  numberOfDirectionChanges() {
    if (this.movementHistory.length < 3) return 0;

    return this.movementHistory.reduce((totalDirectionChanges, nextFloor, idx, arr) => {
      if (idx < 2) return totalDirectionChanges;

      const lastFloor = arr[idx - 1];
      const hasBeenGoingUp = lastFloor - arr[idx - 2] > 0;
      const nextFloorIsAboveLastFloor = (nextFloor - lastFloor) > 0;

      if (hasBeenGoingUp && !nextFloorIsAboveLastFloor) return totalDirectionChanges + 1;
      if (!hasBeenGoingUp && nextFloorIsAboveLastFloor) return totalDirectionChanges + 1;

      return totalDirectionChanges;
    }, 0);
  }
}

module.exports = Elevator;