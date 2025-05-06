import header from '../fixtures/header.json';

const { navigation } = header;

/*
    1. Home page visibility verification:
    1.1. Go to the home page
    1.2. Check if the logo is visible
    1.3. Check if the navigation buttons exists
*/

describe('#1 | Home page visibility verification', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the logo', () => {
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
  });

  it('should display the navigation buttons', () => {
    cy.get('.navbar-nav')
      .should('be.visible')
      .find('a')
      .each(($a, index) => cy.wrap($a).should('be.visible').and('contain.text', navigation[index].title));
  });
});
