/*
    5. Adding a product to the cart:
    5.1. Go to the "Products" tab
    5.2. Add the first product to the cart
    5.3. Check if the cart contains 1 product

    6. Removing a product from the cart:
    6.1. Add a product to the cart
    6.2. Go to the cart
    6.3. Click “X” next to the product
    6.4. Check that the cart is empty

    7. Searching for a product:
    7.1. Go to “Products”
    7.2. Search for a product, e.g., “Tshirt”
    7.3. Check if results matching the query appear
*/

const productId = 6;
const productName = 'Pure Cotton V-Neck T-Shirt';

describe('#5 | Adding a product to the cart', () => {
  before(() => {
    cy.visit('/');
  });

  it('should add a random product to the cart and verify it', () => {
    // Home page
    cy.get('a[href="/products"]').should('be.visible').click();

    // Products page
    cy.get('div.productinfo.text-center')
      .eq(productId - 1)
      .find('p')
      .invoke('text')
      .then((text) => {
        cy.wrap(text.trim()).as('productName');
      });

    cy.get('div.product-image-wrapper')
      .eq(productId - 1)
      .scrollIntoView()
      .trigger('mouseover')
      .within(() => {
        cy.get('a.add-to-cart').first().should('be.visible').click();
      });

    cy.get('a[href="/view_cart"]').should('be.visible').contains('View Cart').click();

    // Cart page
    cy.get('@productName').then((productName) => {
      cy.get('table#cart_info_table')
        .find(`tr#product-${productId}`)
        .within(() => {
          cy.get('td.cart_description a').should('contain.text', productName);
          cy.get('td.cart_quantity').should('contain.text', '1');
        });
    });
  });
});

describe('#6 | Removing a product from the cart', () => {
  before(() => {
    cy.addProductToCart(productId);
    cy.visit('/');
  });

  it('should remove product from the cart and verify it', () => {
    // Home page
    cy.get('header a[href="/view_cart"]').should('be.visible').click();

    // Cart page
    cy.get(`tr#product-${productId}`).within(() => {
      cy.get('a.cart_quantity_delete').should('be.visible').click();
    });

    cy.get('span#empty_cart').scrollIntoView().should('be.visible');
  });
});

describe('#7 | Searching for a product', () => {
  before(() => {
    cy.visit('/');
  });

  it('should find product if result matching the query', () => {
    // Home page
    cy.get('a[href="/products"]').should('be.visible').click();

    // Products page
    cy.get('input#search_product').should('be.visible').type(productName);
    cy.get('button#submit_search').should('be.visible').click();

    // Search query page
    cy.get('div.product-image-wrapper').first().should('be.visible').find('p').contains(productName);
  });
});
