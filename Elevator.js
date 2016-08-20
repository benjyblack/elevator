class Elevator {
  constructor(currentDirection = 'UP', currentFloor = 1) {
    this.currentDirection = currentDirection;
    this.currentFloor = currentFloor;
  }

  moveToFloor(requestedFloor) {
    const floorDistance = this._calculateFloorDistance(requestedFloor);

    this.currentDirection = this._getDirectionFromMovement(floorDistance);
    this.currentFloor = requestedFloor;
  }

  _calculateFloorDistance(requestedFloor) {
    return this.currentFloor - requestedFloor;
  }

  _getDirectionFromMovement(movementValue) {
    return movementValue < 0 ? 'UP' : 'DOWN';
  }
}

module.exports = Elevator;