const _ = require('lodash');

class ElevatorRouter {
  constructor({ isGoingUp, currentFloor }) {
    this.isGoingUp = isGoingUp;
    this.currentFloor = currentFloor;
  }

  optimizeSequence(sequence) {
    return _.chain(sequence)
      .without(this.currentFloor)
      .partition(requestedFloor => {
        if (this.isGoingUp) {
          return requestedFloor > this.currentFloor;
        } else {
          return requestedFloor < this.currentFloor;
        }
      })
      .map(floorsInDirection => {
        return _.sortBy(floorsInDirection, floor => {
          if (floor > this.currentFloor) return floor;
          else return -floor;
        });
      })
      .flatten()
      .value();
  }
}

module.exports = ElevatorRouter;