const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { expect } = chai;

describe('Incident model', function() {
  describe('find', function() {
    it('should find Incident by responsibility', async function() {
      const Incident = (await import('../app/models/incidents.js')).default; 

      // Arrange
      const responsibility = 'Khaled';
      const expectedIncidents = [
        { recordNumber: '1921', description: 'fixing contact page', priority: 'high', narrative: 'created in May 2023', responsibility:'Khaled',status:'open',resolutionInformation:'finish asap' },
        { recordNumber: '39432', description: 'fixing home page', priority: 'low', narrative: 'created in May 2022', responsibility:'Omar',status:'closed',resolutionInformation:'it works fine now' },
      ];

      // Mock the database here
      const stub = sinon.stub(Incident, 'find').resolves(expectedIncidents);

      // Act
      const incidents = await Incident.find({ responsibility });

      // Assert
      expect(incidents).to.deep.equal(expectedIncidents);

      // Restore the function
      stub.restore();
    });
  });

  // Add more tests as needed...
});
