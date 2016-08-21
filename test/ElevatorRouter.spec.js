const expect = require('chai').expect;
const ElevatorRouter = require('../src/ElevatorRouter');
const Elevator = require('../src/Elevator');

describe('ElevatorRouter', () => {
  describe('#optimizeSequence', () => {
    it('returns the sequence with the least number of direction changes', () => {
      const elevatorRouter = new ElevatorRouter(new Elevator(4));

      const optimalSequence = elevatorRouter.optimizeSequence([1,2,3,4,5,6]);

      expect(optimalSequence).to.deep.equal([5,6,3,2,1]);
    });
  });
});