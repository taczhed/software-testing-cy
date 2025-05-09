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

import { headerSelectors } from '../selectors/header-selectors';
import { productSelectors } from '../selectors/product-selectors';

const { productsLink, viewCartLink } = headerSelectors;
const {
  productInfo,
  productImageWrapper,
  addToCartLink,
  productCartLink,
  cartTable,
  tableCellDescription,
  cartEmptyInfo,
  tableCellQuantity,
  tableCellDelete,
  searchProductInput,
  searchProductSubmit,
} = productSelectors;

const productId = 6;
const productName = 'Pure Cotton V-Neck T-Shirt';

describe('#5 | Adding a product to the cart', () => {
  before(() => {
    cy.visit('/');
  });

  it('should add a random product to the cart and verify it', () => {
    // Home page
    cy.get(productsLink).should('be.visible').click();

    // Products page
    cy.get(productInfo)
      .eq(productId - 1)
      .find('p')
      .invoke('text')
      .then((text) => {
        cy.wrap(text.trim()).as('productName');
      });

    cy.get(productImageWrapper)
      .eq(productId - 1)
      .scrollIntoView()
      .trigger('mouseover')
      .within(() => {
        cy.get(addToCartLink).first().should('be.visible').click();
      });

    cy.get(productCartLink).should('be.visible').contains('View Cart').click();

    // Cart page
    cy.get('@productName').then((productName) => {
      cy.get(cartTable)
        .find(`tr#product-${productId}`)
        .within(() => {
          cy.get(tableCellDescription).should('contain.text', productName);
          cy.get(tableCellQuantity).should('contain.text', '1');
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
    cy.get(viewCartLink).should('be.visible').click();

    // Cart page
    cy.get(`tr#product-${productId}`).within(() => {
      cy.get(tableCellDelete).should('be.visible').click();
    });

    cy.get(cartEmptyInfo).scrollIntoView().should('be.visible');
  });
});

describe('#7 | Searching for a product', () => {
  before(() => {
    cy.visit('/');
  });

  it('should find product if result matching the query', () => {
    // Home page
    cy.get(productsLink).should('be.visible').click();

    // Products page
    cy.get(searchProductInput).should('be.visible').type(productName);
    cy.get(searchProductSubmit).should('be.visible').click();

    // Search query page
    cy.get(productImageWrapper).first().should('be.visible').find('p').contains(productName);
  });
});
