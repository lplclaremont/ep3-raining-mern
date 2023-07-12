describe('Just visit e2e test', () => {
  it('should render 3 day display when no activities or dates selected', () => {
    cy.visit('http://localhost:5173');
    cy.get('[data-cy="city-dropdown"]').select('brighton');
  
    cy.contains('Generate').click();

    cy.get('[data-cy="itinerary"]')
    cy.get('[data-cy="day-display"]').should('have.length', 3)
  });

  it('should render 3 day display when activities selected but no dates selected', () => {
    cy.visit('http://localhost:5173');
    cy.get('[data-cy="city-dropdown"]').select('valencia');
  
    cy.contains('Beach').click();
    cy.contains('Museums').click();
    cy.contains('Generate').click();

    cy.get('[data-cy="itinerary"]')
    cy.get('[data-cy="day-display"]').should('have.length', 3)
  });

  it('should render 1 day display when date range today-today selected', () => {
    cy.visit('http://localhost:5173');
    cy.get('[data-cy="city-dropdown"]').select('valencia');

    cy.get('.react-datepicker-wrapper').click();
    cy.get('[class*="today"]').click();
    cy.get('[class*="today"]').click();

    cy.contains('Generate').click();

    cy.get('[data-cy="day-display"]').should('have.length', 1)
  })
});
