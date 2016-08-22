const expect = require('chai').expect;
const ElevatorAnalyzer = require('../src/ElevatorAnalyzer');
const Elevator = require('../src/Elevator');

describe('ElevatorAnalyzer', () => {
  describe('#numberOfFloorsPassed', () => {
    context('if the elevator has not yet moved', () => {
      it('has not passed any floors', () => {
        const elevatorAnalyzer = new ElevatorAnalyzer(new Elevator(true, 1));

        expect(elevatorAnalyzer.numberOfFloorsPassed).to.equal(0);
      });
    });

    it('calculates the number of floors passed', () => {
      const elevator = new Elevator(true, 1);

      elevator.moveToFloor(2);
      elevator.moveToFloor(5);
      elevator.moveToFloor(1);

      const elevatorAnalyzer = new ElevatorAnalyzer(elevator);

      expect(elevatorAnalyzer.numberOfFloorsPassed).to.equal(8);
    });
  });

  describe('#numberOfDirectionChanges', () => {
    context('if the elevator has not yet moved', () => {
      it('has not made any direction changes', () => {
        const elevatorAnalyzer = new ElevatorAnalyzer(new Elevator(true, 1));

        expect(elevatorAnalyzer.numberOfDirectionChanges).to.equal(0);
      });
    });

    it('calculates the number of direction changes', () => {
      const elevator = new Elevator(true, 1);

      elevator.moveToFloor(2);
      elevator.moveToFloor(5);
      elevator.moveToFloor(1);
      elevator.moveToFloor(2);

      const elevatorAnalyzer = new ElevatorAnalyzer(elevator);

      expect(elevatorAnalyzer.numberOfDirectionChanges).to.equal(2);
    });
  });
});
