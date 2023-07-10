import LocationsForm from './LocationsForm'

describe("LocationsForm", () => {
  it('renders a dropdown with city choices', () => {
    cy.mount(<LocationsForm />)
    cy.get('[data-cy="city-dropdown"]').should('contain.text', "Brighton, UK")
    cy.get('[data-cy="city-dropdown"]').should('contain.text', "Valencia, Spain")
  })

  it('calls the /weather endpoint with correct city in query parameters', () => {
    cy.intercept('GET', 'http://localhost:3000/weather/?city=valencia', (req) => {
      req.reply({
        statusCode: 200
      });
    }
    ).as('getWeather');
  
    cy.mount(<LocationsForm />);
  
    cy.get('[data-cy=city-dropdown]').select('valencia');
  
    cy.contains('Generate').click();
  
    cy.wait('@getWeather')
      .its('request.url')
      .should('eq', 'http://localhost:3000/weather/?city=valencia');
  });
})