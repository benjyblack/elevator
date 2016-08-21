class ElevatorLogger {
  constructor(elevator) {
    this.elevator = elevator;
  }

  buildMovementString() {
    return this.elevator.floorsVisited.reduce((movementString, nextMovement, idx, arr) => {
      const updatedMovementString = movementString + `${nextMovement}`;
      return (idx < arr.length - 1) ?
        `${updatedMovementString} -> ` :
        `${updatedMovementString}`;
    }, '');
  }
}

module.exports = ElevatorLogger;