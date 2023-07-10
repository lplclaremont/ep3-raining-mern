import Activity from "./Activity";

describe('Activity', () => {
  it('renders a button with the activity name', () => {
    cy.mount(<Activity activityName={'Beach'}/>)
    cy.get('[data-cy="activity-button"]').should('contain.text', 'Beach')
  })

  it('inserts activity name into preferredActivities array', () => {
    const setPreferredActivitiesSpy = cy.spy().as('setPreferredActivitiesSpy')
    cy.mount(<Activity activityName={'Beach'} preferredActivities={[]} setPreferredActivities={setPreferredActivitiesSpy}/>)
    cy.get('[data-cy="activity-button"]').click()
    cy.get('@setPreferredActivitiesSpy').should('have.been.calledWith', ['Beach'])
  })

  it('removes activity name from preferredActivities array if already present', () => {
    const setPreferredActivitiesSpy = cy.spy().as('setPreferredActivitiesSpy')
    cy.mount(<Activity activityName={'Beach'} preferredActivities={[]} setPreferredActivities={setPreferredActivitiesSpy}/>)
    cy.get('[data-cy="activity-button"]').click()
    cy.get('[data-cy="activity-button"]').click()
    cy.get('@setPreferredActivitiesSpy').should('have.been.calledWith', [])
  })
})