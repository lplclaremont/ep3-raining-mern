import mockApiResponse from './mockApiResponse';

describe('Just visit e2e test', () => {
  it('should visit', () => {
    cy.intercept('GET', `https://api.openweathermap.org/data/3.0/onecall*`, {
      statusCode: 200,
      body: mockApiResponse,
    });

    cy.visit('http://localhost:5173');
    cy.get('[data-cy="city-dropdown"]').select('phuket');
  
    cy.contains('Generate').click();
  });
});
