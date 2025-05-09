/*
    8. Contact via form:
    8.1. Go to “Contact us”
    8.2. Fill out the contact form
    8.3. Click send
    8.4. Check the success message
*/

import user from '../fixtures/user.json';
import { headerSelectors } from '../selectors/header-selectors';
import { contactSelectors } from '../selectors/contact-selectors';

const { name, email } = user;
const { contactLink } = headerSelectors;
const { contactForm, nameInput, emailInput, subjectInput, messageInput, submitButton, successAlert } = contactSelectors;

describe('#8 | Contact via form', () => {
  before(() => {
    cy.visit('/');
  });

  it('should send a message via contact form and verify success message', () => {
    // Home page
    cy.get(contactLink).should('be.visible').click();

    // Contact page
    cy.get(contactForm)
      .should('be.visible')
      .within(() => {
        cy.get(nameInput).type(name);
        cy.get(emailInput).type(email);
        cy.get(subjectInput).type('Test subject');
        cy.get(messageInput).type('Test message');

        cy.get(submitButton).click();
      });

    cy.get(successAlert).should('be.visible').and('contain.text', 'Success!');
  });
});
