const expect = require('chai').expect;
const ElevatorOperator = require('./ElevatorOperator');
const Elevator = require('./Elevator');

describe('ElevatorOperator', () => {
  describe('#getFloorsInCurrentDirection', () => {
    it('returns the floors from the sequence that are in the current direction', () => {
      const elevatorOperator = new ElevatorOperator(
        new Elevator('UP', 2)
      );

      expect(
        elevatorOperator.getFloorsInCurrentDirection([3,4,1])
      ).to.deep.equal([3,4]);
    });

    it('does not include the current floor if it is in the sequence', () => {
      const elevatorOperator = new ElevatorOperator(
        new Elevator('UP', 1)
      );

      expect(
        elevatorOperator.getFloorsInCurrentDirection([1,2,3])
      ).to.deep.equal([2,3]);
    });
  });

  describe.skip('#calculateOptimalSequence', () => {
    it('returns the most efficient sequence', () => {
      const elevatorOperator = new ElevatorOperator();
      const optimalSequence = elevatorOperator.calculateOptimalSequence([1,2,3]);

      expect(optimalSequence).to.equal([2,3]);
    });
  });
});