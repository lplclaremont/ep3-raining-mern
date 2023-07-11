import Itinerary from "./Itinerary";

describe('Itinerary', () => {
  const mockResponseData = [
    {
      "dt": 1688990400,
      "temp": {
          "day": 29.77
      },
      "weather": [
          {
              "description": "clear sky"
          }
      ],
      "activity": "Beach"
    },
    {
      "dt": 1688990400,
      "temp": {
          "day": 18.57
      },
      "weather": [
          {
              "description": "cloudy"
          }
      ],
      "activity": "Museums"
    },
    {
      "dt": 1688990400,
      "temp": {
          "day": 22.2
      },
      "weather": [
          {
              "description": "clear sky"
          }
      ],
      "activity": "Sightseeing"
    }
  ]

  it('displays details for all three days', () => {
    cy.mount(<Itinerary responseData={mockResponseData}/>)
    cy.get('[data-cy="itinerary"]').should('contain.text', '30°C')
    cy.get('[data-cy="itinerary"]').should('contain.text', 'Beach')

    cy.get('[data-cy="itinerary"]').should('contain.text', '19°C')
    cy.get('[data-cy="itinerary"]').should('contain.text', 'Museums')

    cy.get('[data-cy="itinerary"]').should('contain.text', '22°C')
    cy.get('[data-cy="itinerary"]').should('contain.text', 'Sightseeing')
  })
})