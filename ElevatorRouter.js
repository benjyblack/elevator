const _ = require('lodash');

class ElevatorRouter {
  constructor({ isGoingUp, currentFloor }) {
    this.isGoingUp = isGoingUp;
    this.currentFloor = currentFloor;
  }

  optimizeSequence(sequence) {
    return _.chain(sequence)
      .without(this.currentFloor)
      .partition(requestedFloor =>
        this.isGoingUp ?
          requestedFloor > this.currentFloor :
          requestedFloor < this.currentFloor
      )
      .flatMap(floorsInDirection =>
        _.sortBy(floorsInDirection, floor => floor > this.currentFloor ? floor : -floor)
      )
      .value();
  }
}

module.exports = ElevatorRouter;