const expect = require('chai').expect;
const Elevator = require('../src/Elevator');

describe('Elevator', () => {
  it('starts going up', () => {
    const elevator = new Elevator();

    expect(elevator.currentDirection).to.equal('UP');
  });

  it('starts at floor 1', () => {
    const elevator = new Elevator();

    expect(elevator.currentFloor).to.equal(1);
  });

  describe('#currentDirection', () => {
    it('is going up if the current floor is above the last floor', () => {
      const elevator = new Elevator();
      elevator.moveToFloor(2);

      expect(elevator.currentDirection).to.equal('UP');
    });

    it('is going down if the current floor is below the last floor', () => {
      const elevator = new Elevator(3);
      elevator.moveToFloor(2);

      expect(elevator.currentDirection).to.equal('DOWN');
    });
  });

  describe('#moveToFloor', () => {
    it('changes its current floor when moving', () => {
      const elevator = new Elevator();
      elevator.moveToFloor(2);

      expect(elevator.currentFloor).to.equal(2);
    });
  });

  describe('#numberOfFloorsPassed', () => {
    context('if the elevator has not yet moved', () => {
      it('has not passed any floors', () => {
        const elevator = new Elevator(true, 1);

        expect(elevator.numberOfFloorsPassed).to.equal(0);
      });
    });

    it('calculates the number of floors passed', () => {
      const elevator = new Elevator(true, 1);

      elevator.moveToFloor(2);
      elevator.moveToFloor(5);
      elevator.moveToFloor(1);

      expect(elevator.numberOfFloorsPassed).to.equal(8);
    });
  });

  describe('#numberOfDirectionChanges', () => {
    context('if the elevator has not yet moved', () => {
      it('has not made any direction changes', () => {
        const elevator = new Elevator(true, 1);

        expect(elevator.numberOfDirectionChanges).to.equal(0);
      });
    });

    it('calculates the number of direction changes', () => {
      const elevator = new Elevator(true, 1);

      elevator.moveToFloor(2);
      elevator.moveToFloor(5);
      elevator.moveToFloor(1);
      elevator.moveToFloor(2);

      expect(elevator.numberOfDirectionChanges).to.equal(2);
    });
  });
});