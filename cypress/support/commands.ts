import { ILoginAccount } from '../interfaces/account.interface';

import user from '../fixtures/user.json';

declare global {
  namespace Cypress {
    interface Chainable {
      createAccount(): Chainable<JQuery<HTMLElement>>;
      deleteAccount(user: ILoginAccount): Chainable<JQuery<HTMLElement>>;
      loginAccount(user: ILoginAccount): Chainable<JQuery<HTMLElement>>;
      addProductToCart(productId: number): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('createAccount', () => {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: {
      name: user.name,
      email: user.email,
      password: user.password,
      birth_date: user.birthDay,
      birth_month: user.birthMonth,
      birth_year: user.birthYear,
      firstname: user.firstName,
      lastname: user.lastName,
      address1: user.address,
      country: user.country,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobile,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.include('User created!');
  });
});

Cypress.Commands.add('deleteAccount', (user) => {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: {
      email: user.email,
      password: user.password,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.include('Account deleted!');
  });
});

Cypress.Commands.add('loginAccount', (user) => {
  cy.visit('/');
  cy.get('a[href="/login"]').click();
  cy.get('form[action="/login"]').within(() => {
    cy.get('[data-qa="login-email"]').type(user.email);
    cy.get('[data-qa="login-password"]').type(user.password);
    cy.get('[data-qa="login-button"]').click();
  });
});

Cypress.Commands.add('addProductToCart', (productId: number) => {
  cy.visit('/');
  cy.get('a[href="/products"]').should('be.visible').click();
  cy.get('div.product-image-wrapper')
    .eq(productId - 1)
    .scrollIntoView()
    .trigger('mouseover')
    .within(() => {
      cy.get('a.add-to-cart').first().should('be.visible').click();
    });
});
