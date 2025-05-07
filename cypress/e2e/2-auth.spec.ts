/*
    2. Registering a new user:
    2.1. Click “Signup / Login”
    2.2. Fill out the registration form
    2.3. Check for the message “ACCOUNT CREATED!”
    2.4. Delete account

    3. User login:
    3.1. Click “Signup / Login”
    3.2. Enter login credentials
    3.3. Check if the user is logged in (“Logged in as [name]”)

    4. User logout:
    4.1. Log in as a user
    4.2. Click “Logout”
    4.3. Check if you are back on the login page
*/

import user from '../fixtures/user.json';

const { name, email } = user;

describe('#2 | Registering a new user', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be able to register new user', () => {
    const randomId = Math.floor(Math.random() * 1001);

    cy.get('a[href="/login"]').should('be.visible').click();

    // Basic data page
    cy.get('form[action="/signup"]')
      .should('be.visible')
      .within(() => {
        cy.get('[data-qa="signup-name"]').should('be.visible').type(name);
        cy.get('[data-qa="signup-email"]').should('be.visible').type(`${randomId}-${email}`);
        cy.get('[data-qa="signup-button"]').should('be.visible').click();
      });

    // Advanced data page
    cy.get('#id_gender1').should('be.visible').check();
    cy.get('#password').should('be.visible').type(user.password);
    cy.get('#days').should('be.visible').select(user.birthDay);
    cy.get('#months').should('be.visible').select(user.birthMonth);
    cy.get('#years').should('be.visible').select(user.birthYear);
    cy.get('#first_name').should('be.visible').type(user.firstName);
    cy.get('#last_name').should('be.visible').type(user.lastName);
    cy.get('#address1').should('be.visible').type(user.address);
    cy.get('#country').should('be.visible').select(user.country);
    cy.get('#state').should('be.visible').type(user.state);
    cy.get('#city').should('be.visible').type(user.city);
    cy.get('#zipcode').should('be.visible').type(user.zipcode);
    cy.get('#mobile_number').should('be.visible').type(user.mobile);
    cy.get('button[data-qa="create-account"]').should('be.visible').click();

    // Account created confirmation
    cy.get('h2[data-qa="account-created"]').should('be.visible');
    cy.get('a[data-qa="continue-button"]').should('be.visible').click();

    // Home page
    cy.get('a[href="/delete_account"]').should('be.visible').click();

    // Account deleted confirmation
    cy.get('h2[data-qa="account-deleted"]').should('be.visible');
    cy.get('a[data-qa="continue-button"]').should('be.visible').click();
  });
});
