// files: api/spec/routes/routes.spec.js

// supertest allows you to test HTTP endpoints by sending various types of requests 
//and checking the responses
const supertest = require('supertest'); 
const express = require('express');
const weatherRoutes = require('../../routes/weather');
const weatherController = require('../../controllers/weatherController');

jest.mock('../../controllers/weatherController');

const app = express();
app.use(express.json());
app.use('/', weatherRoutes);

const request = supertest(app);

describe('GET /', () => {
  it('should return 200 & valid response for a rainy day', async () => {
    // mock getWeather response for a rainy day
    const mockData = {
      lat: 0.1,
      lon: 50.2,
      daily: [
        {
          dt: 1684951200,
          temp: {
            day: 23.05
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "light rain"
            }
          ],
          clouds: 92,
          pop: 0.47
        },
      ]
    };

    weatherController.getWeather.mockResolvedValue(mockData);

    const res = await request.get('/'); // this is an open handle that keeping jest from exiting>>needs to investigate??? lines 43-48

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
    expect(weatherController.getWeather).toHaveBeenCalled();
  }, 10000); // 
});

//>>test takes too long, so fails<<< will need to review everything over again