const expect = require('chai').expect;
const Elevator = require('./Elevator');

describe('Elevator', () => {
  it('starts going up', () => {
    const elevator = new Elevator();

    expect(elevator.isGoingUp).to.be.true;
  });

  it('starts at floor 1', () => {
    const elevator = new Elevator();

    expect(elevator.currentFloor).to.equal(1);
  });

  describe('#moveToFloor', () => {
    it('can move to another floor', () => {
      const elevator = new Elevator();
      elevator.moveToFloor(2);

      expect(elevator.currentFloor).to.equal(2);
    });

    it('maintains its direction when traveling to a floor in the same direction', () => {
      const elevator = new Elevator(true, 1);
      elevator.moveToFloor(2);

      expect(elevator.isGoingUp).to.be.true;
    });


    it('changes its direction when traveling to a floor in the opposite direction', () => {
      const elevator = new Elevator(true, 2);
      elevator.moveToFloor(1);

      expect(elevator.isGoingUp).to.be.false;
    });
  });

  describe('#getNumberOfFloorsPassed', () => {
    context('if the elevator has not yet moved', () => {
      it('has not passed any floors', () => {
        const elevator = new Elevator(true, 1);

        expect(elevator.getNumberOfFloorsPassed()).to.equal(0);
      });
    });

    it('calculates the number of floors passed', () => {
      const elevator = new Elevator(true, 1);

      elevator.moveToFloor(2);
      elevator.moveToFloor(5);
      elevator.moveToFloor(1);

      expect(elevator.getNumberOfFloorsPassed()).to.equal(8);
    });
  });
});