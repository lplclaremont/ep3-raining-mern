import Activity from "./Activity";

describe('Activity', () => {
  it('renders a button with the activity name', () => {
    cy.mount(<Activity activityName={'Beach'}/>)
    cy.get('[data-cy="activity-button"]').should('contain.text', 'Beach')
  })
})