//file: api/spec/routes/weather.spec.js


// beforeAll, start the server by listening to the app's instance using app.listen(). 
//it allows us to do integration tests by making http requests to the server.
// afterAll, close the server by calling server.close() to properly terminate the server after the tests are finished.
//it ensures that the server resources are released and prevents any potential memory leaks or conflicts with subsequent tests.
const request = require('supertest');
const app = require('../../app');
let server;

describe('Weather Routes', () => {
  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return a 200 status code for a valid request', async () => {
    const res = await request(server).get('/weather?city=brighton');
    expect(res.statusCode).toEqual(200);
  });

  it('should return a 500 status code for an invalid request', async () => {
    const res = await request(server).get('/weather?city=invalidcity');
    expect(res.statusCode).toEqual(500);
  });
});

// Fixed weather route test by handling server initialization and termination properly
// Updated Jest command to include --detectOpenHandles flag for troubleshooting async operations