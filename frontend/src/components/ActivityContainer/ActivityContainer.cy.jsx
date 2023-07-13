import ActivityContainer from "./ActivityContainer";

describe('ActivityContainer', () => {
  it('displays buttons for each of the activity names', () => {
    cy.mount(<ActivityContainer />)
    cy.get('[data-cy="activity-container"]').should('contain.text', "Beach")
    cy.get('[data-cy="activity-container"]').should('contain.text', "Museums")
    cy.get('[data-cy="activity-container"]').should('contain.text', "Sports")
    cy.get('[data-cy="activity-container"]').should('contain.text', "Shopping")
    cy.get('[data-cy="activity-container"]').should('contain.text', "Eating")
    cy.get('[data-cy="activity-container"]').should('contain.text', "Sightseeing")
  })
})