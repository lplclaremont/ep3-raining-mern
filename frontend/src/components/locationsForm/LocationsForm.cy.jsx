import LocationsForm from './LocationsForm'

describe("LocationsForm", () => {
  it('renders a dropdown with city choices', () => {
    cy.mount(<LocationsForm />)
    cy.get('[data-cy="city-dropdown"]').should('contain.text', "Brighton, UK")
    cy.get('[data-cy="city-dropdown"]').should('contain.text', "Valencia, Spain")
  })
})