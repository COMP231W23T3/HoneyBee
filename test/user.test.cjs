const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { expect } = chai;

describe('User model', function() {
  describe('find', function() {
    it('should find users by role', async function() {
      const User = (await import('../app/models/users.js')).default; 

      // Arrange
      const role = 'programmer';
      const expectedUsers = [
        { displayName: 'Alice', username: 'alice', emailAddress: 'alice@example.com', userType: 'programmer', role },
        { displayName: 'Bob', username: 'bob', emailAddress: 'bob@example.com', userType: 'programmer', role },
      ];

      // Mock the database here
      const stub = sinon.stub(User, 'find').resolves(expectedUsers);

      // Act
      const users = await User.find({ role });

      // Assert
      expect(users).to.deep.equal(expectedUsers);

      // Restore the function
      stub.restore();
    });
  });

  // Add more tests as needed...
});
