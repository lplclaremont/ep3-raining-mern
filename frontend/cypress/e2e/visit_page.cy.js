import mockApiResponse from './mockApiResponse';

describe('Just visit e2e test', () => {
  const mockResponseData = {
    "daily": [
    {
      "dt": 1688990400,
      "temp": {
          "day": 29.77
      },
      "weather": [
          {
              "description": "clear sky"
          }
      ],
      "activity": "Beach"
    },
    {
      "dt": 1688990400,
      "temp": {
          "day": 18.57
      },
      "weather": [
          {
              "description": "cloudy"
          }
      ],
      "activity": "Museums"
    },
    {
      "dt": 1688990400,
      "temp": {
          "day": 22.2
      },
      "weather": [
          {
              "description": "clear sky"
          }
      ],
      "activity": "Sightseeing"
  }]
  }

  it('should visit', () => {
    // cy.intercept('GET', "https://api.openweathermap.org/data/3.0/onecall*", {
    //   statusCode: 200,
    //   body: mockApiResponse,
    // });

    cy.intercept('GET', "http://localhost:3000/weather/?*", {
      statusCode: 200,
      body: mockResponseData,
    });

    cy.visit('http://localhost:5173');
    cy.get('[data-cy="city-dropdown"]').select('bournemouth');
  
    cy.contains('Generate').click();
  });
});
