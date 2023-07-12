// const app = require("../../app");
// const request = require("supertest");

describe("POST /email", () => {
  let itinerary
  beforeEach(()=>{
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
  xtest("responds with 201 status and 'Email sent' message", async ()=>{
    let response = await request(app)
        .post("/email")
        .send({ emailAddress: "carolineevans261@gmail.com", itinerary: itinerary });
      expect(response.status).toEqual(201);
  });
});