const expect = require('chai').expect;
const Elevator = require('./Elevator');

describe('Elevator', () => {
  it('starts in the UP direction', () => {
    const elevator = new Elevator();

    expect(elevator.currentDirection).to.equal('UP');
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
      const elevator = new Elevator('UP', 1);
      elevator.moveToFloor(2);

      expect(elevator.currentDirection).to.equal('UP');
    });


    it('changes its direction when traveling to a floor in the opposite direction', () => {
      const elevator = new Elevator('UP', 2);
      elevator.moveToFloor(1);

      expect(elevator.currentDirection).to.equal('DOWN');
    });
  });
});