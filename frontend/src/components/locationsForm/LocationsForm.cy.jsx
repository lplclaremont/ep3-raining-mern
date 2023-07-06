// file: frontend/src/components/locationsForm/LocationsForm.test.jsx

describe('LocationsForm', () => {
  beforeEach(() => {
    //where is the component is rendered at?
    cy.visit('/');
  });

  it('displays the default message when no city is selected', () => {
    cy.contains('p', 'Day:').should('not.exist'); //modify (inside)
  });

  it('displays the selected city weather when "Generate" is clicked', () =>{
    cy.intercept('POST', '/weather', {
      fixture: 'mockWeatherData.json', 
    });

    cy.get('#city-select').select('brighton');
    cy.get('button').click();

    cy.contains('p', 'Day: Monday').should('exist');
    cy.contains('p', 'Weather: Sunny').should('exist');
    cy.contains('p', 'Activities: Hiking, Picnic').should('exist');
  });

  it('display an error message when the API call fails', () => {
    cy.intercept('POST', '/weather', {
      statusCode: 500,
      body: 'Internal Server Error',
    });

    cy.get('#city-select').select('brighton');
    cy.get('button').click();

    cy.contains('p', 'Error occurred while fetching weather data.').should('exist');
  });

  it('should update the selectedCity state on city selection', () => {
    cy.get('#city-select').select('lisbon');
    cy.get('#city-select').should('have.value', 'lisbon');
  });

  it('should display the options in the select dropdown', () => {
    cy.get('#city-select').should('contain', 'Brighton, UK');
    cy.get('#city-select').should('contain', 'Lisbon, Portugal');
    cy.get('#city-select').should('contain', 'Valencia, Spain');
    cy.get('#city-select').should('contain', 'Riga, Latvia');
    cy.get('#city-select').should('contain', 'Santorini, Greece');
  });
});
