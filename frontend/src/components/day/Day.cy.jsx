import Day from "./Day";

describe('Day', () => {
  const mockDay = {
    "dt": 1688990400,
    "temp": {
        "day": 29.77
    },
    "weather": [
        {
            "description": "clear sky"
        }
    ],
    "activity": "Sightseeing"
  }

  it('displays the day info with correct details', () => {
    cy.mount(<Day day={mockDay} />)
    cy.get('[data-cy="day-display"]').should('contain.text', 'Monday, 10 July')
    cy.get('[data-cy="day-display"]').should('contain.text', 'clear sky')
    cy.get('[data-cy="day-display"]').should('contain.text', '30°C')
    cy.get('[data-cy="day-display"]').should('contain.text', 'Sightseeing')
  })

  it('displays a summary of the weather and activity', () => {
    const summaryString = "30°C and clear sky, the weather is unpredictable, but it's still a good day for Sightseeing!"
    cy.mount(<Day day={mockDay} />)
    cy.get('[data-cy="day-display"]').should('contain.text', summaryString)
  })
})