const _ = require('lodash');

class ElevatorRouter {
  constructor(elevator) {
    this.elevator = elevator;
  }

  optimizeSequence(sequence) {
    return _.chain(sequence)
      .without(this.elevator.currentFloor)
      .partition(requestedFloor =>
        this.elevator.currentDirection === 'UP' ?
          requestedFloor > this.elevator.currentFloor :
          requestedFloor < this.elevator.currentFloor
      )
      .flatMap(floorsInDirection =>
        _.sortBy(floorsInDirection, floor => floor > this.elevator.currentFloor ? floor : -floor)
      )
      .value();
  }
}

module.exports = ElevatorRouter;