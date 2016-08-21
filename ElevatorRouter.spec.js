const expect = require('chai').expect;
const ElevatorRouter = require('./ElevatorRouter');
const Elevator = require('./Elevator');

describe('ElevatorRouter', () => {
  describe('#optimizeSequence', () => {
    it('returns the most efficient sequence', () => {
      const elevatorRouter = new ElevatorRouter(new Elevator(true, 4));

      const optimalSequence = elevatorRouter.optimizeSequence([1,2,3,4,5,6]);

      expect(optimalSequence).to.deep.equal([5,6,3,2,1]);
    });
  });
});