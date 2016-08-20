const Elevator = require('./Elevator');
const _ = require('lodash');

class ElevatorOperator {
  constructor(elevator = new Elevator()) {
    this.elevator = elevator;
  }

  calculateOptimalSequence(sequence) {
    const withoutCurrentFloor = _.without(sequence, this.elevator.currentFloor);

    let floorsInSameDirection = this.getFloorsInCurrentDirection(withoutCurrentFloor);
    let floorsInOppositeDirection = _.without(withoutCurrentFloor, floorsInSameDirection);

    floorsInSameDirection.sort((a,b) => a - b);
    floorsInOppositeDirection.sort((a,b) => a - b);

    return floorsInSameDirection.concat(floorsInOppositeDirection);
  }

  getFloorsInCurrentDirection(sequence) {
    return sequence.filter(floor =>
      this.elevator.currentDirection === 'UP' ?
        floor > this.elevator.currentFloor :
        floor < this.elevator.currentFloor
    );
  }

  moveAlongSequence(sequence) {
    const optimalSequence = this.calculateOptimalSequence(sequence);

    optimalSequence.forEach(floor => {
      this.printMovement(floor);
      this.elevator.move(floor);
    });
  }

  printMovement(nextFloor) {
    return `${this.elevator.currentFloor} -> ${nextFloor}`;
  }
}

module.exports = ElevatorOperator;