describe('', () => {
  it('#01 | Visible Header', () => {
    cy.visit('/');
    cy.get('#header').should('be.visible');
  });
});
