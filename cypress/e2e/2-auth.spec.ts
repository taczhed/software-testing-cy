/*
    2. Registering a new user:
    2.1. Click “Signup / Login”
    2.2. Fill out the registration form
    2.3. Check for the message “ACCOUNT CREATED!”

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
import { headerSelectors } from '../selectors/header-selectors';
import { loginSelectors, signupSelectors } from '../selectors/auth-selectors';

const { name, email, password } = user;
const { loginLink, logoutLink } = headerSelectors;
const { loginFrom, loginEmailInput, loginPasswordInput, loginButton } = loginSelectors;
const { signupFrom, signupNameInput, signupEmailInput, signupButton, createAccountButton, accountCreatedInfo, continueButton } =
  signupSelectors;

describe('#2 | Registering a new user', () => {
  before(() => {
    cy.visit('/');
  });

  after(() => {
    cy.deleteAccount({ email, password });
  });

  it('should register new user', () => {
    cy.get(loginLink).should('be.visible').click();

    // Basic data page
    cy.get(signupFrom)
      .should('be.visible')
      .within(() => {
        cy.get(signupNameInput).should('be.visible').type(name);
        cy.get(signupEmailInput).should('be.visible').type(email);
        cy.get(signupButton).should('be.visible').click();
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
    cy.get(createAccountButton).should('be.visible').click();

    // Account created confirmation
    cy.get(accountCreatedInfo).should('be.visible');
    cy.get(continueButton).should('be.visible').click();
  });
});

describe('#3 | User login', () => {
  before(() => {
    cy.createAccount();
    cy.visit('/');
  });

  after(() => {
    cy.deleteAccount({ email, password });
  });

  it('should log in the user successfully', () => {
    cy.get(loginLink).should('be.visible').click();

    // Login page
    cy.get(loginFrom)
      .should('be.visible')
      .within(() => {
        cy.get(loginEmailInput).should('be.visible').type(email);
        cy.get(loginPasswordInput).should('be.visible').type(password);
        cy.get(loginButton).should('be.visible').click();
      });

    // Home page
    cy.contains(`Logged in as ${name}`).should('be.visible');
  });
});

describe('#4 | User logout', () => {
  before(() => {
    cy.createAccount();
    cy.loginAccount({ email, password });
    cy.visit('/');
  });

  after(() => {
    cy.deleteAccount({ email, password });
  });

  it('should log out the user successfully', () => {
    cy.get(logoutLink).should('be.visible').click();
    cy.get(loginLink).should('be.visible').and('contain.text', 'Signup / Login');
  });
});
