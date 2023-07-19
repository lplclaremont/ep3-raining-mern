// const request = require('supertest');
// const app = require('../../app');


describe('POST /email', () => {
  let server;
  let itinerary;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    itinerary = [
      {
        dt: 1689138000,
        temp: { day: 29.21 },
        weather: [],
        clouds: 95,
        pop: 0.49,
        activity: 'shopping'
      },
      {
        dt: 1689224400,
        temp: { day: 28.84 },
        weather: [],
        clouds: 83,
        pop: 0.9,
        activity: 'museums'
      },
      {
        dt: 1689310800,
        temp: { day: 28.15 },
        weather: [],
        clouds: 100,
        pop: 1,
        activity: 'eating'
      }
    ];
  });

  test('responds with 201 status and "Email sent" message', async () => {
    const expectedEmailBody = itinerary
      .map(
        (day) =>
          `Date: ${formatDate(day.dt)}, Temp: ${day.temp.day.toFixed()}°C, Weather: ${
            day.weather[0]?.description || 'N/A'
          }, Recommended activity: ${day.activity}`
      )
      .join('\n\n');

    const response = await request(app)
      .post('/email')
      .send({ emailAddress: 'carolineevans261@gmail.com', itinerary: itinerary });

    expect(response.status).toEqual(201);
    expect(response.body).toEqual({ message: 'Email sent' });
  });
});
