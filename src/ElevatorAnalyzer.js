const _ = require('lodash');

class ElevatorAnalyzer {
  constructor(elevator) {
    this.elevator = elevator;
  }

  get numberOfFloorsPassed() {
    if (this.elevator.floorsVisited.length === 1) return 0;

    return this.elevator.floorsVisited.reduce((totalFloorsPassed, nextFloor, idx, movements) => {
      if (idx === 0) return totalFloorsPassed;
      return totalFloorsPassed + Math.abs(nextFloor - movements[idx - 1])
    }, 0);
  }

  get numberOfDirectionChanges() {
    // can't have changed direction if has only moved one floor
    if (this.elevator.floorsVisited.length <= 2) return 0;

    return this.elevator.floorsVisited.reduce((totalDirectionChanges, nextFloor, idx, movements) => {
      if (idx < 2) return totalDirectionChanges;

      const currentFloor = movements[idx - 1];
      const lastFloor = movements[idx - 2];

      return _.inRange(currentFloor, lastFloor, nextFloor) ?
        totalDirectionChanges :
        totalDirectionChanges + 1;
    }, 0);
  }
}

module.exports = ElevatorAnalyzer;