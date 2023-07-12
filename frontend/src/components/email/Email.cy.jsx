import Email from './Email';

describe("Email", () => {
  it('renders a button with "Send Email" text', () => {
    cy.mount(<Email responseData= {['test']} />)
    cy.get('[data-cy="email-button"]').should('contain.text', "Send Email")
  })

  it('calls the /email endpoint with an email as a body parameter', () => {
    cy.intercept('POST', 'http://localhost:3000/email/', (req) => {
      req.reply({
        statusCode: 200
      });
    }
    ).as('sendEmail');
  
    cy.mount(<Email responseData= {['test']} />);
  
    cy.get('[data-cy="email-input"]').type('test@email.com');
    cy.get('[data-cy="email-button"]').click();
  
    cy.wait('@sendEmail')
      .its('request.body.emailAddress')
      .should('eq', 'test@email.com');
  });

  it('calls the /email endpoint with an email that has a mix of letters and numbers', () => {
    cy.intercept('POST', 'http://localhost:3000/email/', (req) => {
      req.reply({
        statusCode: 200
      });
    }
    ).as('sendEmail');
  
    cy.mount(<Email responseData= {['test']} />);
  
    cy.get('[data-cy="email-input"]').type('test123test456@email.com');
    cy.get('[data-cy="email-button"]').click();
  
    cy.wait('@sendEmail')
      .its('request.body.emailAddress')
      .should('eq', 'test123test456@email.com');
  });

  it('does not call the /email endpoint if no email is given', () => {
    cy.intercept('POST', 'http://localhost:3000/email/', (req) => {
      req.reply({
        statusCode: 200
      });
    }
    ).as('sendEmail');

    cy.mount(<Email responseData={['test']} />);
  
    cy.get('[data-cy="email-input"]').type(' ');
    cy.get('[data-cy="email-button"]').click();
  
    cy.wait(2000);
    cy.get('@sendEmail.all').then((interceptions) => {
    expect(interceptions).to.have.length(0);
    });
  });

  it('does not call the /email endpoint if email format is incorrect', () => {
    cy.intercept('POST', 'http://localhost:3000/email/', (req) => {
      req.reply({
        statusCode: 200
      });
    }
    ).as('sendEmail');

    cy.mount(<Email responseData={['test']} />);
  
    cy.get('[data-cy="email-input"]').type('@wrongemail.com');
    cy.get('[data-cy="email-button"]').click();
  
    cy.wait(2000);
    cy.get('@sendEmail.all').then((interceptions) => {
    expect(interceptions).to.have.length(0);
    });
  });

})