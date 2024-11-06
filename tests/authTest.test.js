const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../app'); // Assuming you export both app and port from app.js
chai.use(chaiHttp);
const { expect } = chai;

describe('POST /api/sign-up', () => {
  it('should successfully create a new user', (done) => {
    chai.request(app)  // Use the server instance here
      .post('/api/sign-up')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        done();
      });
  });

  it('should return 400 for missing email', (done) => {
    chai.request(app)  // Use the server instance here
      .post('/api/sign-up')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
