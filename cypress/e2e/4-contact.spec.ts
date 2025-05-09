/*
    8. Contact via form:
    8.1. Go to “Contact us”
    8.2. Fill out the contact form
    8.3. Click send
    8.4. Check the success message
*/

import user from '../fixtures/user.json';

const { name, email } = user;

describe('#8 | Contact via form', () => {
  before(() => {
    cy.visit('/');
  });

  it('should send a message via contact form and verify success message', () => {
    // Home page
    cy.get('a[href="/contact_us"]').should('be.visible').click();

    // Contact page
    cy.get('form#contact-us-form')
      .should('be.visible')
      .within(() => {
        cy.get('input[data-qa="name"]').type(name);
        cy.get('input[data-qa="email"]').type(email);
        cy.get('input[data-qa="subject"]').type('Test subject');
        cy.get('textarea[data-qa="message"]').type('Test message');

        cy.get('input[data-qa="submit-button"]').click();
      });

    cy.get('div.status.alert-success').should('be.visible').and('contain.text', 'Success!');
  });
});
