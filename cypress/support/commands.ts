import { loginPage } from '../selectors/login-selectors';
import { ILoginAccount } from '../interfaces/account.interface';

declare global {
  namespace Cypress {
    interface Chainable {
      login(parameters: ILoginAccount): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('login', (parameters: ILoginAccount) => {
  cy.intercept('GET', 'https://ep1.adtrafficquality.google/getconfig/sodar?**').as('loadPage');

  cy.get(loginPage.emailInput).should('be.visible').type(parameters.email);
  cy.get(loginPage.passwordInput).should('be.visible').type(parameters.password);

  cy.get(loginPage.emailInput).should('be.visible').click();
  cy.wait('@loadPage');
});
