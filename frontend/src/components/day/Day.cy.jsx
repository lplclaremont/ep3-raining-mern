import Day from "./Day";

describe('Day', () => {
  const mockDay = {
    "dt": 1688990400,
    "temp": {
        "day": 29.77
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky"
        }
    ],
    "clouds": 1,
    "pop": 0,
    "activity": "Sightseeing"
  }

  it('displays the day info with correct details', () => {
    cy.mount(<Day day={mockDay} />)
    cy.get('[data-cy="day-display"]').should('contain.text', 'Monday, 10 July')
    cy.get('[data-cy="day-display"]').should('contain.text', 'clear sky')
    cy.get('[data-cy="day-display"]').should('contain.text', '30°C')
    cy.get('[data-cy="day-display"]').should('contain.text', 'Sightseeing')
  })
})